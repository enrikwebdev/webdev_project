# Projects Workspace

Struttura standard:
- `projects/active/` → progetti in corso
- `projects/archive/` → progetti chiusi/storici
- `projects/templates/` → template riutilizzabili
- `projects/_ops/` → automazioni, processi e policy trasversali

## Siti cliente/proposta (link stabili)
- `projects/sites/active/<site-slug>/` → siti attivi (target 14 giorni)
- `projects/sites/expired/<site-slug>/` → siti scaduti/archiviati
- `projects/sites/_template/` → base sito

Regole:
- Niente branch per sito (evitiamo proliferazione branch).
- Un sito = una cartella + `site-meta.json`.
- Dopo 14 giorni si sposta in `expired` (script lifecycle).

Comando check lifecycle:
- `node projects/_ops/site_lifecycle_check.mjs`
