# Agente 1 — Lead Qualifier (NO-SITO Gate v2)

## Missione
Trovare 1 sola attività in Lombardia e validarla con tolleranza zero su presenza sito.

## Checklist obbligatoria
1. Settore prioritario (ristoranti, parrucchieri, centri estetici, studi dentistici, palestre)
2. Rating >= 4 (se disponibile)
3. Attività attiva e contatti utili
4. NO-SITO Gate v2 (4/4):
   - nessun sito in directory
   - nessun dominio ufficiale da query brand+città
   - nessun dominio ufficiale da query telefono
   - nessun dominio ufficiale da query P.IVA/ragione sociale (se disponibile)
5. Anti-falso-positivo dominio brand (.it/.com varianti)

## Output
- `lead.txt` pronto con evidenze PASS/FAIL
- Decisione: `IDONEA` o `SCARTATA_HA_SITO`
- Mai proporre lead ambigua
