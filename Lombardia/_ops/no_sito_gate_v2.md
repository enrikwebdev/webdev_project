# NO-SITO Quality Gate v2 (obbligatorio)

Una lead è IDONEA solo se **4/4 check = PASS** con evidenze salvate in `lead.txt`.

## Check obbligatori
1. Directory listing: nessun sito web ufficiale visibile
2. Query brand + città: nessun dominio ufficiale
3. Query telefono: nessun dominio ufficiale associato
4. Query P.IVA/ragione sociale (se disponibile): nessun dominio ufficiale

## Check anti-falso-positivo (obbligatorio)
- Verifica esplicita domini brand: `brandname.it`, `brandname.com` e varianti principali del nome attività.
- Verifica anche varianti comuni:
  - aggiunta cognome/secondo nome (es. `nomecognome...`)
  - aggiunta keyword settore (`parrucchiere`, `barber`, `salone`, `hair`)
  - city mismatch check: se trova sito in altra città ma stesso nome/telefono/P.IVA => considerare ufficiale
- Se uno dei domini risponde e corrisponde all’attività (brand/telefono/P.IVA/indirizzo) => **SCARTATA_HA_SITO**.

## Check 0 (nuovo, pre-gate): ricerca diretta “dominio brand”
- Query obbligatorie:
  - `"Nome Attività" sito`
  - `"Nome Attività" .com` e `"Nome Attività" .it`
  - `"Telefono" sito`
- Se emerge un dominio plausibile, aprilo e verifica header/footer/contatti.

## Regola di decisione
- 4 PASS => IDONEA
- <4 PASS => SCARTATA_HA_SITO

## Evidenze minime in lead.txt
- Query usate
- Fonte/e consultate
- Esito per ciascun check (PASS/FAIL)
- Decisione finale
