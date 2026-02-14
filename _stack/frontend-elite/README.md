# Frontend Elite (React + Vite + Tailwind + Framer Motion)

Stack pronto per esperienze premium e animazioni moderne.

## Google OAuth setup
1. Crea credenziali **OAuth Client ID (Web application)** su Google Cloud Console.
2. Aggiungi gli Authorized JavaScript origins (es. `http://localhost:5173`).
3. Copia `.env.example` in `.env`.
4. Inserisci il tuo client ID:
   - `VITE_GOOGLE_CLIENT_ID=...apps.googleusercontent.com`
5. Avvia:
   - `npm run dev`

Login Google già integrato in `src/App.jsx` tramite `@react-oauth/google`.
