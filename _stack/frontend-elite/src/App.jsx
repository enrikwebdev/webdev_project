import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const revealRefs = useRef([])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1, smoothWheel: true, wheelMultiplier: 0.9 })
    let rafId
    const raf = (t) => {
      lenis.raf(t)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    revealRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.03,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        },
      )
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((s) => s.kill())
    }
  }, [])

  const setRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  return (
    <main className="bg-[#0a0a0b] text-[#f5f3ef]">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0a0a0b]/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">Caruso BarberShop</div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#trattamenti" className="hover:text-amber-300">Trattamenti</a>
            <a href="#dove" className="hover:text-amber-300">Dove Siamo</a>
            <a href="#chi" className="hover:text-amber-300">Chi Siamo</a>
            <a href="#blog" className="hover:text-amber-300">Blog</a>
            <a href="#prenota" className="hover:text-amber-300">Prenota</a>
          </nav>
          <a href="tel:+390350160947" className="rounded-full border border-amber-300/60 px-4 py-2 text-xs font-semibold text-amber-200 hover:bg-amber-300 hover:text-black">Chiama</a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(212,175,55,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[82vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div ref={setRevealRef}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Caruso BarberShop · Bergamo</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Classic barber culture, premium execution.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#d6d1c7]">Taglio uomo e barba in stile contemporaneo, con precisione sartoriale e atmosfera elegante.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#prenota" className="rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-200">Prenota ora</a>
              <a href="#trattamenti" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">Trattamenti</a>
            </div>
          </div>

          <figure ref={setRevealRef} className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80" alt="Barber professionale in salone" className="h-[500px] w-full object-cover" />
          </figure>
        </div>
      </section>

      <section id="trattamenti" className="mx-auto max-w-7xl px-6 py-20">
        <div ref={setRevealRef} className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Trattamenti</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Servizi premium uomo</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Signature Cut', 'Taglio su misura con studio proporzioni viso e texture capelli.'],
            ['Beard Architecture', 'Rifinitura e modellatura barba con linee pulite e naturali.'],
            ['Style Maintenance', 'Ritocco rapido per mantenere il look sempre professionale.'],
          ].map(([title, text]) => (
            <article key={title} ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-7">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-[#d3cec4]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="dove" className="mx-auto grid max-w-7xl gap-6 px-6 pb-16 md:grid-cols-2">
        <div ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Dove siamo</p>
          <h3 className="mt-3 text-3xl font-black">Borgo Santa Caterina, Bergamo</h3>
          <p className="mt-4 text-[#d4cfc4]">Via Borgo Santa Caterina 61, 24124 Bergamo (BG)</p>
          <p className="mt-2 text-[#d4cfc4]"><strong>Telefono:</strong> 035 0160947</p>
          <a href="tel:+390350160947" className="mt-6 inline-block rounded-full bg-amber-300 px-5 py-3 text-sm font-bold text-black">Apri chiamata</a>
        </div>
        <figure ref={setRevealRef} className="overflow-hidden rounded-3xl border border-white/10">
          <img src="https://images.unsplash.com/photo-1503951458645-643d53d661c5?auto=format&fit=crop&w=1400&q=80" alt="Interno barber shop" className="h-[390px] w-full object-cover" />
        </figure>
      </section>

      <section id="chi" className="mx-auto max-w-7xl px-6 pb-16">
        <div ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Chi siamo</p>
          <h3 className="mt-3 text-3xl font-black">Tradizione barber, mentalità contemporanea</h3>
          <p className="mt-4 max-w-3xl text-[#d4cfc4]">Caruso BarberShop unisce cultura classica del grooming maschile e attenzione moderna al dettaglio. Il nostro obiettivo è semplice: farti uscire con un’immagine forte, coerente e riconoscibile.</p>
        </div>
      </section>

      <section id="blog" className="mx-auto max-w-7xl px-6 pb-16">
        <div ref={setRevealRef} className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Blog</p>
          <h3 className="mt-3 text-3xl font-black md:text-4xl">Consigli grooming & stile</h3>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['Come scegliere il taglio in base al viso', 'Guida pratica per evitare errori comuni.'],
            ['Barba corta o lunga? Strategie di mantenimento', 'Routine essenziale per una barba sempre ordinata.'],
            ['Prodotti da usare tra un appuntamento e l’altro', 'Come mantenere texture e definizione senza appesantire.'],
          ].map(([title, text]) => (
            <article key={title} ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-7">
              <h4 className="text-xl font-bold">{title}</h4>
              <p className="mt-3 text-[#d3cec4]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="prenota" className="mx-auto max-w-7xl px-6 pb-24">
        <div ref={setRevealRef} className="rounded-[2rem] border border-amber-300/30 bg-gradient-to-r from-[#121214] to-[#171514] p-10 text-center md:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Prenota</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Blocca il tuo slot</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#d4cfc4]">Disponibilità limitata per mantenere standard elevati e tempi puntuali.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-amber-300 px-8 py-4 text-base font-bold text-black transition hover:bg-amber-200">Chiama 035 0160947</a>
        </div>
      </section>
    </main>
  )
}
