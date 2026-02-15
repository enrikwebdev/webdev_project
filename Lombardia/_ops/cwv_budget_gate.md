# CWV Budget Gate (light)

Obiettivo: alzare percezione premium + conversione mobile, senza bloccare il ciclo con rigidità eccessiva.

## Target (indicativi)
- LCP: **≤ 2.5s** (mobile)
- INP: **≤ 200ms** (mobile)
- CLS: **≤ 0.1**

## Regola “light” (per ora)
- In assenza di field data (CrUX/RUM), usiamo **Lighthouse/PSI come proxy**.
- Il gate è **WARN**, non FAIL: se non passa, si corregge solo ciò che è a basso costo/alto impatto (immagini, font, JS).

## Checklist rapida (prima dell’outreach)
1) Immagini hero: dimensioni corrette, compressione, lazyload dove sensato
2) Font: limitare varianti/pesi, `font-display: swap`
3) JS: evitare librerie non necessarie above-the-fold
4) Layout: evitare shift (dimensioni riservate per immagini)

## Deliverable
- salvare `Lighthouse report` in `.lighthouseci/` o come link
- annotare in `lead.txt` eventuali warning e fix fatti
