# shrutisolanki.com

Portfolio for **Shruti Solanki** — *Artist · Educator · Researcher*.

A quiet, minimal, duotone (warm-dark + greys + sage) typewriter portfolio. Built to the
**Shruti Solanki Design System**: Courier Prime throughout, sage as the sole accent, and a
single expressive gesture — the hand-drawn line network (Mycelium / Cortex).

## Structure

- `index.html` — entry point. Loads React + Babel (standalone, via CDN) and the app.
- `app/` — the portfolio screens & primitives (in-browser JSX, no build step).
- `styles.css` + `tokens/` — the design-system stylesheet and design tokens.
- `assets/` — the line-network / cursor-net gestures and true-colour artwork.

## Deploy

Static site, no build. Pushed to `main`, published to GitHub Pages by
`.github/workflows/deploy.yml` and served at **shrutisolanki.com** (see `CNAME`).
`.nojekyll` disables Jekyll processing.

The full design system source (guidelines, components, briefs, uploads) lives outside this
repo and is intentionally **not** published.
