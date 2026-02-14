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
          delay: i * 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 84%' },
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
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_5%,rgba(212,175,55,0.12),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div ref={setRevealRef}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Caruso BarberShop · Bergamo</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">
              Classic barber culture,
              <br />
              premium execution.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[#d6d1c7]">
              Taglio uomo e barba in stile contemporaneo, con precisione sartoriale e atmosfera elegante. Un servizio pensato per chi vuole distinguersi.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+390350160947" className="rounded-full bg-amber-300 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-200">
                Prenota ora
              </a>
              <a href="#servizi" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-200">
                Esplora servizi
              </a>
            </div>
          </div>

          <figure ref={setRevealRef} className="overflow-hidden rounded-[1.8rem] border border-white/10 shadow-2xl shadow-black/50">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80"
              alt="Barber professionale in salone"
              className="h-[520px] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section id="servizi" className="mx-auto max-w-7xl px-6 py-24">
        <div ref={setRevealRef} className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Perché scegliere Caruso</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">Esperienza, immagine, precisione.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Taglio su misura', 'Studio delle proporzioni viso per un risultato pulito, moderno e coerente.'],
            ['Barba e rifinitura', 'Linee precise, sfumature controllate e finitura professionale.'],
            ['Routine semplice', 'Look forte ma facile da mantenere anche nei giorni successivi.'],
          ].map(([title, text]) => (
            <article key={title} ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-7">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-[#d3cec4]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2">
        <div ref={setRevealRef} className="rounded-3xl border border-white/10 bg-[#111113] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Prova sociale</p>
          <h3 className="mt-4 text-3xl font-black">Clienti soddisfatti</h3>
          <div className="mt-6 space-y-4 text-[#ddd8cd]">
            <blockquote>“Ottima esperienza, posto stupendo e accogliente.”</blockquote>
            <blockquote>“Servizio preciso, rapido e molto curato nei dettagli.”</blockquote>
            <blockquote>“Finalmente un barbiere che capisce davvero lo stile che voglio.”</blockquote>
          </div>
        </div>

        <figure ref={setRevealRef} className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1503951458645-643d53d661c5?auto=format&fit=crop&w=1400&q=80"
            alt="Dettaglio barba e grooming"
            className="h-[420px] w-full object-cover"
          />
        </figure>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div ref={setRevealRef} className="rounded-[2rem] border border-amber-300/30 bg-gradient-to-r from-[#121214] to-[#171514] p-10 text-center md:p-14">
          <h2 className="text-4xl font-black md:text-6xl">Prenota il tuo prossimo appuntamento</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#d4cfc4]">Via Borgo Santa Caterina 61, Bergamo (BG). Disponibilità limitata per mantenere standard elevati.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-amber-300 px-8 py-4 text-base font-bold text-black transition hover:bg-amber-200">
            Chiama 035 0160947
          </a>
        </div>
      </section>
    </main>
  )
}
