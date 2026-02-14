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
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.03,
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

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div data-reveal className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">In evidenza</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Esperienza, immagine, precisione</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Taglio su misura', 'Studio proporzioni viso e texture capelli.'],
            ['Barba precisa', 'Rifinitura pulita e naturale.'],
            ['Stile che dura', 'Routine semplice tra un appuntamento e l’altro.'],
          ].map(([t, d]) => (
            <article key={t} data-reveal className="rounded-3xl border border-white/10 bg-[#111113] p-7">
              <h3 className="text-2xl font-bold">{t}</h3>
              <p className="mt-3 text-[#d3cec4]">{d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function TrattamentiPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Trattamenti</p>
        <h1 className="mt-3 text-5xl font-black">Servizi premium uomo</h1>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {[
          ['Signature Cut', 'Taglio sartoriale su linee viso, stile e professione.'],
          ['Beard Architecture', 'Definizione barba con geometrie bilanciate e naturali.'],
          ['Fade Precision', 'Sfumature pulite ad alta precisione.'],
          ['Express Maintenance', 'Ritocco rapido per mantenere il look sempre ordinato.'],
        ].map(([t, d]) => (
          <article key={t} data-reveal className="rounded-3xl border border-white/10 bg-[#111113] p-7">
            <h2 className="text-2xl font-bold">{t}</h2>
            <p className="mt-3 text-[#d3cec4]">{d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function ChiSiamoPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Chi siamo</p>
        <h1 className="mt-3 text-5xl font-black">Tradizione barber, mentalità contemporanea</h1>
        <p className="mt-6 text-lg text-[#d3cec4]">Caruso BarberShop nasce per offrire un grooming maschile elegante, preciso e coerente con l’identità di chi lo sceglie. Ogni servizio è progettato per risultato immediato e mantenibilità reale.</p>
      </div>
    </section>
  )
}

function BlogPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div data-reveal>
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Blog</p>
        <h1 className="mt-3 text-5xl font-black">Consigli grooming & stile</h1>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          ['Come scegliere il taglio in base al viso', 'Guida pratica per evitare errori comuni.'],
          ['Barba corta o lunga?', 'Strategie di mantenimento professionale.'],
          ['Routine post-barber', 'Prodotti e passaggi per tenere il risultato più a lungo.'],
        ].map(([t, d]) => (
          <article key={t} data-reveal className="rounded-3xl border border-white/10 bg-[#111113] p-7">
            <h2 className="text-xl font-bold">{t}</h2>
            <p className="mt-3 text-[#d3cec4]">{d}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function PrenotaPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div data-reveal className="rounded-[2rem] border border-amber-300/30 bg-gradient-to-r from-[#121214] to-[#171514] p-10 text-center md:p-14">
        <p className="text-xs uppercase tracking-[0.22em] text-amber-300">Prenota</p>
        <h1 className="mt-3 text-5xl font-black">Blocca il tuo slot</h1>
        <p className="mx-auto mt-4 max-w-xl text-[#d4cfc4]">Via Borgo Santa Caterina 61, Bergamo (BG). Disponibilità limitata per mantenere standard elevati.</p>
        <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-amber-300 px-8 py-4 text-base font-bold text-black">Chiama 035 0160947</a>
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
