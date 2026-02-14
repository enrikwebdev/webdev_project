# Frontend Elite (React + Vite + Tailwind + Framer Motion)

Stack frontend per siti premium.

## Nota importante
Questo progetto **non** integra credenziali/API Google lato client.
Le integrazioni Google (Sheets, Storage, ecc.) sono riservate a tooling interno/operativo backend, non ai siti consegnati.

## Avvio
- `npm install`
- `npm run dev`

## QA avanzato (modalità light)
- `npm run qa:pw` → smoke test Playwright (desktop+mobile)
- `npm run qa:lh` → Lighthouse CI (performance/accessibilità/SEO)
- `npm run qa:light` → build + smoke + lighthouse
