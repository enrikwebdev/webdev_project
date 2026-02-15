import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const BRAND = {
  name: 'Nhung Centro Estetico',
  city: 'Varese',
  province: 'VA',
  address: 'Via Magenta 32, 21100 Varese (VA)',
  phoneDisplay: '+39 351 497 5556',
  phoneHref: 'tel:+393514975556',
  instagram: 'https://instagram.com/nhung.centroestetico',
  rating: '5,0',
  ratingNote: 'Valutazione Google (profilo attività)'
}

function useRoute() {
  const [route, setRoute] = useState(window.location.pathname || '/')

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || '/')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (path) => {
    if (path === route) return
    window.history.pushState({}, '', path)
    setRoute(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return { route, go }
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/50 bg-white/5 text-[11px] font-black tracking-wide text-rose-100">NC</div>
      <div>
        <div className="text-xs uppercase tracking-[0.24em] text-rose-100">Nhung</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#e9dfe5]">Centro Estetico</div>
      </div>
    </div>
  )
}

function PageShell({ children }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.9 })
    let rafId
    const raf = (t) => {
      lenis.raf(t)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: i * 0.02,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 86%' }
        }
      )
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [])

  return <>{children}</>
}

function Pill({ children }) {
  return <span className="rounded-full border border-rose-200/25 bg-white/5 px-3 py-1 text-xs text-rose-50">{children}</span>
}

