# GitHub Pages — stable demo links (free)

This repo can publish all active demo sites under one stable GitHub Pages URL using **GitHub Actions**.

## What you get
- One stable base URL (GitHub Pages)
- Each site is available under:
  - `/<slug>/` (slug = folder name under `projects/sites/active/<slug>/`)
- An index page is generated at `/` listing all active sites.

## How it works
- Build script: `scripts/pages-build.sh`
  - Builds every site in `projects/sites/active/*`
  - Outputs static files to `pages_dist/<slug>/`
  - Generates `pages_dist/index.html`
- Deploy workflow: `.github/workflows/deploy-pages.yml`

## Setup steps (one-time)
1. Go to your GitHub repo → **Settings → Pages**
2. Under **Build and deployment**, choose:
   - **Source**: *GitHub Actions*
3. Push to `main` (or `openclaw-workspace`) and the workflow will deploy automatically.

## Notes
- Keeping the repo clean is critical (no `node_modules/`, `dist/`, reports tracked).
- If you want a 14-day lifecycle, you can remove expired sites from `projects/sites/active/` (or move them to `expired/`) and push — Pages will stop serving them.
