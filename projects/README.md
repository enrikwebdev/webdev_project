# Projects Workspace

Struttura standard:
- `projects/active/` → progetti in corso
- `projects/archive/` → progetti chiusi/storici
- `projects/templates/` → template riutilizzabili
- `projects/_ops/` → automazioni, script e processi trasversali

Regola operativa:
- Ogni nuovo progetto va creato in `projects/active/<nome-progetto>`.
- A chiusura, spostare in `projects/archive/<nome-progetto>`.
