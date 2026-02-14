import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const heroRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { scale: 1.06, opacity: 0.85 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
        },
      )
    }

    cardsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill())
      lenis.destroy()
    }
  }, [])

  return (
    <main className="bg-[#070b14] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.28),transparent_35%),radial-gradient(circle_at_10%_0%,rgba(244,63,94,0.22),transparent_30%)]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Caruso BarberShop · Bergamo (BG)</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Barber experience premium, risultato immediato.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Taglio e barba progettati sul tuo volto e sul tuo stile. Precisione, velocità e qualità da barbiere moderno, nel cuore di Bergamo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+390350160947" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25">Prenota ora</a>
              <a href="#recensioni" className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100">Recensioni</a>
            </div>
          </motion.div>

          <div ref={heroRef}>
            <img
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=80"
              alt="Barbiere professionale al lavoro"
              className="h-[540px] w-full rounded-3xl object-cover shadow-2xl shadow-black/50"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Problema', 'Tagli standard e barba non allineata all’immagine personale.'],
            ['Agitazione', 'Perdita di autorevolezza: look poco curato nei contesti sociali e professionali.'],
            ['Soluzione', 'Consulenza rapida + tecnica precisa + rifinitura premium in un unico appuntamento.'],
          ].map(([title, text], i) => (
            <article
              key={title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur"
            >
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-3 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="text-4xl font-black md:text-5xl">Benefici concreti</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=80"
            alt="Dettaglio rifinitura barba"
            className="h-80 w-full rounded-2xl object-cover"
          />
          <ul className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-slate-200">
            <li>• Look professionale e coerente in poco tempo</li>
            <li>• Precisione tecnica su linee e volumi</li>
            <li>• Esperienza premium, ambiente moderno</li>
            <li>• Posizione strategica: Borgo Santa Caterina, Bergamo</li>
          </ul>
        </div>
      </section>

      <section id="recensioni" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-black md:text-5xl">Clienti soddisfatti</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <blockquote className="rounded-2xl border border-cyan-900/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6">“Ottima esperienza, posto stupendo e accogliente.”<span className="mt-3 block text-sm text-cyan-300">— Recensione cliente</span></blockquote>
          <blockquote className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">“Servizio preciso, rapido e molto curato nei dettagli.”<span className="mt-3 block text-sm text-slate-400">— Cliente locale</span></blockquote>
          <blockquote className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">“Finalmente un barbiere che capisce davvero lo stile che voglio.”<span className="mt-3 block text-sm text-slate-400">— Cliente fidelizzato</span></blockquote>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-900 p-10 text-center">
          <h2 className="text-4xl font-black md:text-5xl">Prenota il tuo prossimo taglio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Via Borgo Santa Caterina 61, Bergamo (BG) · Disponibilità limitata.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-8 py-4 text-base font-bold shadow-lg shadow-fuchsia-500/30">Chiama 035 0160947</a>
        </div>
      </section>
    </main>
  )
}
