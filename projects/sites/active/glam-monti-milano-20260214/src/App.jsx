import { useEffect, useMemo, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

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

const BRAND = {
  name: 'Glam Monti',
  city: 'Milano',
  address: 'Via Vincenzo Monti 41, 20123 Milano (MI)',
  phoneDisplay: '02 48005129',
  phoneHref: 'tel:+390248005129',
  tagline: 'Parrucchiere · Beauty',
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/60 text-xs font-black text-amber-200">GM</div>
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-amber-200">Glam</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#e9e1cf]">Monti</div>
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
          scrollTrigger: { trigger: el, start: 'top 86%' },
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

function VisualStoryBlock({ title, text, image, badge, bullets = [] }) {
  return (
    <article data-reveal className="grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#141212] md:grid-cols-2">
      <figure className="relative min-h-[260px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs tracking-[0.14em] text-amber-100 backdrop-blur">{badge}</span>
      </figure>
      <div className="flex items-center p-7 md:p-10">
        <div>
          <h3 className="text-3xl font-black leading-tight">{title}</h3>
          <p className="mt-4 text-[#e7dfcc]">{text}</p>
          {!!bullets.length && (
            <ul className="mt-5 space-y-2 text-sm text-[#efe6d2]">
              {bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          )}
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-amber-100">
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Su misura</span>
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Risultato elegante</span>
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Prenota rapido</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(251,191,36,0.14),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">{BRAND.tagline} · {BRAND.city}</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Taglio, colore e beauty con un risultato che ti sta addosso.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#e9e1cf]">Esperienza curata, consulenza rapida e un percorso chiaro: capisci subito cosa scegli e perché.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BRAND.phoneHref} className="rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black">Prenota ora</a>
              <a href="/servizi" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300/60">Vedi servizi</a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-amber-200 font-black text-lg">Centro</div>
                <div className="mt-1 text-[#d7cfbd]">Milano</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-amber-200 font-black text-lg">4.7★</div>
                <div className="mt-1 text-[#d7cfbd]">35 recensioni</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-amber-200 font-black text-lg">CTA</div>
                <div className="mt-1 text-[#d7cfbd]">chiamata rapida</div>
              </div>
            </div>
          </div>
          <figure data-reveal className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80"
              alt="Salone parrucchiere premium"
              className="h-[500px] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-20">
        <div data-reveal className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Metodo</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Dalla consulenza al risultato: senza confusione</h2>
        </div>

        <VisualStoryBlock
          badge="01 · Consulenza"
          title="1 direzione chiara: cosa ti valorizza davvero"
          text="Partiamo da viso, volumi e routine. Ti proponiamo una soluzione concreta: elegante oggi e gestibile domani."
          image="https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1400&q=80"
          bullets={["Analisi volumi e proporzioni", "Scelta colore coerente con incarnato", "Obiettivo: look mantenibile"]}
        />

        <VisualStoryBlock
          badge="02 · Tecnica"
          title="Taglio & colore con finitura premium"
          text="Sezioni pulite, transizioni morbide, lucentezza controllata. Risultato naturale (non finto), ma visibilmente curato."
          image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
          bullets={["Balayage / degradé", "Tonalizzazioni & gloss", "Piega lunga durata"]}
        />

        <VisualStoryBlock
          badge="03 · Beauty"
          title="Beauty coordinato: look completo"
          text="Quando capelli e beauty parlano la stessa lingua, l’effetto finale cambia: più pulito, più luminoso, più professionale."
          image="https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1400&q=80"
          bullets={["Makeup / beauty essenziale", "Dettagli che valorizzano", "Stile coerente"]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div data-reveal className="grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#171615] to-[#1f1b14] p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Trust kit</p>
            <h3 className="mt-3 text-3xl font-black md:text-4xl">Esperienza curata. Risultato coerente.</h3>
            <p className="mt-4 text-[#efe6d2]">Ambiente ordinato, tempi chiari e un servizio che parte dall’ascolto. L’obiettivo è: "
              + "uscire dal salone con un look che senti tuo."</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-amber-100">
              <span className="rounded-full border border-amber-300/40 px-3 py-1">Recensioni 4.7★</span>
              <span className="rounded-full border border-amber-300/40 px-3 py-1">Centro Milano</span>
              <span className="rounded-full border border-amber-300/40 px-3 py-1">Consulenza rapida</span>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ['“Colore super naturale e luminoso, davvero curato.”', 'Cliente'],
              ['“Taglio preciso, piega che dura: esperienza ottima.”', 'Cliente'],
              ['“Accoglienza e consigli chiari, niente confusione.”', 'Cliente'],
            ].map(([q, a]) => (
              <blockquote key={q} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-[#f6f1e4]">
                {q}
                <span className="mt-2 block text-xs text-amber-200">— {a}</span>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ServiziPage() {
  const services = [
    {
      t: 'Taglio su misura',
      d: 'Forme e volumi costruiti su viso e stile. Finitura pulita e gestibile.',
      img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80',
      pts: ['Consulenza inclusa', 'Finitura precisa', 'Mantenibilità reale'],
    },
    {
      t: 'Colore & schiariture',
      d: 'Tono su tono o luce mirata: risultato naturale, senza stacchi duri.',
      img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      pts: ['Balayage / degradé', 'Gloss & tonalizzazioni', 'Protezione capello'],
    },
    {
      t: 'Piega & styling',
      d: 'Piega morbida e controllo del crespo. Preparazione corretta per durare di più.',
      img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80',
      pts: ['Brush / phon', 'Protezione calore', 'Finish anti-frizz'],
    },
    {
      t: 'Beauty (su richiesta)',
      d: 'Makeup/beauty coordinato per eventi o look completi.',
      img: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1200&q=80',
      pts: ['Eventi', 'Look naturale', 'Dettagli curati'],
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Servizi</p>
        <h1 className="mt-3 text-5xl font-black">Capelli & beauty in stile Milano</h1>
        <p className="mt-4 max-w-2xl text-[#efe6d2]">Servizi progettati per risultato + mantenibilità. Scegliamo un percorso utile, non mille passaggi.</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => (
          <article key={s.t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#141212]">
            <img src={s.img} alt={s.t} className="h-52 w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold">{s.t}</h2>
              <p className="mt-3 text-[#e7dfcc]">{s.d}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#efe6d2]">
                {s.pts.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
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
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80"
            alt="Milano"
            className="h-full min-h-[340px] w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#141212] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Dove siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">{BRAND.city}</h1>
          <p className="mt-6 text-lg text-[#e7dfcc]">Arrivare è semplice: trovi indirizzo e contatto diretto per prenotare.</p>
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-[#efe6d2]">
            <div><strong>Indirizzo:</strong> {BRAND.address}</div>
            <div className="mt-2"><strong>Telefono:</strong> {BRAND.phoneDisplay}</div>
          </div>
          <a href={BRAND.phoneHref} className="mt-7 inline-block rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black">Chiama ora</a>
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
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1400&q=80"
            alt="Team"
            className="h-full w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#141212] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Chi siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Metodo semplice: ascolto + tecnica + look coerente</h1>
          <p className="mt-6 text-lg text-[#e7dfcc]">Puntiamo a un risultato bello, ma soprattutto adatto a te. Ti diciamo cosa fare (e cosa evitare) per mantenerlo.</p>
          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">1</strong>Direzione</div>
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">0</strong>Caos</div>
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">100%</strong>Chiarezza</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  const posts = [
    ['Taglio giusto in base al viso', 'Scelte semplici che cambiano l’effetto finale.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=80'],
    ['Colore luminoso più a lungo', 'Routine rapida tra un appuntamento e l’altro.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'],
    ['Anti-frizz senza appesantire', '3 mosse pratiche che migliorano subito.', 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli capelli & beauty</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#141212]">
            <img src={img} alt={t} className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{t}</h2>
              <p className="mt-3 text-[#e7dfcc]">{d}</p>
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
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-amber-300/30 bg-gradient-to-r from-[#171615] to-[#1f1b14] md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80"
          alt="Prenota salone"
          className="h-full min-h-[320px] w-full object-cover"
        />
        <div className="p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Prenota</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-tight md:text-5xl">Prenota in modo semplice</h1>
          <p className="mt-4 max-w-xl text-[#efe6d2]">Chiamaci: ti confermiamo disponibilità e scegliamo insieme servizio e fascia oraria.</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-[#efe6d2]">
            <div><strong>Step 1:</strong> chiamaci al {BRAND.phoneDisplay}</div>
            <div className="mt-2"><strong>Step 2:</strong> scegliamo servizio e orario</div>
            <div className="mt-2"><strong>Step 3:</strong> arrivi e trovi tutto pronto</div>
          </div>
          <a href={BRAND.phoneHref} className="mt-8 inline-block w-full rounded-full bg-amber-300 px-6 py-4 text-center text-base font-bold text-black sm:w-auto sm:px-8">Chiama ora</a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { route, go } = useRoute()

  const page = useMemo(() => {
    if (route === '/servizi') return <ServiziPage />
    if (route === '/dove-siamo') return <DoveSiamoPage />
    if (route === '/chi-siamo') return <ChiSiamoPage />
    if (route === '/blog') return <BlogPage />
    if (route === '/prenota') return <PrenotaPage />
    return <Home />
  }, [route])

  const Link = ({ to, children }) => (
    <button
      onClick={() => go(to)}
      className={`whitespace-nowrap rounded-full px-3 py-1.5 ${route === to ? 'bg-amber-300 text-black' : 'hover:text-amber-200'}`}
    >
      {children}
    </button>
  )

  const sectionLabel =
    route === '/'
      ? 'Home'
      : route === '/servizi'
        ? 'Servizi'
        : route === '/dove-siamo'
          ? 'Dove siamo'
          : route === '/chi-siamo'
            ? 'Chi siamo'
            : route === '/blog'
              ? 'Blog'
              : 'Prenota'

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-[#f7f3e6]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f0f0f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <button onClick={() => go('/')} aria-label="Vai alla Home">
            <Logo />
          </button>
          <nav className="hidden gap-2 text-sm md:flex" aria-label="Menu principale">
            <Link to="/">Home</Link>
            <Link to="/servizi">Servizi</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </nav>
          <a href={BRAND.phoneHref} className="rounded-full border border-amber-300/60 px-4 py-2 text-xs font-semibold text-amber-100 hover:bg-amber-300 hover:text-black">Chiama</a>
        </div>

        <div className="md:hidden overflow-x-auto px-4 pb-3">
          <div className="flex w-max gap-2 text-xs">
            <Link to="/">Home</Link>
            <Link to="/servizi">Servizi</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </div>
        </div>
      </header>

      <div className="border-b border-white/10 bg-[#151413] px-4 py-2 text-xs text-[#d0c7b4] md:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <button onClick={() => go('/')} className="underline-offset-2 hover:text-amber-200 hover:underline">Home</button>
          <span>/</span>
          <span className="font-semibold text-amber-200">{sectionLabel}</span>
        </div>
      </div>

      <PageShell>{page}</PageShell>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-[#b9b09c]">
        <div className="mx-auto max-w-7xl">
          <div className="font-semibold">{BRAND.name} · {BRAND.city}</div>
          <div className="mt-2">{BRAND.address}</div>
          <a className="mt-3 inline-block text-amber-200 underline underline-offset-4" href={BRAND.phoneHref}>
            {BRAND.phoneDisplay}
          </a>
          <div className="mt-6 text-xs text-[#8e8677]">Demo proposta (sito in anteprima) · Realizzazione una tantum 490€</div>
        </div>
      </footer>
    </main>
  )
}
