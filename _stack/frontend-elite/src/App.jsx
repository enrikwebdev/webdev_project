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
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-rose-300/70 text-xs font-black text-rose-200">LA</div>
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-rose-200">Laura</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#e2d4d8]">Acconciature</div>
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
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, delay: i * 0.02, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%' } })
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [])

  return <>{children}</>
}

function VisualStoryBlock({ title, text, image, badge }) {
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
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-rose-100">
            <span className="rounded-full border border-rose-300/40 px-3 py-1">Stile su misura</span>
            <span className="rounded-full border border-rose-300/40 px-3 py-1">Risultato naturale</span>
            <span className="rounded-full border border-rose-300/40 px-3 py-1">Prenota facile</span>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(244,114,182,0.16),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-rose-200">Laura Acconciature · Bergamo</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Beauty hair premium, risultato che si nota subito.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#e8dce1]">Taglio, colore e styling personalizzati per valorizzare il tuo viso e il tuo stile, in un ambiente elegante e rilassante.</p>
            <a href="tel:+390354519485" className="mt-8 inline-block rounded-full bg-rose-300 px-6 py-3 text-sm font-bold text-black">Prenota ora</a>
          </div>
          <figure data-reveal className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80" alt="Salone parrucchiere premium" className="h-[500px] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-20">
        <div data-reveal className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-200">Storytelling visivo</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Dal look stanco a uno stile che ti rappresenta</h2>
        </div>

        <VisualStoryBlock
          badge="01 · Analisi"
          title="Ogni trattamento parte da te"
          text="Valutiamo forma viso, tipo capello e obiettivo estetico per costruire un risultato coerente, naturale e adatto alla tua routine." 
          image="https://images.unsplash.com/photo-1522336284037-91f7da073525?auto=format&fit=crop&w=1400&q=80"
        />

        <VisualStoryBlock
          badge="02 · Esecuzione"
          title="Tecnica precisa, dettagli curati"
          text="Taglio e colore vengono eseguiti con precisione professionale per ottenere armonia, luminosità e movimento senza effetto artificiale."
          image="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80"
        />

        <VisualStoryBlock
          badge="03 · Risultato"
          title="Più sicurezza ogni giorno"
          text="Esci dal salone con uno stile d’impatto ma facile da mantenere, per sentirti ordinata e valorizzata in ogni occasione."
          image="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80"
        />
      </section>
    </>
  )
}

