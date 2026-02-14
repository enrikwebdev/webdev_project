# Cloudflare Pages (free) – link stabili per ~14 giorni

Obiettivo: avere URL stabili (senza trycloudflare) per mostrare demo siti in `projects/sites/active/*`.

## Struttura
- Sorgenti siti: `projects/sites/active/<slug>/`
- Output statico: `pages_dist/<slug>/` (generato)
- Index: `pages_dist/index.html`

Build locale (genera `pages_dist/`):
```bash
./scripts/pages-build.sh
```

## Setup Cloudflare Pages (Git-integrated)
1) Apri Cloudflare Dashboard → **Pages** → *Create a project* → *Connect to Git*.
2) Seleziona il repo GitHub.
3) Build settings:
   - **Framework preset**: None
   - **Build command**: `bash scripts/pages-build.sh`
   - **Build output directory**: `pages_dist`
4) Deploy.

## URL
- Homepage: `/` → lista siti (active)
- Ogni sito: `/<slug>/`
  - esempio: `/glam-monti-milano-20260214/`

## Lifecycle 14 giorni
- La policy resta in `projects/_ops/site_lifecycle_policy.md`.
- Quando un sito passa in `projects/sites/expired/`, non verrà più pubblicato perché lo script scorre solo `active/`.

## Nota
Questo setup evita branch-per-sito e permette di mantenere un singolo progetto Pages che serve tutte le demo attive.