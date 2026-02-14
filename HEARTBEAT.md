{
  "last_cycle_timestamp": "2026-02-14T21:42:00Z",
  "total_cycles": 6,
  "total_leads_found": 6,
  "total_sites_created": 6,
  "total_emails_sent": 6,
  "total_followups_sent": 0,
  "total_closed_won": 0,
  "total_closed_lost": 0,
  "active_lead": {
    "name": "Laura Acconciature",
    "city": "Bergamo",
    "sector": "Parrucchiere",
    "status": "site_created_email_ready",
    "last_update": "2026-02-14T21:42:00Z"
  },
  "pipeline": [
    {
      "name": "Glam Monti",
      "city": "Milano",
      "sector": "Parrucchiere / Istituto di bellezza",
      "status": "site_created_email_ready",
      "created_at": "2026-02-14T15:09:00Z",
      "updated_at": "2026-02-14T15:17:00Z"
    },
    {
      "name": "Parrucchiera Afra",
      "city": "Brescia",
      "sector": "Parrucchiere",
      "status": "site_created_email_ready",
      "created_at": "2026-02-14T15:20:00Z",
      "updated_at": "2026-02-14T15:36:00Z"
    },
    {
      "name": "Riccioli e Stile Dal 1991",
      "city": "Milano",
      "sector": "Parrucchiere",
      "status": "scartata_ha_sito_post_check",
      "created_at": "2026-02-14T17:41:00Z",
      "updated_at": "2026-02-14T18:00:00Z"
    },
    {
      "name": "Acconciature Tina Errico",
      "city": "Bergamo",
      "sector": "Parrucchiere",
      "status": "site_created_email_ready",
      "created_at": "2026-02-14T17:58:00Z",
      "updated_at": "2026-02-14T17:58:00Z"
    },
    {
      "name": "Caruso BarberShop",
      "city": "Bergamo",
      "sector": "Parrucchiere uomo / Barberia",
      "status": "site_created_email_ready",
      "created_at": "2026-02-14T19:42:00Z",
      "updated_at": "2026-02-14T19:42:00Z"
    },
    {
      "name": "Laura Acconciature",
      "city": "Bergamo",
      "sector": "Parrucchiere",
      "status": "site_created_email_ready",
      "created_at": "2026-02-14T21:42:00Z",
      "updated_at": "2026-02-14T21:42:00Z"
    }
  ],
  "performance_metrics": {
    "conversion_rate": 0,
    "average_cycle_time_hours": 2,
    "response_rate": 0
  },
  "logs": [
    {
      "timestamp": "2026-02-14T15:17:00Z",
      "azione": "Creazione sito + proposta email per Glam Monti",
      "esito": "completato",
      "miglioramenti": "Restyling visual più accattivante e colorato"
    },
    {
      "timestamp": "2026-02-14T15:20:00Z",
      "azione": "Nuovo ciclo su Parrucchiera Afra Brescia",
      "esito": "completato",
      "miglioramenti": "SEO locale Brescia+BS e output completo cartella"
    },
    {
      "timestamp": "2026-02-14T15:36:00Z",
      "azione": "Inizializzazione e allineamento file heartbeat",
      "esito": "completato",
      "miglioramenti": "Struttura standard JSON con pipeline e metriche coerenti"
    },
    {
      "timestamp": "2026-02-14T17:41:00Z",
      "azione": "Nuovo ciclo su Riccioli e Stile Milano",
      "esito": "completato",
      "miglioramenti": "Posizionamento verticale capelli ricci + tunnel pubblico temporaneo trycloudflare"
    },
    {
      "timestamp": "2026-02-14T18:00:00Z",
      "azione": "Correzione qualifica lead Riccioli e Stile",
      "esito": "scartata_ha_sito",
      "miglioramenti": "Aggiunto controllo dominio brand (.it/.com) nel gate NO-SITO per evitare falsi positivi"
    },
    {
      "timestamp": "2026-02-14T17:58:00Z",
      "azione": "Nuovo ciclo su Acconciature Tina Errico Bergamo",
      "esito": "completato",
      "miglioramenti": "Applicato gate NO-SITO v2 con controllo anti-falso-positivo e sito premium mobile-first"
    },
    {
      "timestamp": "2026-02-14T19:42:00Z",
      "azione": "Nuovo ciclo su Caruso BarberShop Bergamo",
      "esito": "completato",
      "miglioramenti": "Applicato gate NO-SITO v2 con anti-falso-positivo domini brand + delivery sito premium con tunnel pubblico"
    },
    {
      "timestamp": "2026-02-14T21:42:00Z",
      "azione": "Nuovo ciclo su Laura Acconciature Bergamo",
      "esito": "completato",
      "miglioramenti": "Applicato gate NO-SITO v2 completo + build React premium su stack frontend-elite con QA smoke e tunnel pubblico"
    }
  ]
}