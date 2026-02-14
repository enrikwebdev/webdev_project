import { useState } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { motion } from 'framer-motion'

export default function App({ clientIdConfigured }) {
  const [jwt, setJwt] = useState('')

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
          Google OAuth integrato nel progetto web dev
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-6 max-w-2xl text-lg text-slate-300"
        >
          Login Google pronto con Google Identity Services. Inserisci il tuo client ID in <code>.env</code> per attivarlo.
        </motion.p>

        <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          {!clientIdConfigured && (
            <p className="mb-4 text-sm text-amber-300">
              Configurazione mancante: imposta <code>VITE_GOOGLE_CLIENT_ID</code> nel file <code>.env</code>.
            </p>
          )}

          {!jwt ? (
            <GoogleLogin
              onSuccess={(credentialResponse) => setJwt(credentialResponse.credential || '')}
              onError={() => alert('Login Google non riuscito')}
              useOneTap
            />
          ) : (
            <div className="space-y-3">
              <p className="text-emerald-300">Login Google riuscito ✅</p>
              <p className="break-all text-xs text-slate-400">JWT (preview): {jwt.slice(0, 40)}...</p>
              <button
                className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-600"
                onClick={() => {
                  googleLogout()
                  setJwt('')
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
