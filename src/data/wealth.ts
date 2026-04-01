// Distribuzione della ricchezza in Italia
// Fonte: Banca d'Italia — Indagine sui Bilanci delle Famiglie 2024

// Total Italian household net wealth: ~€11,000 billion (11 trillion)
export const totalHouseholdWealth = 11_000; // billions

// Wealth above threshold (estimated, in billions)
export const wealthAboveThreshold: Record<number, number> = {
  1_000_000: 5_500,
  5_000_000: 2_800,
  10_000_000: 1_800,
  50_000_000: 600,
};

// What public spending items cost (annual, in billions €)
export const spendingEquivalences = [
  { nome: "Posto in terapia intensiva (annuo)", costoUnitario: 0.0005, unita: "posti" },
  { nome: "Borsa di studio universitaria", costoUnitario: 0.000005, unita: "borse" },
  { nome: "Asilo nido (posto annuo)", costoUnitario: 0.000008, unita: "posti" },
  { nome: "Stipendio insegnante (annuo)", costoUnitario: 0.00003, unita: "stipendi" },
  { nome: "Stipendio infermiere (annuo)", costoUnitario: 0.000028, unita: "stipendi" },
];

// Current revenue from capital gain tax (2025)
export const currentCapitalGainRevenue = 15.2; // billions €

// Current capital gain rate
export const currentCapitalGainRate = 0.26;