function TrattamentiPage() {
  const services = [
    ['Taglio Personalizzato', 'Taglio su misura in base a viso, volume e stile.', 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1200&q=80'],
    ['Colore & Schiariture', 'Tecniche colore per luminosità naturale e armoniosa.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'],
    ['Piega Styling', 'Piega durevole, morbida e adatta alla tua quotidianità.', 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=1200&q=80'],
    ['Trattamenti Ricostruzione', 'Nutrimento profondo per capelli più sani e forti.', 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-200">Trattamenti</p>
        <h1 className="mt-3 text-5xl font-black">Servizi capelli premium</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#171116]">
            <img src={img} alt={t} className="h-52 w-full object-cover" />
            <div className="p-7"><h2 className="text-2xl font-bold">{t}</h2><p className="mt-3 text-[#e6d8dd]">{d}</p></div>
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
          <img src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1400&q=80" alt="Bergamo" className="h-full min-h-[340px] w-full object-cover" />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#171116] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-200">Dove siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Via Giambattista Tiepolo 11, Bergamo</h1>
          <p className="mt-6 text-lg text-[#e6d8dd]">Laura Acconciature si trova a Bergamo, in una posizione comoda da raggiungere per un appuntamento rapido e di qualità.</p>
          <p className="mt-3 text-[#e6d8dd]"><strong>Telefono:</strong> 035 4519485</p>
          <a href="tel:+390354519485" className="mt-7 inline-block rounded-full bg-rose-300 px-6 py-3 text-sm font-bold text-black">Chiama ora</a>
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
          <img src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=1400&q=80" alt="Parrucchiera al lavoro" className="h-full w-full object-cover" />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#171116] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-200">Chi siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Esperienza, ascolto, risultato su misura</h1>
          <p className="mt-6 text-lg text-[#e6d8dd]">Laura Acconciature unisce attenzione artigianale e gusto contemporaneo. L’obiettivo è offrirti un look che valorizza i tuoi tratti e resta bello anche nei giorni successivi.</p>
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  const posts = [
    ['Taglio giusto in base alla forma del viso', 'Come valorizzare i lineamenti con scelte semplici.', 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1200&q=80'],
    ['Come mantenere il colore luminoso più a lungo', 'Routine rapida tra un appuntamento e l’altro.', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'],
    ['Capelli sani: errori comuni da evitare', 'Piccoli cambi che migliorano subito la qualità del capello.', 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-rose-200">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli capelli & beauty</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#171116]">
            <img src={img} alt={t} className="h-44 w-full object-cover" />
            <div className="p-6"><h2 className="text-xl font-bold">{t}</h2><p className="mt-3 text-[#e6d8dd]">{d}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PrenotaPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-rose-300/30 bg-gradient-to-r from-[#1a1318] to-[#241920] md:grid-cols-2">
        <img src="https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1400&q=80" alt="Prenota salone" className="h-full min-h-[320px] w-full object-cover" />
        <div className="p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-rose-200">Prenota</p>
          <h1 className="mt-3 break-words text-4xl font-black leading-tight md:text-5xl">Blocca il tuo appuntamento</h1>
          <p className="mt-4 max-w-xl text-[#eadde2]">Via Giambattista Tiepolo 11, Bergamo (BG). Disponibilità limitata nelle fasce più richieste.</p>
          <a href="tel:+390354519485" className="mt-8 inline-block w-full rounded-full bg-rose-300 px-6 py-4 text-center text-base font-bold text-black sm:w-auto sm:px-8">Chiama 035 4519485</a>
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
    <button onClick={() => go(to)} className={`whitespace-nowrap rounded-full px-3 py-1.5 ${route === to ? 'bg-rose-300 text-black' : 'hover:text-rose-200'}`}>
      {children}
    </button>
  )

  const sectionLabel = route === '/' ? 'Home' : route === '/trattamenti' ? 'Trattamenti' : route === '/dove-siamo' ? 'Dove siamo' : route === '/chi-siamo' ? 'Chi siamo' : route === '/blog' ? 'Blog' : 'Prenota'

  return (
    <main className="min-h-screen bg-[#100c10] text-[#f5edf1]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#100c10]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <button onClick={() => go('/')}><Logo /></button>
          <nav className="hidden gap-2 text-sm md:flex">
            <Link to="/">Home</Link><Link to="/trattamenti">Trattamenti</Link><Link to="/dove-siamo">Dove siamo</Link><Link to="/chi-siamo">Chi siamo</Link><Link to="/blog">Blog</Link><Link to="/prenota">Prenota</Link>
          </nav>
          <a href="tel:+390354519485" className="rounded-full border border-rose-300/60 px-4 py-2 text-xs font-semibold text-rose-100 hover:bg-rose-300 hover:text-black">Chiama</a>
        </div>
        <div className="md:hidden overflow-x-auto px-4 pb-3"><div className="flex w-max gap-2 text-xs">
          <Link to="/">Home</Link><Link to="/trattamenti">Trattamenti</Link><Link to="/dove-siamo">Dove siamo</Link><Link to="/chi-siamo">Chi siamo</Link><Link to="/blog">Blog</Link><Link to="/prenota">Prenota</Link>
        </div></div>
      </header>

      <div className="border-b border-white/10 bg-[#161118] px-4 py-2 text-xs text-[#d6c4cd] md:px-6"><div className="mx-auto flex max-w-7xl items-center gap-2"><button onClick={() => go('/')} className="underline-offset-2 hover:text-rose-200 hover:underline">Home</button><span>/</span><span className="font-semibold text-rose-200">{sectionLabel}</span></div></div>

      <PageShell>{page}</PageShell>
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-[#bdaab3]">Laura Acconciature · Bergamo</footer>
    </main>
  )
}
