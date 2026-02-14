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
