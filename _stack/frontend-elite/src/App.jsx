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
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/60 text-xs font-black text-amber-300">CB</div>
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-amber-300">Caruso</div>
        <div className="-mt-0.5 text-[10px] uppercase tracking-[0.24em] text-[#cec8ba]">BarberShop</div>
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
        { opacity: 1, y: 0, duration: 0.65, delay: i * 0.02, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%' } },
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

function VisualStoryBlock({ title, text, image, badge }) {
  return (
    <article data-reveal className="grid overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#121214] md:grid-cols-2">
      <figure className="relative min-h-[260px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-xs tracking-[0.14em] text-amber-200 backdrop-blur">{badge}</span>
      </figure>
      <div className="flex items-center p-7 md:p-10">
        <div>
          <h3 className="text-3xl font-black leading-tight">{title}</h3>
          <p className="mt-4 text-[#d3cec4]">{text}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-amber-200">
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Precisione</span>
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Impatto visivo</span>
            <span className="rounded-full border border-amber-300/40 px-3 py-1">Stile personale</span>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(212,175,55,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Caruso BarberShop · Bergamo</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Classic barber culture, premium execution.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#d6d1c7]">Taglio uomo e barba in stile contemporaneo, con precisione sartoriale e atmosfera elegante.</p>
            <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black">Prenota ora</a>
          </div>
          <figure data-reveal className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80" alt="Barber professionale in salone" className="h-[500px] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-20">
        <div data-reveal className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Storytelling visivo</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Dal problema al risultato, senza blocchi noiosi</h2>
        </div>

        <VisualStoryBlock
          badge="01 · Diagnosi"
          title="Taglio e barba devono parlare la stessa lingua"
          text="Analizziamo forma del viso, densità, stile di vita e obiettivo estetico. Ogni scelta tecnica parte da qui, non da template standard."
          image="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=80"
        />

        <VisualStoryBlock
          badge="02 · Esecuzione"
          title="Linee pulite, sfumature controllate, dettaglio premium"
          text="Tecnica e precisione per un risultato elegante subito visibile, con transizioni pulite e finitura professionale."
          image="https://images.unsplash.com/photo-1512690459411-b0fd1c86b8a8?auto=format&fit=crop&w=1400&q=80"
        />

        <VisualStoryBlock
          badge="03 · Risultato"
          title="Look forte oggi, mantenibile domani"
          text="Ti consegniamo uno stile che regge nel quotidiano: più presenza, più coerenza, meno tempo perso davanti allo specchio."
          image="https://images.unsplash.com/photo-1503951458645-643d53d661c5?auto=format&fit=crop&w=1400&q=80"
        />
      </section>
    </>
  )
}

function TrattamentiPage() {
  const services = [
    ['Signature Cut', 'Taglio sartoriale su linee viso e stile personale.', 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80'],
    ['Beard Architecture', 'Definizione barba con geometrie bilanciate e naturali.', 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1200&q=80'],
    ['Fade Precision', 'Sfumature pulite ad alta precisione.', 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80'],
    ['Express Maintenance', 'Ritocco rapido per mantenere il look ordinato.', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Trattamenti</p>
        <h1 className="mt-3 text-5xl font-black">Servizi premium uomo</h1>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#111113]">
            <img src={img} alt={t} className="h-52 w-full object-cover" />
            <div className="p-7">
              <h2 className="text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-[#d3cec4]">{d}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ChiSiamoPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-6 md:grid-cols-2">
        <figure data-reveal className="overflow-hidden rounded-3xl border border-white/10">
          <img src="https://images.unsplash.com/photo-1589985270958-b3f8f5cb7f44?auto=format&fit=crop&w=1400&q=80" alt="Team barber" className="h-full w-full object-cover" />
        </figure>
        <div data-reveal className="rounded-3xl border border-white/10 bg-[#111113] p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Chi siamo</p>
          <h1 className="mt-3 text-5xl font-black leading-tight">Tradizione barber, mentalità contemporanea</h1>
          <p className="mt-6 text-lg text-[#d3cec4]">Caruso BarberShop unisce cultura classica del grooming maschile e cura moderna del dettaglio. Ogni appuntamento è progettato per darti un risultato forte, credibile e coerente con chi sei.</p>
          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">10+</strong>Anni</div>
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">1000+</strong>Clienti</div>
            <div className="rounded-xl border border-white/10 py-3"><strong className="block text-amber-200">4.8/5</strong>Valutazione</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function BlogPage() {
  const posts = [
    ['Come scegliere il taglio in base al viso', 'Guida pratica per evitare errori comuni.', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80'],
    ['Barba corta o lunga?', 'Strategie di mantenimento professionale.', 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=1200&q=80'],
    ['Routine post-barber', 'Prodotti e passaggi per tenere il risultato più a lungo.', 'https://images.unsplash.com/photo-1470259078422-826894b933aa?auto=format&fit=crop&w=1200&q=80'],
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli grooming & stile</h1>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {posts.map(([t, d, img]) => (
          <article key={t} data-reveal className="overflow-hidden rounded-3xl border border-white/10 bg-[#111113]">
            <img src={img} alt={t} className="h-44 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-bold">{t}</h2>
              <p className="mt-3 text-[#d3cec4]">{d}</p>
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
      <div data-reveal className="grid overflow-hidden rounded-[2rem] border border-amber-300/30 bg-gradient-to-r from-[#121214] to-[#171514] md:grid-cols-2">
        <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80" alt="Prenota barber" className="h-full min-h-[320px] w-full object-cover" />
        <div className="p-10 md:p-14">
          <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Prenota</p>
          <h1 className="mt-3 text-5xl font-black">Blocca il tuo slot</h1>
          <p className="mt-4 max-w-xl text-[#d4cfc4]">Via Borgo Santa Caterina 61, Bergamo (BG). Disponibilità limitata per mantenere standard elevati.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-amber-300 px-8 py-4 text-base font-bold text-black">Chiama 035 0160947</a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { route, go } = useRoute()

  const page = useMemo(() => {
    if (route === '/trattamenti') return <TrattamentiPage />
    if (route === '/chi-siamo') return <ChiSiamoPage />
    if (route === '/blog') return <BlogPage />
    if (route === '/prenota') return <PrenotaPage />
    return <Home />
  }, [route])

  const Link = ({ to, children }) => (
    <button onClick={() => go(to)} className="hover:text-amber-300">{children}</button>
  )

  return (
    <main className="min-h-screen bg-[#0a0a0b] text-[#f5f3ef]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button onClick={() => go('/')}><Logo /></button>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link to="/trattamenti">Trattamenti</Link>
            <Link to="/chi-siamo">Chi siamo</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/prenota">Prenota</Link>
          </nav>
          <a href="tel:+390350160947" className="rounded-full border border-amber-300/60 px-4 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-300 hover:text-black">Chiama</a>
        </div>
      </header>

      <PageShell>{page}</PageShell>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-[#a8a193]">Caruso BarberShop · Bergamo</footer>
    </main>
  )
}
