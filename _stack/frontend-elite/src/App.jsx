import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export default function App() {
  return (
    <main className="bg-[#070b14] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(59,130,246,0.35),transparent_40%),radial-gradient(circle_at_15%_10%,rgba(236,72,153,0.25),transparent_35%)]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Caruso BarberShop · Bergamo (BG)</p>
            <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">Precisione da barber premium. In tempi rapidi.</h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Taglio e barba progettati sul tuo stile, con risultato pulito, professionale e coerente. Un’esperienza moderna pensata per chi vuole qualità senza perdere tempo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+390350160947" className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25">Prenota ora</a>
              <a href="#recensioni" className="rounded-full border border-slate-500 px-6 py-3 text-sm font-semibold text-slate-100">Guarda le recensioni</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <img
              src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=80"
              alt="Barbiere al lavoro in ambiente premium"
              className="h-[520px] w-full rounded-3xl object-cover shadow-2xl shadow-black/50"
            />
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div {...fadeUp} className="grid gap-6 md:grid-cols-3">
          {[
            ['Problema', 'Tagli generici e barbe poco coerenti con il tuo stile professionale.'],
            ['Soluzione', 'Consulenza rapida + esecuzione tecnica precisa su forma viso e routine.'],
            ['Beneficio', 'Look curato, tempi ottimizzati, immagine solida ogni giorno.'],
          ].map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="mt-3 text-slate-300">{text}</p>
            </article>
          ))}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <motion.h2 {...fadeUp} className="text-4xl font-black md:text-5xl">Perché Caruso BarberShop</motion.h2>
        <motion.div {...fadeUp} className="mt-8 grid gap-6 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1400&q=80"
            alt="Dettaglio rifinitura barba"
            className="h-80 w-full rounded-2xl object-cover"
          />
          <ul className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-slate-200">
            <li>• Precisione tecnica su taglio uomo e barba</li>
            <li>• Ambiente moderno, esperienza premium</li>
            <li>• Posizione centrale: Borgo Santa Caterina, Bergamo</li>
            <li>• Prenotazione rapida con CTA diretta</li>
          </ul>
        </motion.div>
      </section>

      <section id="recensioni" className="mx-auto max-w-7xl px-6 py-20">
        <motion.h2 {...fadeUp} className="text-4xl font-black md:text-5xl">Clienti soddisfatti</motion.h2>
        <motion.div {...fadeUp} className="mt-8 grid gap-5 md:grid-cols-3">
          <blockquote className="rounded-2xl border border-cyan-900/40 bg-gradient-to-b from-slate-900 to-slate-950 p-6">“Ottima esperienza, posto stupendo e accogliente.”<span className="mt-3 block text-sm text-cyan-300">— Recensione cliente</span></blockquote>
          <blockquote className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">“Taglio preciso e consigli utili per mantenere lo stile anche nei giorni successivi.”<span className="mt-3 block text-sm text-slate-400">— Cliente locale</span></blockquote>
          <blockquote className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">“Servizio rapido ma curato nei dettagli, perfetto per chi lavora e ha poco tempo.”<span className="mt-3 block text-sm text-slate-400">— Cliente fidelizzato</span></blockquote>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div {...fadeUp} className="rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900 via-blue-950/50 to-slate-900 p-10 text-center">
          <h2 className="text-4xl font-black md:text-5xl">Prenota il tuo prossimo taglio</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">Via Borgo Santa Caterina 61, Bergamo (BG) · Disponibilità limitata per fascia oraria.</p>
          <a href="tel:+390350160947" className="mt-8 inline-block rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-8 py-4 text-base font-bold shadow-lg shadow-fuchsia-500/30">Chiama 035 0160947</a>
        </motion.div>
      </section>
    </main>
  )
}
