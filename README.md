# shrutisolanki.com

Portfolio for **Shruti Solanki** — *Artist · Educator · Researcher*.

A quiet, minimal, duotone (warm-dark + greys + sage) typewriter portfolio, built to the
**Shruti Solanki Design System**: Courier Prime throughout, sage as the sole accent, and a
single expressive gesture — the hand-drawn line network (Mycelium / Cortex).

## Stack

Static site, **no framework runtime fetched from a CDN**. The Design System's UI kit is
authored as global-scope JSX; a small esbuild step compiles and bundles it ahead of time
with a real, minified, production React, and self-hosts the fonts. The output is plain
HTML/CSS/JS served by GitHub Pages.

| Path | What |
|------|------|
| `app/*.jsx` | Portfolio screens & primitives (source). |
| `app/forms.jsx` | Google Forms backend config + submit helper. |
| `styles.css`, `tokens/` | Design-system stylesheet and tokens. |
| `assets/` | Line-network / cursor-net gestures, self-hosted fonts (`fonts/`), artwork. |
| `index.html` | Production HTML template (loads the bundle + SEO/OG meta). |
| `build.mjs` | The build: bundles JS + CSS, copies static assets → `dist/`. |

## Develop

```bash
npm install
npm run build      # → dist/
npm run serve      # build, then serve dist/ at http://localhost:8080
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` runs three jobs:

1. **build** — `npm ci && npm run build`, uploads `dist/` as the Pages artifact.
2. **lighthouse** — Lighthouse CI speed/quality test against the built site
   (`lighthouserc.json`). Performance is gated at ≥ 0.8; the rest report as warnings.
   Runs alongside deploy and surfaces scores; it does **not** block the deploy by default
   (add `lighthouse` to the deploy job's `needs:` to make it a hard gate).
3. **deploy** — publishes to GitHub Pages → **shrutisolanki.com** (`CNAME`).

Latest local Lighthouse (desktop): **Performance 100 · Accessibility 96 · Best-practices
100 · SEO 100** (FCP ~0.2s, CLS 0).

## Connecting the forms (one-time)

The contact and workshop-interest forms submit to **Google Forms** (responses collect in a
Sheet you own). Until connected, they show a graceful "email me" fallback. To connect:

1. Create a Google Form with these fields:
   - **Contact:** Name · Email · Message
   - **Workshop interest:** Name · Email · City · Country · Intent · Note
2. Open each live form, View Source, and find each field's `entry.NNNNNN` id.
3. Fill in the `action` URL (your form URL with `/viewform` → `/formResponse`) and the
   entry ids in [`app/forms.jsx`](app/forms.jsx).
4. Commit — the next deploy goes live with working forms.

## Privacy

The full Design System source (guidelines, components, briefs, and the private `uploads/`
folder — CV, brochures, draft PDFs) lives **outside** this repo and is git-ignored. Only the
website itself is published.
