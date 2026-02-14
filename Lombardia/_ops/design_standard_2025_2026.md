# Design Standard Premium 2025–2026 (obbligatorio)

Obiettivo: ogni sito deve sembrare prodotto da web agency high-end, con focus conversione.

## 1) Mobile-first reale
- Progettare prima viewport smartphone (360–430px)
- CTA grandi (min-height 44px)
- Menu semplice, sticky se utile
- Layout verticale fluido e spaziatura ariosa

## 2) Design moderno/minimal
- Uso intenzionale dello spazio bianco
- Sezioni nette e gerarchia chiara
- Niente elementi decorativi inutili

## 3) Tipografia forte
- H1 d’impatto, H2 scansionabili
- Paragrafi brevi
- Evidenziazione parole chiave importanti

## 4) Palette strategica
- 1 colore principale, 1 secondario, 1 accento
- Coerenza cromatica per settore
- Dark mode opzionale se migliora UX

## 5) Microinterazioni
- Hover eleganti
- Transizioni fluide (150–250ms)
- Animazioni leggere e non invasive

## 6) Hero obbligatoria
- Titolo potente
- Sottotitolo orientato al beneficio
- CTA primaria evidente
- Visual forte (foto/gradiente)

## 7) Struttura persuasiva
- Problema cliente
- Soluzione
- Benefici concreti
- Prova sociale (realistica)
- CTA finale

### Regola recensioni
- Se disponibili recensioni Google positive, inserirle in sezione "Clienti soddisfatti".
- Usare solo recensioni positive pertinenti al servizio.
- Mantenere testo fedele alla fonte o parafrasi non fuorviante.
- Evitare recensioni inventate quando sono disponibili recensioni reali.

## 8) SEO locale
- Città + provincia naturali nei testi
- H1 ottimizzato
- Meta description efficace
- HTML semantico

## 9) Performance
- HTML/CSS/JS leggeri
- Immagini ottimizzate
- No script superflui

## 10) Accessibilità
- Contrasto adeguato
- Font leggibili
- Navigazione semplice da tastiera/touch

## UX/UI best-practice obbligatorie (aggiornamento continuo)
Riferimenti guida: NN/g (heuristics + scanning behavior), web.dev (Core Web Vitals).

- **Gerarchia anti-scanning debole (F-pattern antidote):** primi 2 viewport con headline forti, sottotitoli, bullet benefici e CTA evidente.
- **Nielsen Heuristics in pagina:**
  - chiarezza stato/interazione (hover, feedback click, form states)
  - coerenza label e pattern
  - prevenzione errore (CTA non ambigue, percorsi semplici)
  - minimalismo funzionale (niente rumore visivo)
- **Storytelling premium tipo product-launch:**
  - sequenza narrativa a blocchi (hook → valore → prova → CTA)
  - sezioni hero cinematografiche con forte visual hierarchy
  - scroll reveals eleganti (fade/translate/scale leggere) con timing fluido
  - animazioni solo se migliorano comprensione e percezione premium
- **Mobile CTA ergonomiche:** target touch grandi, CTA primaria above-the-fold e ripetuta in punti strategici.
- **Accessibilità minima:** contrasto elevato, tipografia leggibile, alt text, focus states.
- **Performance target (Core Web Vitals):**
  - LCP <= 2.5s
  - INP <= 200ms
  - CLS <= 0.1
  - animazioni GPU-friendly (`transform`, `opacity`), no effetti pesanti bloccanti

## Quality gate pre-consegna
- Impatto visivo: alto
- Coerenza colori: alta
- CTA: chiara e dominante
- Velocità caricamento: rapida
- Core Web Vitals target rispettati (quando misurabili)
- Output percepito: valore >= 1500€
