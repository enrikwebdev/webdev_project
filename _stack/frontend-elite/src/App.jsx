import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const heroImageRef = useRef(null)
  const heroTitleRef = useRef(null)
  const revealRefs = useRef([])
  const parallaxRefs = useRef([])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Hero cinematic intro
    gsap.fromTo(
      heroTitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    )

    gsap.fromTo(
      heroImageRef.current,
      { scale: 1.18, opacity: 0.75, rotate: -2 },
      {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.3,
        ease: 'power3.out',
      },
    )

    // Apple-like scrub on hero image
    gsap.to(heroImageRef.current, {
      scale: 0.9,
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: heroImageRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Section reveals
    revealRefs.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
          },
        },
      )
    })

    // Parallax media blocks
    parallaxRefs.current.forEach((el) => {
      if (!el) return
      gsap.fromTo(
        el,
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
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

  const setParallaxRef = (el) => {
    if (el && !parallaxRefs.current.includes(el)) parallaxRefs.current.push(el)
  }

  return (
    <main className="bg-[#04060f] text-white">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(56,189,248,0.28),transparent_35%),radial-gradient(circle_at_15%_0%,rgba(244,63,94,0.25),transparent_35%)]" />
        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between px-6 pb-10 pt-20">
          <div ref={heroTitleRef}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Caruso BarberShop · Bergamo (BG)</p>
            <h1 className="max-w-5xl text-5xl font-black leading-[0.9] md:text-8xl">
              Barber premium.
              <br />
              Precisione da vetrina.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
              Un’esperienza di grooming ad alto impatto: look pulito, proporzioni curate, stile immediatamente riconoscibile.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+390350160947" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30">Prenota ora</a>
              <a href="#esperienza" className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100">Scorri esperienza</a>
            </div>
          </div>

          <div className="mt-8 md:mt-0">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
              <img
                ref={heroImageRef}
                src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1800&q=80"
                alt="Barber premium in azione"
                className="h-[44vh] w-full object-cover md:h-[52vh]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STORY */}
      <section id="esperienza" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div ref={setRevealRef} className="mb-14">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Problema → Soluzione</p>
          <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Smetti di sembrare “appena tagliato”.
            <br />
            Inizia a sembrare <span className="text-cyan-300">definito</span>.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Problema', 'Taglio e barba spesso non dialogano tra loro: risultato confuso e poco professionale.'],
            ['Agitazione', 'L’immagine perde coerenza: nei contesti sociali/lavorativi la percezione cala subito.'],
            ['Soluzione', 'Consulenza rapida + linee precise + rifinitura premium in un percorso unico.'],
          ].map(([title, text]) => (
            <article key={title} ref={setRevealRef} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-slate-300">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PARALLAX STRIP */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 md:grid-cols-2">
        <div ref={setParallaxRef} className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=80"
            alt="Rifinitura barba precisa"
            className="h-[420px] w-full object-cover"
          />
        </div>
        <div ref={setRevealRef} className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-8">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Benefici concreti</p>
          <ul className="mt-6 space-y-4 text-lg text-slate-200">
            <li>• Linee pulite e proporzioni viso valorizzate</li>
            <li>• Risultato professionale già dal primo appuntamento</li>
            <li>• Gestione quotidiana più semplice e veloce</li>
            <li>• Esperienza premium in Borgo Santa Caterina</li>
          </ul>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section id="recensioni" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div ref={setRevealRef}>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Clienti soddisfatti</p>
          <h2 className="mt-4 text-4xl font-black md:text-6xl">Fiducia costruita sul risultato</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            '“Ottima esperienza, posto stupendo e accogliente.”',
            '“Servizio preciso, rapido e molto curato nei dettagli.”',
            '“Finalmente un barbiere che capisce davvero lo stile che voglio.”',
          ].map((q) => (
            <blockquote key={q} ref={setRevealRef} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-slate-200">
              {q}
              <span className="mt-3 block text-sm text-cyan-300">— Cliente locale</span>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div ref={setRevealRef} className="rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 via-blue-950/60 to-slate-900 p-10 text-center md:p-14">
          <h2 className="text-4xl font-black md:text-6xl">Prenota il tuo prossimo taglio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Via Borgo Santa Caterina 61, Bergamo (BG) · Posti limitati per mantenere standard premium.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-8 py-4 text-base font-bold shadow-lg shadow-fuchsia-500/30">Chiama 035 0160947</a>
        </div>
      </section>
    </main>
  )
}
