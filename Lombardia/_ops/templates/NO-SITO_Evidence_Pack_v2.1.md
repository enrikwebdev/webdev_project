# NO-SITO Evidence Pack v2.1 (obbligatorio)

Obiettivo: **zero ripensamenti post-check**. Ogni lead IDONEA deve avere un pacchetto evidenze ripetibile e verificabile, salvato nella cartella della lead.

## Struttura cartella (standard)
Dentro `Lombardia/<LeadName_Citta>/` creare:

- `evidence/no-sito/`
  - `01-directory-listing.md` (o `.txt`) + **URL**
  - `02-query-brand-city.md` + **query + URL risultati**
  - `03-query-phone.md` + **query + URL risultati**
  - `04-query-piva.md` (se disponibile) + **query + URL risultati**
  - `anti-falso-positivo_domains.md` (lista domini testati + esito)
  - `screenshots/` (minimo 4 screenshot)

> Nota: se lo scraping/screenshot automatico non è affidabile, va bene anche **evidenza testuale con URL** + 1 screenshot per check.

## Cosa deve contenere ciascun check (minimo)
Per ogni file `0X-*.md`:
- Fonte (PagineGialle/Virgilio/altro)
- URL della pagina consultata
- Query usata (se applicabile)
- Esito: **PASS/FAIL**
- 1 riga “Perché” (molto breve)
- (opz.) note su ambiguità / cosa è stato escluso

## Anti-falso-positivo (obbligatorio)
In `anti-falso-positivo_domains.md` salvare:
- domini provati: `.it`, `.com`, varianti nome (spazi, trattini), keyword settore, cognome/secondo nome
- esito DNS/HTTP (NXDOMAIN / 200 / redirect)
- se un dominio risponde: **aprire e verificare footer/contatti** (telefono / indirizzo / P.IVA)

## Collocazione in lead.txt
`lead.txt` resta la sintesi “commerciale”, ma deve includere:
- percorso dell’Evidence Pack
- 4/4 esiti + 1 riga di motivazione
- decisione finale (IDONEA / SCARTATA_HA_SITO)

## Gate di accettazione
Una lead è **IDONEA** solo se:
- NO-SITO Gate v2 = 4/4 PASS
- anti-falso-positivo = PASS
- Evidence Pack presente e completo
