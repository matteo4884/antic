// Bilancio dello Stato Italiano 2025
// Fonte: Ragioneria Generale dello Stato (RGS), MEF, ISTAT
// Valori in miliardi di euro

export const entrate = {
  totale: 728.8,
  dettaglio: [
    { nome: "IRPEF", valore: 243, colore: "#3b82f6" },
    { nome: "IVA", valore: 207, colore: "#6366f1" },
    { nome: "IRAP", valore: 64, colore: "#8b5cf6" },
    { nome: "Altre tributarie", valore: 126.2, colore: "#a78bfa" },
    { nome: "Extra-tributarie", valore: 88.3, colore: "#c4b5fd" },
    { nome: "Altre entrate", valore: 0.3, colore: "#ddd6fe" },
  ],
};

export const spese = {
  totale: 915.8,
  dettaglio: [
    { nome: "Rimborso debito pubblico", valore: 282, colore: "#ef4444" },
    { nome: "Autonomie territoriali", valore: 151, colore: "#f97316" },
    { nome: "Sanità (SSN)", valore: 136.5, colore: "#22c55e" },
    { nome: "Politiche previdenziali", valore: 123, colore: "#eab308" },
    { nome: "Interessi sul debito", valore: 106.3, colore: "#dc2626" },
    { nome: "Istruzione e Merito", valore: 57, colore: "#06b6d4" },
    { nome: "Difesa", valore: 31.3, colore: "#64748b" },
    { nome: "Altre spese", valore: 28.7, colore: "#94a3b8" },
  ],
};

export const bilancioSintesi = {
  entrateFinali: 728.8,
  speseFinali: 915.8,
  saldoNetto: -187.0,
  ricorsoMercato: -470.7,
};

export const protezioneSociale = {
  totale: 587.5,
  percentualePil: 26.8,
  percentualeSpesaCorrente: 59.3,
  dettaglio: [
    {
      nome: "Previdenza (pensioni)",
      valore: 400.7,
      percentuale: 68.2,
      colore: "#eab308",
      descrizione: "Di cui 336 mld per pensioni e rendite",
    },
    {
      nome: "Sanità",
      valore: 130.1,
      percentuale: 22.1,
      colore: "#22c55e",
      descrizione: "86,3 mld per servizi sanitari pubblici",
    },
    {
      nome: "Assistenza",
      valore: 57.1,
      percentuale: 9.7,
      colore: "#3b82f6",
      descrizione: "45,7 mld in prestazioni monetarie",
    },
  ],
};

export const spesaPerFunzione = [
  { nome: "Protezione sociale", percentualePil: 20.3, mediaUe: 19.6 },
  { nome: "Sanità", percentualePil: 6.3, mediaUe: 8.0 },
  { nome: "Istruzione", percentualePil: 3.9, mediaUe: 4.6 },
  { nome: "Difesa", percentualePil: 1.5, mediaUe: 1.7 },
  { nome: "Ordine pubblico", percentualePil: 1.8, mediaUe: 1.6 },
  { nome: "Interessi debito", percentualePil: 4.6, mediaUe: 1.8 },
];

export const crescitaSpesa2019_2025 = [
  { nome: "Politiche sociali", crescita: 35.2, colore: "#3b82f6" },
  { nome: "Previdenza", crescita: 25.3, colore: "#eab308" },
  { nome: "Sanità", crescita: 24.8, colore: "#22c55e" },
  { nome: "Istruzione", crescita: 21.1, colore: "#06b6d4" },
];

export const fonti = [
  {
    nome: "Ragioneria Generale dello Stato - Bilancio Semplificato 2025",
    url: "https://www.rgs.mef.gov.it/VERSIONE-I/attivita_istituzionali/formazione_e_gestione_del_bilancio/bilancio_di_previsione/bilancio_semplificato/",
  },
  {
    nome: "Pagella Politica - Dove vanno i soldi del bilancio 2025",
    url: "https://pagellapolitica.it/articoli/dove-vanno-i-soldi-del-bilancio-dello-stato-nel-2025",
  },
  {
    nome: "ISTAT - Rapporto Protezione Sociale 2025",
    url: "https://noi-italia.istat.it/pagina.php?id=3&categoria=18&action=show&L=0",
  },
  {
    nome: "Ufficio Parlamentare di Bilancio",
    url: "https://en.upbilancio.it/government-expenditures-and-revenues-in-italy-and-europe/",
  },
];
