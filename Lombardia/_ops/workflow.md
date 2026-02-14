# Workflow continuo Lombardia (ogni 4 ore)

1. Ricerca nuova attività in Lombardia
2. Selezione migliore opportunità
3. Creazione sito (contenuti originali)
4. Salvataggio cartella `/Lombardia/NomeAttivita_Citta/`
5. Scrittura `proposta_email.txt`
6. Log su `Lombardia/_ops/registro_storico.csv`

Vincoli:
- Non duplicare attività già lavorate
- Mantenere registro storico
- Ottimizzare strategia ogni 10 cicli (append su `Lombardia/_ops/ottimizzazioni.md`)

## GATE BLOCCANTE: verifica "NO SITO" (obbligatoria)
Una lead è valida SOLO se passa tutti i check qui sotto:

1) **Scheda directory**: nessun campo sito web visibile
2) **Ricerca brand + città**: nessun dominio ufficiale trovato (es. `NomeAttivita Città sito`)
3) **Ricerca telefono**: nessun dominio ufficiale associato al numero
4) **Ricerca partita IVA / ragione sociale** (se disponibile): nessun sito ufficiale

Se anche 1 solo check indica presenza sito, la lead va marcata **SCARTATA_HA_SITO** e non si procede con creazione sito.

## Evidenze minime da salvare in `lead.txt`
- Esito check 1/2/3/4 (PASS/FAIL)
- Query usate per verifica
- Decisione finale: IDONEA o SCARTATA_HA_SITO
