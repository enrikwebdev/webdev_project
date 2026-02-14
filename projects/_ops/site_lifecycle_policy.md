# Site Lifecycle Policy (snello + scalabile)

## Struttura repository
- `projects/sites/active/<site-slug>/` → sito attivo/proposto al cliente
- `projects/sites/expired/<site-slug>/` → sito scaduto (>14 giorni)
- `projects/sites/_template/` → template base riusabile

## Naming consigliato
`<business>-<city>-<yyyymmdd>`

Esempio:
`laura-acconciature-bergamo-20260214`

## Regole operative
1. Nuovo sito: creare cartella in `projects/sites/active/`
2. Deploy stabile: Cloudflare Pages con path della cartella sito
3. Finestra attiva standard: 14 giorni
4. A scadenza: spostare in `projects/sites/expired/`
5. Nessun branch-per-sito (evitare proliferazione branch)

## Tracking minimo per sito
Ogni cartella sito deve avere un `site-meta.json` con:
- `slug`
- `createdAt` (ISO)
- `expiresAt` (ISO)
- `status` (`active`/`expired`)
- `publicUrl`
- `leadRef`
