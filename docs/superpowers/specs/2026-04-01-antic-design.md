# Antic — Design Spec

## Visione

Sito web di sensibilizzazione sulla disuguaglianza fiscale e patrimoniale in Italia. Percorso narrativo scrollytelling che guida l'utente dalla scoperta personale all'indignazione basata sui fatti, fino all'azione concreta.

## Pubblico

Doppio target:
- **Cittadini comuni** — non hanno mai guardato un bilancio pubblico, devono scoprire la realtà
- **Attivisti, giornalisti, politici locali** — cercano dati concreti e strumenti per argomentare

## Tono

Pedagogico-narrativo (scrollytelling). Tono sobrio ma umano, dati inattaccabili, design che fa il lavoro emotivo. Non grida, costruisce la consapevolezza attraverso i fatti. Il confronto visivo crea l'impatto.

## Architettura — Ibrido scrollytelling + pagine profonde

### Homepage (`/`) — Scrollytelling narrativo

Pagina a scorrimento verticale, 5 atti che si rivelano con lo scroll. Ogni atto occupa circa un viewport.

**Atto 1 — "Quanto dai allo Stato?"**
- Sfondo scuro, testo grande, un campo input al centro: "Inserisci il tuo reddito annuo lordo"
- Appena l'utente digita, compaiono animati: aliquota effettiva, € pagati, € che restano
- Freccia che invita a scrollare: "Ora vediamo chi sta dall'altra parte"

**Atto 2 — "Quanto paga chi ha di più?"**
- Due colonne affiancate: "Tu" a sinistra, "Top 0.1%" a destra
- Barre di percentuale animate con lo scroll — contrasto visivo immediato
- Frase d'impatto: "Tu dai il X% del tuo reddito. Chi possiede milioni dà il Y%."
- Link "Approfondisci →" verso `/confronto`

**Atto 3 — "Dove finiscono i tuoi soldi"**
- Bilancio dello Stato come blocchi proporzionali che si compongono scrollando
- Highlight sul debito: "€388 miliardi — più di sanità e istruzione messe insieme"
- Link "Esplora il bilancio →" verso `/bilancio`

**Atto 4 — "Come fanno gli altri"**
- 3-4 card in sequenza: Norvegia, Spagna, Francia, Germania
- Ogni card: tassa sui patrimoni, indicatore sanità, indicatore istruzione
- Messaggio: non è utopia, altri lo fanno già
- Link "Vedi il confronto completo →" verso `/mondo`

**Atto 5 — "Cosa puoi fare tu"**
- Tono diretto: "I numeri li hai visti. Ora hai una scelta."
- Tre card azione: "Simula una riforma" → `/simulatore`, "Scarica i dati" → `/agisci`, "Scrivi al tuo parlamentare" → `/agisci#template`
- Condivisione sociale

### Pagine profonde

**`/bilancio` — Il Bilancio dello Stato**
- Grafici interattivi completi (già implementati: entrate, spese, protezione sociale, confronto UE, crescita spesa)
- Ogni grafico con tooltip interattivo
- Fonti ufficiali citate (RGS, ISTAT, MEF)

**`/simulatore` — Simulatore "What if"**
- Pannello slider a sinistra, risultati in tempo reale a destra
- Slider: soglia patrimonio (€1M–€50M), aliquota patrimoniale (0.5%–5%), tassa capital gain (26%–50%)
- Output: gettito stimato annuo, lista concreta di cosa si potrebbe finanziare (posti TI, borse di studio, asili), confronto con raccolta attuale
- Dati base: distribuzione ricchezza per percentili (Banca d'Italia — Indagine Bilanci Famiglie), contribuenti per fascia (Agenzia delle Entrate)
- Bottone "Condividi questo scenario" → genera immagine scaricabile con parametri e risultato

**`/confronto` — Il Confronto Personale**
- Input: reddito annuo lordo
- Pannello "Tu": aliquota IRPEF effettiva (scaglioni 2025), € pagati, € che restano, breakdown dove vanno i soldi
- Pannello "Un miliardario": patrimonio medio top 10 (Forbes Italia), reddito stimato rendite, aliquota effettiva reale (~15-20%), quanto paga in proporzione
- Visualizzazione: barre affiancate, Tax Freedom Day personalizzato, "Per ogni €100..."
- Dati: scaglioni IRPEF 2025 (Agenzia Entrate), capital gain 26%, patrimoni Forbes Italia e Banca d'Italia

**`/mondo` — Confronto Internazionale**
- Confronto approfondito Italia vs 3-4 paesi UE (Norvegia, Spagna, Francia, Germania)
- Per ogni paese: tassazione patrimoni, aliquota effettiva top earners, indicatori servizi (sanità, istruzione)
- Grafici comparativi interattivi

**`/agisci` — Kit di Advocacy**

Tre blocchi:

1. **Grafici esportabili** — Ogni grafico ha bottone "Scarica" (PNG alta risoluzione). Include titolo, dati, fonte ufficiale, URL sito come watermark.

2. **Schede dati pronte** — PDF scaricabili di una pagina:
   - "La disuguaglianza fiscale in Italia — I numeri"
   - "Cosa fanno gli altri paesi"
   - "Quanto raccoglieremmo con una patrimoniale" (scenari predefiniti)

3. **Template per l'azione** — Testo precompilato per email/lettera al parlamentare. L'utente sceglie il tema (patrimoniale, evasione, confronto UE), il sistema genera il testo con dati reali. Bottone "Copia". Link contatti parlamentari (camera.it, senato.it).

## Dati e fonti

**Gestione dati: approccio misto**
- Dati bilancio, aliquote, patrimoni, confronti internazionali: **statici nel codice** (file TypeScript). Cambiano una volta l'anno.
- Simulatore e confronto personale: **calcolo dinamico client-side** basato sugli input utente.

**Fonti ufficiali:**
- Ragioneria Generale dello Stato (RGS) — Bilancio Semplificato
- ISTAT — Rapporto Protezione Sociale
- Banca d'Italia — Indagine sui Bilanci delle Famiglie
- Agenzia delle Entrate — Statistiche contribuenti per fascia
- Forbes Italia — Patrimoni top 10
- Eurostat — Confronti internazionali
- OECD — Government at a Glance

Ogni dato mostrato nel sito riporta la fonte con link.

## Stack tecnico

- Next.js 16 (App Router, TypeScript, Tailwind CSS)
- Recharts per grafici interattivi
- Tema scuro di default
- Dati statici in `src/data/`
- Calcoli simulatore/confronto: logica pura in `src/lib/`
- Nessun backend, nessun database
- Deploy statico su Vercel

## Lingua

- Interfaccia: italiano
- Codice e commenti: inglese

## Fuori scope (per ora)

- Autenticazione / account utente
- CMS per aggiornamento dati
- Backend / API
- Multilingua
- App mobile
