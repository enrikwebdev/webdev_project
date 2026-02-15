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

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-200/60 bg-black/30 text-xs font-black tracking-[0.12em] text-rose-100">
        G
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.28em] text-rose-100">Glamour</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#e7d9d1]">Acconciature & Beauty</div>
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
        },
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
  return <span className="rounded-full border border-rose-200/35 bg-black/20 px-3 py-1 text-xs text-rose-100">{children}</span>
}

function VisualStoryBlock({ title, text, image, badge, pills = [] }) {
  return (
    <article data-reveal className="grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#141012] md:grid-cols-2">
      <figure className="relative min-h-[260px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs tracking-[0.14em] text-rose-100 backdrop-blur">{badge}</span>
      </figure>
      <div className="flex items-center p-7 md:p-10">
        <div>
          <h3 className="text-3xl font-black leading-tight">{title}</h3>
          <p className="mt-4 text-[#e7d9d1]">{text}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {pills.map((p) => (
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
    <section className="border-y border-white/10 bg-black/25">
      <div className="mx-auto grid max-w-7xl gap-3 px-6 py-6 md:grid-cols-3">
        <div data-reveal className="rounded-2xl border border-white/10 bg-[#141012] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Recensioni</p>
          <p className="mt-2 text-2xl font-black">5,0 ★</p>
          <p className="mt-1 text-sm text-[#e7d9d1]">9 recensioni Google (da PagineGialle)</p>
        </div>
        <div data-reveal className="rounded-2xl border border-white/10 bg-[#141012] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Dove</p>
          <p className="mt-2 text-lg font-bold">Via Giorgio Susani, 16</p>
          <p className="mt-1 text-sm text-[#e7d9d1]">Mantova (MN)</p>
        </div>
        <div data-reveal className="rounded-2xl border border-white/10 bg-[#141012] p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Prenota</p>
          <p className="mt-2 text-lg font-bold">+39 331 376 9201</p>
          <p className="mt-1 text-sm text-[#e7d9d1]">Una sola CTA: chiamata rapida</p>
        </div>
      </div>
    </section>
  )
}

function ReviewsBlock() {
  const reviews = [
    {
      quote: 'Professionalità, gentilezza e disponibilità. Davvero bravissime!',
      name: 'Monia',
      source: 'Google (da PagineGialle)',
    },
    {
      quote: 'Le mie parrucchiere del cuore a Mantova! Sono super…',
      name: 'Selene Di Bella',
      source: 'Google (da PagineGialle)',
    },
    {
      quote: 'Parrucchiere bravissime e preparate! Disponibili e super simpatiche!',
      name: 'Deborah Marchi',
      source: 'Google (da PagineGialle)',
    },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div data-reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">Fiducia</p>
        <h2 className="mt-3 text-4xl font-black md:text-6xl">Dicono di noi</h2>
        <p className="mt-4 max-w-2xl text-[#e7d9d1]">Recensioni reali riportate su PagineGialle (fonte Google).</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} data-reveal className="rounded-3xl border border-white/10 bg-[#141012] p-7">
            <blockquote className="text-lg leading-relaxed text-[#f5eee9]">“{r.quote}”</blockquote>
            <figcaption className="mt-5 text-sm text-[#e7d9d1]">
              <span className="font-semibold text-rose-100">{r.name}</span>
              <span className="mx-2 text-white/25">·</span>
              {r.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(244,63,94,0.14),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-rose-100">Glamour · Mantova</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Capelli curati, look naturale, zero stress.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#e7d9d1]">
              Taglio, colore, balayage e trattamenti: ascolto + tecnica precisa per un risultato che ti rappresenta (e facile da mantenere).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+393313769201" className="inline-block rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black">
                Prenota ora
              </a>
              <a
                href="/trattamenti"
                onClick={(e) => {
                  e.preventDefault()
                  window.history.pushState({}, '', '/trattamenti')
                  window.dispatchEvent(new PopStateEvent('popstate'))
                }}
                className="inline-block rounded-full border border-rose-200/60 px-6 py-3 text-sm font-bold text-rose-100 hover:bg-rose-200 hover:text-black"
              >
                Vedi servizi
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-2">
              <Pill>Unisex</Pill>
              <Pill>Balayage · Degradé</Pill>
              <Pill>Trattamenti Cheratina</Pill>
              <Pill>Beauty (unghie · make-up)</Pill>
            </div>
          </div>
          <figure data-reveal className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
              alt="Salone parrucchiere premium"
              className="h-[520px] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <TrustStrip />

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-20">
        <div data-reveal className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-100">Storytelling visivo</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Dal “non mi vedo bene” a un look che ti fa sentire a posto</h2>
        </div>

        <VisualStoryBlock
          badge="01 · Consulenza"
          title="Prima capiamo cosa vuoi ottenere"
          text="Valutiamo forma viso, tipo capello e routine: così scegliamo taglio e colore che funzionano davvero su di te (non solo in foto)."
          image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
          pills={['Ascolto', 'Risultato naturale', 'Consiglio pratico']}
        />

        <VisualStoryBlock
          badge="02 · Tecnica"
          title="Precisione su taglio e colore"
          text="Balayage, sfumature, degradé e trattamenti ricostruttivi: puntiamo a luminosità e movimento senza effetto artificiale."
          image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
          pills={['Balayage', 'Degradé', 'Cheratina']}
        />

        <VisualStoryBlock
          badge="03 · Mantenimento"
          title="Un look bello anche dopo"
          text="Ti lasciamo una mini-routine semplice (2–3 step) per mantenere piega e colore più a lungo tra un appuntamento e l’altro."
          image="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80"
          pills={['Routine rapida', 'Luminosità', 'Ordine']}
        />
      </section>

      <ReviewsBlock />

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-rose-200/25 bg-gradient-to-r from-[#151113] to-[#1c1411] md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1400&q=80"
            alt="Parrucchiera al lavoro"
            className="h-full min-h-[320px] w-full object-cover"
          />
          <div className="p-10 md:p-14">
            <p className="text-xs uppercase tracking-[0.22em] text-rose-100">CTA unica</p>
            <h2 className="mt-3 break-words text-4xl font-black leading-tight md:text-5xl">Prenota il tuo appuntamento</h2>
            <p className="mt-4 max-w-xl text-[#e7d9d1]">Chiamata rapida: ti diciamo subito disponibilità e ti consigliamo il servizio giusto.</p>
            <a
              href="tel:+393313769201"
              className="mt-8 inline-block w-full rounded-full bg-rose-200 px-6 py-4 text-center text-base font-bold text-black sm:w-auto sm:px-8"
            >
              Chiama 331 376 9201
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function TrattamentiPage() {
  const services = [
    ['Taglio Donna / Uomo', 'Taglio su misura in base a viso, volume e stile.', 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1200&q=80'],
    ['Colore · Schiariture · Balayage', 'Tecniche per luminosità naturale e sfumature armoniose.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'],
    ['Degradé & Sfumature', 'Transizioni morbide e pulite, zero stacchi netti.', 'https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1200&q=80'],
    ['Trattamenti Cheratina', 'Ricostruzione e disciplina per capelli più sani e forti.', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80'],
    ['Unghie (cheratina) & manicure', 'Servizi beauty per un look completo, curato nei dettagli.', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'],
    ['Trucco per cerimonia / sposa', 'Make-up elegante, pensato per foto e durata.', 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Servizi</p>
        <h1 className="mt-3 text-5xl font-black">Trattamenti capelli & beauty</h1>
        <p className="mt-4 max-w-2xl text-[#e7d9d1]">Un percorso semplice: scegli il risultato, al resto pensiamo noi (consulenza + tecnica + mantenimento).</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#141012]">
            <img src={img} alt={t} className="h-52 w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-[#e7d9d1]">{d}</p>
              <a href="tel:+393313769201" className="mt-5 inline-block text-sm font-semibold text-rose-100 underline underline-offset-4">
                Prenota: 331 376 9201
              </a>
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
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80"
            alt="Mantova"
            className="h-full min-h-[340px] w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#141012] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Dove siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Via Giorgio Susani, 16 · Mantova</h1>
          <p className="mt-6 text-lg text-[#e7d9d1]">Comodo da raggiungere: chiamaci e blocchiamo l’orario migliore per te.</p>
          <p className="mt-3 text-[#e7d9d1]">
            <strong>Telefono:</strong> 331 376 9201
          </p>
          <a href="tel:+393313769201" className="mt-7 inline-block rounded-full bg-rose-200 px-6 py-3 text-sm font-bold text-black">
            Chiama ora
          </a>
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
            alt="Salone parrucchiere"
            className="h-full w-full object-cover"
          />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#141012] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Chi siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Unisex · attenzione artigianale · gusto contemporaneo</h1>
          <p className="mt-6 text-lg text-[#e7d9d1]">
            Glamour è un salone a Mantova che lavora per farti ottenere un risultato visibile e naturale, senza complicarti la vita.
          </p>
          <p className="mt-4 text-[#e7d9d1]">Il nostro standard: ordine, precisione e un percorso chiaro (1 sola CTA: prenotare).</p>
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  const posts = [
    ['Taglio giusto in base alla forma del viso', 'Come valorizzare i lineamenti con scelte semplici e concrete.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'],
    ['Come mantenere il colore luminoso più a lungo', 'Routine rapida tra un appuntamento e l’altro (senza prodotti inutili).', 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80'],
    ['Balayage naturale: cosa chiedere in salone', '3 domande per evitare risultati troppo “finti”.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli capelli & beauty</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#141012]">
            <img src={img} alt={t} className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{t}</h2>
              <p className="mt-3 text-[#e7d9d1]">{d}</p>
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
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-rose-200/25 bg-gradient-to-r from-[#151113] to-[#1c1411] md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80"
          alt="Prenota salone"
          className="h-full min-h-[320px] w-full object-cover"
        />
        <div className="p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-100">Prenota</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-tight md:text-5xl">Blocca il tuo appuntamento</h1>
          <p className="mt-4 max-w-xl text-[#e7d9d1]">Via Giorgio Susani, 16 · Mantova (MN). Le fasce migliori si riempiono velocemente: meglio chiamare.</p>
          <a href="tel:+393313769201" className="mt-8 inline-block w-full rounded-full bg-rose-200 px-6 py-4 text-center text-base font-bold text-black sm:w-auto sm:px-8">
            Chiama 331 376 9201
          </a>
          <div className="mt-5 text-sm text-[#e7d9d1]">Se preferisci: lascia un messaggio su WhatsApp dalla scheda PagineGialle.</div>
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

  const sectionLabel =
    route === '/' ? 'Home' : route === '/trattamenti' ? 'Servizi' : route === '/dove-siamo' ? 'Dove siamo' : route === '/chi-siamo' ? 'Chi siamo' : route === '/blog' ? 'Blog' : 'Prenota'

  return (
    <main className="min-h-screen bg-[#0e0b0d] text-[#f5eee9]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0e0b0d]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <button onClick={() => go('/')}>
            <Logo />
          </button>
          <nav className="hidden gap-2 text-sm md:flex">
            <Link to="/">Home</Link>
            <Link to="/trattamenti">Servizi</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </nav>
          <a
            href="tel:+393313769201"
            className="rounded-full border border-rose-200/60 px-4 py-2 text-xs font-semibold text-rose-100 hover:bg-rose-200 hover:text-black"
          >
            Chiama
          </a>
        </div>
        <div className="md:hidden overflow-x-auto px-4 pb-3">
          <div className="flex w-max gap-2 text-xs">
            <Link to="/">Home</Link>
            <Link to="/trattamenti">Servizi</Link>
            <Link to="/dove-siamo">Dove siamo</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </div>
        </div>
      </header>

      <div className="border-b border-white/10 bg-[#131014] px-4 py-2 text-xs text-[#d8c8c0] md:px-6">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <button onClick={() => go('/')} className="underline-offset-2 hover:text-rose-100 hover:underline">
            Home
          </button>
          <span>/</span>
          <span className="font-semibold text-rose-100">{sectionLabel}</span>
        </div>
      </div>

      <PageShell>{page}</PageShell>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-[#bcaea6]">
        <div className="font-semibold text-[#e7d9d1]">Glamour · Mantova</div>
        <div className="mt-1">Via Giorgio Susani, 16 · Tel. 331 376 9201</div>
      </footer>
    </main>
  )
}
