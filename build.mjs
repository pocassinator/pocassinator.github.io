/* Production build for shrutisolanki.com
   ----------------------------------------
   The Design System UI kit ships as global-scope JSX loaded at runtime via
   Babel-standalone + CDN React. That is great for prototyping, slow for
   production. This build:
     - compiles all JSX ahead of time (no in-browser Babel),
     - bundles a real, minified, production React,
     - bundles + minifies the CSS and self-hosted fonts,
     - emits a static dist/ that GitHub Actions deploys.
   The source files keep their global-scope idiom; we concatenate them in the
   same order index.html used, prefixed with a module preamble that pulls React
   from npm and exposes the globals the gesture scripts expect. */

import esbuild from 'esbuild';
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve('.');
const DIST = path.join(ROOT, 'dist');
const TMP = path.join(ROOT, '.build');

// Same load order as the prototype index.html.
const GESTURES = ['assets/line-network.js', 'assets/cursor-net.js'];
const APP = [
  'primitives', 'forms', 'data', 'essays', 'Editorial', 'Workshops', 'Mycelium', 'Cortex',
  'Nav', 'Footer', 'Home', 'Making', 'Archive', 'Sections', 'PaperReader',
  'Words', 'Theme', 'app',
].map((n) => `app/${n}.jsx`);

async function cat(files) {
  const parts = [];
  for (const f of files) parts.push(`/* ==== ${f} ==== */\n` + (await readFile(f, 'utf8')));
  return parts.join('\n\n');
}

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await rm(TMP, { recursive: true, force: true });
  await mkdir(DIST, { recursive: true });
  await mkdir(TMP, { recursive: true });

  // ---- JS bundle ----
  // Module preamble: real React from npm, exposed as the globals the kit uses.
  const preamble = `
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = Object.assign({}, ReactDOM, ReactDOMClient);
`;
  const entry = preamble + '\n\n' + (await cat(GESTURES)) + '\n\n' + (await cat(APP));
  const entryPath = path.join(TMP, 'entry.jsx');
  await writeFile(entryPath, entry);

  await esbuild.build({
    entryPoints: [entryPath],
    bundle: true,
    format: 'iife',
    minify: true,
    sourcemap: false,
    target: ['es2019', 'chrome90', 'firefox90', 'safari14'],
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'none',
    outfile: path.join(DIST, 'app.js'),
    logLevel: 'info',
  });

  // ---- CSS bundle (inlines tokens, fingerprints + copies the woff2 fonts) ----
  await esbuild.build({
    entryPoints: ['styles.css'],
    bundle: true,
    minify: true,
    loader: { '.woff2': 'file' },
    assetNames: 'assets/fonts/[name]',
    outfile: path.join(DIST, 'styles.css'),
    logLevel: 'info',
  });

  // ---- static assets ----
  await cp('assets/artwork', path.join(DIST, 'assets/artwork'), { recursive: true });
  await cp('index.html', path.join(DIST, 'index.html'));
  await cp('404.html', path.join(DIST, '404.html'));
  for (const f of ['CNAME', '.nojekyll', 'favicon.svg', 'robots.txt', 'sitemap.xml']) {
    await cp(f, path.join(DIST, f)).catch(() => {});
  }

  await rm(TMP, { recursive: true, force: true });
  console.log('\n✓ Built to dist/');
}

build().catch((e) => { console.error(e); process.exit(1); });
