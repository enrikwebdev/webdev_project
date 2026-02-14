# NO-SITO Quality Gate v2 (obbligatorio)

Una lead è IDONEA solo se **4/4 check = PASS** con evidenze salvate in `lead.txt`.

## Check obbligatori
1. Directory listing: nessun sito web ufficiale visibile
2. Query brand + città: nessun dominio ufficiale
3. Query telefono: nessun dominio ufficiale associato
4. Query P.IVA/ragione sociale (se disponibile): nessun dominio ufficiale

## Regola di decisione
- 4 PASS => IDONEA
- <4 PASS => SCARTATA_HA_SITO

## Evidenze minime in lead.txt
- Query usate
- Fonte/e consultate
- Esito per ciascun check (PASS/FAIL)
- Decisione finale