function VisualStoryBlock({ title, text, image, badge, pills }) {
  return (
    <article data-reveal className="grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#171116] md:grid-cols-2">
      <figure className="relative min-h-[260px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs tracking-[0.14em] text-rose-100 backdrop-blur">{badge}</span>
      </figure>
      <div className="flex items-center p-7 md:p-10">
        <div>
          <h3 className="text-3xl font-black leading-tight">{title}</h3>
          <p className="mt-4 text-[#e6d8dd]">{text}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {(pills || []).map((p) => (
              <Pill key={p}>{p}</Pill>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function TrustStrip() {
  return (
    <div data-reveal className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-white/5 p-5 md:grid-cols-3 md:gap-4 md:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100/90">Posizione</p>
        <p className="mt-1 font-semibold text-[#f5edf1]">{BRAND.address}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100/90">Valutazione</p>
        <p className="mt-1 font-semibold text-[#f5edf1]">{BRAND.rating} ★ · {BRAND.ratingNote}</p>
      </div>
      <div className="flex items-center gap-3 md:justify-end">
        <a href={BRAND.phoneHref} className="inline-flex items-center justify-center rounded-full bg-rose-200 px-5 py-3 text-sm font-bold text-black hover:bg-rose-100">
          Chiama ora
        </a>
        <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-rose-200/40 px-5 py-3 text-sm font-semibold text-rose-50 hover:bg-white/5">
          Instagram
        </a>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(244,114,182,0.16),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-rose-100">
              {BRAND.name} · {BRAND.city} ({BRAND.province})
            </p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Trattamenti estetici curati, risultato che si vede.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#e8dce1]">
              Manicure, pedicure, trattamenti viso/corpo ed epilazione: percorsi semplici, chiari e su misura. Prenoti in un attimo, ti senti meglio subito.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={BRAND.phoneHref} className="inline-block rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black hover:bg-rose-100">
                Prenota ora
              </a>
              <button
                onClick={() => document.getElementById('servizi')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="rounded-full border border-rose-200/40 px-6 py-3 text-sm font-semibold text-rose-50 hover:bg-white/5"
              >
                Vedi servizi
              </button>
              <span className="text-xs text-[#d8c7cf]">{BRAND.phoneDisplay}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Pill>Ambiente curato</Pill>
              <Pill>Appuntamenti rapidi</Pill>
              <Pill>Risultato naturale</Pill>
              <Pill>Centro Varese</Pill>
            </div>
          </div>

          <figure data-reveal className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1600&q=80"
              alt="Centro estetico premium"
              className="h-[520px] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <TrustStrip />
      </section>

      <section id="servizi" className="mx-auto max-w-7xl space-y-6 px-6 py-14">
        <div data-reveal className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">Percorso semplice</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Dal “vorrei sistemarmi” a “mi piaccio davvero”</h2>
          <p className="mt-4 max-w-3xl text-[#e6d8dd]">
            Niente trattamenti confusi: scegliamo insieme l’obiettivo (pelle, unghie, corpo), poi costruiamo una routine sostenibile.
          </p>
        </div>

        <VisualStoryBlock
          badge="01 · Consulenza"
          title="Capire cosa ti serve (davvero)"
          text="Partiamo da pelle, sensibilità e abitudini: così scegliamo il trattamento giusto e non perdi tempo (né soldi) in tentativi." 
          image="https://images.unsplash.com/photo-1527799820374-dcf8e82ea71c?auto=format&fit=crop&w=1400&q=80"
          pills={["Percorso su misura", "Trasparenza", "Risultati progressivi"]}
        />

        <VisualStoryBlock
          badge="02 · Trattamento"
          title="Tecnica + cura del dettaglio"
          text="Esecuzione precisa, materiali curati e un’esperienza rilassante. Il risultato deve essere bello oggi e facile da mantenere." 
          image="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80"
          pills={["Igiene", "Comfort", "Precisione"]}
        />

        <VisualStoryBlock
          badge="03 · Mantenimento"
          title="Routine leggera, effetto più duraturo"
          text="Ti diamo indicazioni pratiche per mantenere il risultato tra un appuntamento e l’altro. Pochi passi, ma quelli giusti." 
          image="https://images.unsplash.com/photo-1512207128881-1baee8714f4a?auto=format&fit=crop&w=1400&q=80"
          pills={["Consigli pratici", "Prodotti essenziali", "Continuità"]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div data-reveal className="grid gap-6 rounded-[2rem] border border-rose-200/25 bg-gradient-to-r from-[#171116] to-[#22171f] p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-rose-100">CTA principale</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Prenota un appuntamento in 30 secondi</h2>
            <p className="mt-4 text-[#e6d8dd]">Chiamata diretta o messaggio su Instagram. Ti rispondiamo appena possibile.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={BRAND.phoneHref} className="rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black hover:bg-rose-100">Chiama {BRAND.phoneDisplay}</a>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-rose-200/40 px-6 py-3 text-sm font-semibold text-rose-50 hover:bg-white/5">Scrivi su Instagram</a>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Orari</p>
              <p className="mt-2 text-[#e6d8dd]">Lun–Sab: 9:30–18:00 · Dom: chiuso</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Dove</p>
              <p className="mt-2 text-[#e6d8dd]">{BRAND.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function TrattamentiPage() {
  const services = [
    ['Manicure & Semipermanente', 'Unghie ordinate, finish elegante, durata maggiore.', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80'],
    ['Pedicure', 'Benessere e cura: piedi leggeri e perfetti.', 'https://images.unsplash.com/photo-1527799820374-dcf8e82ea71c?auto=format&fit=crop&w=1200&q=80'],
    ['Trattamenti viso', 'Idratazione, luminosità e pelle più uniforme.', 'https://images.unsplash.com/photo-1527799820374-2c4f9d02a0d6?auto=format&fit=crop&w=1200&q=80'],
    ['Epilazione', 'Ceretta/epilazione per una pelle liscia più a lungo.', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80'],
    ['Massaggi', 'Rilassa corpo e mente, sciogli tensioni.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80'],
    ['Trattamenti corpo', 'Percorsi personalizzati per tono, comfort e benessere.', 'https://images.unsplash.com/photo-1512207128881-1baee8714f4a?auto=format&fit=crop&w=1200&q=80']
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Servizi</p>
        <h1 className="mt-3 text-5xl font-black">Trattamenti estetici premium</h1>
        <p className="mt-4 max-w-3xl text-[#e6d8dd]">Servizi selezionati (e spiegati bene). Per disponibilità e prezzi: chiamaci o scrivi su Instagram.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#171116]">
            <img src={img} alt={t} className="h-52 w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-[#e6d8dd]">{d}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>Su appuntamento</Pill>
                <Pill>Consulenza rapida</Pill>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div data-reveal className="mt-10 rounded-3xl border border-rose-200/25 bg-white/5 p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Prenota</p>
            <p className="mt-1 text-lg font-semibold">{BRAND.phoneDisplay} · {BRAND.address}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={BRAND.phoneHref} className="rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black hover:bg-rose-100">Chiama</a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-rose-200/40 px-6 py-3 text-sm font-semibold text-rose-50 hover:bg-white/5">Instagram</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function DoveSiamoPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <figure data-reveal className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80"
            alt={`Varese - ${BRAND.name}`}
            className="h-full min-h-[340px] w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#171116] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Dove siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">{BRAND.address}</h1>
          <p className="mt-6 text-lg text-[#e6d8dd]">In centro a Varese: comodo da raggiungere e perfetto per un appuntamento rapido (senza stress).</p>
          <p className="mt-4 text-[#e6d8dd]"><strong>Telefono:</strong> {BRAND.phoneDisplay}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={BRAND.phoneHref} className="rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black hover:bg-rose-100">Chiama ora</a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="rounded-full border border-rose-200/40 px-6 py-3 text-sm font-semibold text-rose-50 hover:bg-white/5">Apri Instagram</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChiSiamoPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <figure data-reveal className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1400&q=80"
            alt="Trattamento estetico"
            className="h-full w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#171116] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Chi siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Cura, ascolto, risultato.</h1>
          <p className="mt-6 text-lg text-[#e6d8dd]">
            {BRAND.name} nasce per farti sentire a tuo agio: un luogo ordinato, pulito, con trattamenti spiegati bene e un risultato che rispetta la tua naturalezza.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Pill>Precisione</Pill>
            <Pill>Igiene</Pill>
            <Pill>Ambiente rilassante</Pill>
          </div>
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  const posts = [
    ['Semipermanente: come farlo durare di più', '3 accorgimenti semplici tra un appuntamento e l’altro.', 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80'],
    ['Skincare essenziale (senza complicarsi la vita)', 'Routine leggera: pulizia, idratazione, protezione.', 'https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1200&q=80'],
    ['Epilazione: cosa aspettarsi e quando farla', 'Come prepararti per un risultato migliore e più confortevole.', 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80']
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli beauty (pratici)</h1>
        <p className="mt-4 max-w-3xl text-[#e6d8dd]">Micro-guide veloci per mantenere unghie, pelle e benessere tra un appuntamento e l’altro.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#171116]">
            <img src={img} alt={t} className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{t}</h2>
              <p className="mt-3 text-[#e6d8dd]">{d}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PrenotaPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-rose-200/25 bg-gradient-to-r from-[#1a1318] to-[#241920] md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1400&q=80"
          alt="Prenota centro estetico"
          className="h-full min-h-[320px] w-full object-cover"
        />
        <div className="p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Prenota</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-tight md:text-5xl">Blocca il tuo appuntamento</h1>
          <p className="mt-4 max-w-xl text-[#eadde2]">{BRAND.address}. Ti rispondiamo appena possibile per confermare l’orario.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={BRAND.phoneHref} className="inline-block rounded-full bg-rose-200 px-6 py-4 text-center text-base font-bold text-black hover:bg-rose-100">Chiama {BRAND.phoneDisplay}</a>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="inline-block rounded-full border border-rose-200/40 px-6 py-4 text-center text-base font-semibold text-rose-50 hover:bg-white/5">Messaggio Instagram</a>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Cosa scrivere nel messaggio</p>
            <p className="mt-2 text-[#e6d8dd]">“Ciao! Vorrei prenotare {`{`}trattamento{`}`} · giorno/orario preferito · se hai esigenze particolari.”</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { route, go } = useRoute()

  const page = useMemo(() => {
    if (route === '/trattamenti') return <TrattamentiPage />
    if (route === '/dove-siamo') return <DoveSiamoPage />
    if (route === '/chi-siamo') return <ChiSiamoPage />
    if (route === '/blog') return <BlogPage />
    if (route === '/prenota') return <PrenotaPage />
    return <Home />
  }, [route])

  const Link = ({ to, children }) => (
    <button
      onClick={() => go(to)}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 ${route === to ? 'bg-rose-200 text-black' : 'hover:text-rose-100'}`}
    >
      {children}
    </button>
  )

  const sectionLabel = route === '/' ? 'Home' : route === '/trattamenti' ? 'Trattamenti' : route === '/dove-siamo' ? 'Dove siamo' : route === '/chi-siamo' ? 'Chi siamo' : route === '/blog' ? 'Blog' : 'Prenota'

  return (
    <main className="min-h-screen bg-[#100c10] text-[#f5edf1]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#100c10]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <button onClick={() => go('/')} aria-label="Home">
            <Logo />
          </button>
          <nav className="hidden gap-2 text-sm md:flex">
            <Link to="/">Home</Link>
            <Link to="/trattamenti">Trattamenti</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </nav>
          <a href={BRAND.phoneHref} className="rounded-full border border-rose-200/60 px-4 py-2 text-xs font-semibold text-rose-50 hover:bg-rose-200 hover:text-black">
            Chiama
          </a>
        </div>
        <div className="md:hidden overflow-x-auto px-4 pb-3">
          <div className="flex w-max gap-2 text-xs">
            <Link to="/">Home</Link>
            <Link to="/trattamenti">Trattamenti</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </div>
        </div>
      </header>

      <div className="border-b border-white/10 bg-[#161118] px-4 py-2 text-xs text-[#d6c4cd] md:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <button onClick={() => go('/')} className="underline-offset-2 hover:text-rose-100 hover:underline">Home</button>
          <span>/</span>
          <span className="font-semibold text-rose-100">{sectionLabel}</span>
        </div>
      </div>

      <PageShell>{page}</PageShell>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-[#bdaab3]">
        <div className="mx-auto max-w-5xl space-y-2">
          <p className="font-semibold text-[#eadde2]">{BRAND.name} · {BRAND.city}</p>
          <p>{BRAND.address} · {BRAND.phoneDisplay}</p>
          <p>
            <a className="underline-offset-4 hover:underline" href={BRAND.instagram} target="_blank" rel="noreferrer">Instagram</a>
            {' · '}
            <a className="underline-offset-4 hover:underline" href={BRAND.phoneHref}>Chiama</a>
          </p>
        </div>
      </footer>
    </main>
  )
}
