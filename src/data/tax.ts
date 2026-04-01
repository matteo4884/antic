// IRPEF 2025 brackets — Agenzia delle Entrate
export const irpefBrackets = [
  { upTo: 28_000, rate: 0.23 },
  { upTo: 50_000, rate: 0.35 },
  { upTo: Infinity, rate: 0.43 },
];

// Standard employee deduction (simplified)
export const deduzioneBase = 1_955;

// Capital gain flat tax rate
export const capitalGainRate = 0.26;

// How state spending breaks down (% of total final spending)
export const spendingBreakdown = [
  { nome: "Debito pubblico", percentuale: 42.4 },
  { nome: "Autonomie territoriali", percentuale: 16.5 },
  { nome: "Sanità", percentuale: 14.9 },
  { nome: "Previdenza", percentuale: 13.4 },
  { nome: "Istruzione", percentuale: 6.2 },
  { nome: "Difesa", percentuale: 3.4 },
  { nome: "Altro", percentuale: 3.2 },
];

// Billionaire reference data (Forbes Italia 2025)
export const billionaireReference = {
  name: "Top 10 miliardari italiani",
  avgWealth: 14_700_000_000,
  estimatedAnnualReturn: 0.05,
  effectiveRate: 0.17,
  source: "Forbes Italia 2025, stime Oxfam Italia",
};
