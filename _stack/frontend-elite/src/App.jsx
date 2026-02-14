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
  return <div className="text-sm font-black tracking-[0.2em] text-rose-200">LAURA ACCONCIATURE</div>
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
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.03, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.16),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2">
          <div data-reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">Bergamo · Via Tiepolo 11</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Capelli impeccabili. Caffè perfetto. Zero stress.</h1>
            <p className="mt-6 max-w-xl text-lg text-[#f5d9e7]">Da Caffè Pacini Forbici e Tazzine trasformi il look in un ambiente rilassato, con servizio rapido, risultato premium e prenotazione semplice.</p>
            <a href="tel:+390354519485" className="mt-8 inline-block rounded-full bg-rose-300 px-6 py-3 text-sm font-bold text-black">Chiama e prenota</a>
          </div>
          <img data-reveal src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1500&q=80" alt="Salon lounge" className="h-[500px] w-full rounded-[1.8rem] object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-20">
        <article data-reveal className="rounded-3xl border border-white/10 bg-[#151118] p-8">
          <h2 className="text-3xl font-black">Il problema</h2><p className="mt-3 text-[#e8d9e2]">Saloni anonimi, attese lunghe, risultato poco personalizzato.</p>
        </article>
        <article data-reveal className="rounded-3xl border border-white/10 bg-[#151118] p-8">
          <h2 className="text-3xl font-black">La soluzione</h2><p className="mt-3 text-[#e8d9e2]">Consulenza veloce, taglio/colore su misura, atmosfera caffetteria che rende l'appuntamento piacevole.</p>
        </article>
        <article data-reveal className="rounded-3xl border border-white/10 bg-[#151118] p-8">
          <h2 className="text-3xl font-black">Prova sociale</h2><p className="mt-3 text-[#e8d9e2]">Valutazione 4.7/5 su 58 recensioni: clienti soddisfatti per precisione tecnica, cortesia e comfort.</p>
        </article>
      </section>
    </>
  )
}

function Trattamenti() {
  const s = ['Cut & Style Donna', 'Cut Uomo', 'Colore & Gloss', 'Piega Express', 'Barba & Rifinitura']
  return <section className="mx-auto max-w-7xl px-6 py-16"><h1 data-reveal className="text-5xl font-black">Trattamenti</h1><div className="mt-8 grid gap-4 md:grid-cols-2">{s.map((x)=><div key={x} data-reveal className="rounded-2xl border border-white/10 bg-[#151118] p-6">{x}</div>)}</div></section>
}

function ChiSiamo(){return <section className="mx-auto max-w-6xl px-6 py-16"><div data-reveal className="rounded-3xl border border-white/10 bg-[#151118] p-8"><h1 className="text-5xl font-black">Chi siamo</h1><p className="mt-4 text-[#e8d9e2]">Concept ibrido servizio capelli naturale nel cuore di Città Studi: servizio tecnico, tempi ottimizzati, esperienza distintiva.</p></div></section>}
function Prenota(){return <section className="mx-auto max-w-6xl px-6 py-16"><div data-reveal className="rounded-3xl border border-rose-300/30 bg-[#1a1320] p-10"><h1 className="text-5xl font-black">Prenota ora</h1><p className="mt-4 text-[#e8d9e2]">Via Giovanni Pacini 37, Milano · Tel. 035 4519485</p><a href="tel:+390354519485" className="mt-6 inline-block rounded-full bg-rose-300 px-6 py-3 font-bold text-black">Chiama 035 4519485</a></div></section>}

export default function App(){
  const {route,go}=useRoute()
  const page=useMemo(()=>route==='/trattamenti'?<Trattamenti/>:route==='/chi-siamo'?<ChiSiamo/>:route==='/prenota'?<Prenota/>:<Home/>,[route])
  const Link=({to,children})=><button onClick={()=>go(to)} className={`rounded-full px-3 py-1.5 ${route===to?'bg-rose-300 text-black':'hover:text-rose-300'}`}>{children}</button>
  return <main className="min-h-screen bg-[#0b090d] text-[#fff7fb]"><header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b090d]/90 px-6 py-4 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between"><button onClick={()=>go('/')}><Logo/></button><nav className="flex gap-2 text-sm"><Link to="/">Home</Link><Link to="/trattamenti">Trattamenti</Link><Link to="/chi-siamo">Chi siamo</Link><Link to="/prenota">Prenota</Link></nav></div></header><PageShell>{page}</PageShell><footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-[#d9c0cf]">Laura Acconciature · Bergamo</footer></main>
}
