import { motion } from 'framer-motion'

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300"
        >
          Frontend Elite Stack Ready
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-3xl text-5xl font-black leading-tight md:text-7xl"
        >
          React + Vite + Tailwind v4 + Framer Motion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          Stack frontend pulito, senza integrazioni OAuth lato sito. Uso API Google riservato solo a strumenti operativi interni.
        </motion.p>
      </section>
    </main>
  )
}
