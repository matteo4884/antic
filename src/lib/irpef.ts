import { irpefBrackets, deduzioneBase, spendingBreakdown } from "@/data/tax";

export interface IrpefResult {
  grossIncome: number;
  grossTax: number;
  deduction: number;
  taxPaid: number;
  netIncome: number;
  effectiveRate: number;
  spendingBreakdown: Array<{ nome: string; percentuale: number; amount: number }>;
}

export function calculateIrpef(grossIncome: number): IrpefResult {
  if (grossIncome <= 0) {
    return {
      grossIncome: 0,
      grossTax: 0,
      deduction: 0,
      taxPaid: 0,
      netIncome: 0,
      effectiveRate: 0,
      spendingBreakdown: [],
    };
  }

  let grossTax = 0;
  let previousLimit = 0;

  for (const bracket of irpefBrackets) {
    const taxableInBracket = Math.min(grossIncome, bracket.upTo) - previousLimit;
    if (taxableInBracket <= 0) break;
    grossTax += taxableInBracket * bracket.rate;
    previousLimit = bracket.upTo;
  }

  grossTax = Math.round(grossTax);
  const deduction = Math.min(deduzioneBase, grossTax);
  const taxPaid = grossTax - deduction;
  const netIncome = grossIncome - taxPaid;
  const effectiveRate = (taxPaid / grossIncome) * 100;

  const breakdown = spendingBreakdown.map((s) => ({
    nome: s.nome,
    percentuale: s.percentuale,
    amount: Math.round((taxPaid * s.percentuale) / 100),
  }));

  return {
    grossIncome,
    grossTax,
    deduction,
    taxPaid,
    netIncome,
    effectiveRate,
    spendingBreakdown: breakdown,
  };
}
