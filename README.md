# Shaft-Shank Redemption 2026

Liveboard med odds för touren. Vite + React 19 + TypeScript + Tailwind 4 + Motion + Firebase (Firestore & Auth).

- `/` – hero, live-odds, liveboard, oddsgraf, scramble/småtävlingar, format
- `/admin` – admin för in resultat (lottning, scramble, småtävlingar, finalrunda) och publicerar
- `/arkiv` – 2020 & 2021: intron, resultat, Hulta-banguiden och de gamla profilbilderna

## Kom igång

```bash
npm install
npm run dev
```

Utan Firestore-åtkomst kör sidan automatiskt i **demoläge** (data i localStorage, admin utan inloggning).
Sätt `VITE_DEMO=true` i `.env.local` för att tvinga demoläge.

## Sätta upp live-läget (en gång)

1. Firebase Console → projektet `shaftshankredemption`:
   - **Authentication → Sign-in method**: aktivera *Google*.
   - **Authentication → Settings → Authorized domains**: lägg till Netlify-domänen.
2. Byt `ADMIN_EMAIL_HERE` i `firestore.rules` mot adminens Google-konto och deploya reglerna:
   ```bash
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules
   ```
3. Skapa `.env.local` (och samma env-variabel i Netlify):
   ```
   VITE_ADMIN_EMAILS=admin@example.com
   ```

Data ligger i dokumentet `seasons/2026`. Alla läser, bara admin skriver.

## Oddsen

Monte Carlo (20 000 simuleringar) av allt som inte är spelat: lottning, scramble, småtävlingar och finalrundan.
Finalen är slaggolf: netto = bruttoslag − spel-hcp, lägst vinner. Förväntade bruttoslag ≈ par + 1,05·hcp + 3,
spridning ≈ 3,5 + 0,12·hcp. Under finalen räknas spelade slag + förväntat på återstående hål.
Odds = 0,92 / sannolikhet.
Se `src/lib/odds.ts` och reglerna i `src/lib/scoring.ts`.

## Deploy

Netlify: build `npm run build`, publish `dist` (se `netlify.toml`).
