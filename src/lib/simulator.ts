import {
  wealthAboveThreshold,
  spendingEquivalences,
  currentCapitalGainRevenue,
  currentCapitalGainRate,
} from "@/data/wealth";

export interface WealthTaxResult {
  threshold: number;
  rate: number;
  wealthBase: number;
  estimatedRevenue: number;
  equivalences: Array<{ nome: string; count: number; unita: string }>;
}

export function simulateWealthTax(
  threshold: number,
  ratePercent: number
): WealthTaxResult {
  const thresholds = Object.keys(wealthAboveThreshold)
    .map(Number)
    .sort((a, b) => a - b);

  let wealthBase: number;
  const exactMatch = wealthAboveThreshold[threshold];
  if (exactMatch !== undefined) {
    wealthBase = exactMatch;
  } else {
    const lower = thresholds.filter((t) => t <= threshold).pop() ?? thresholds[0];
    const upper = thresholds.find((t) => t >= threshold) ?? thresholds[thresholds.length - 1];
    if (lower === upper) {
      wealthBase = wealthAboveThreshold[lower];
    } else {
      const ratio = (threshold - lower) / (upper - lower);
      wealthBase =
        wealthAboveThreshold[lower] +
        ratio * (wealthAboveThreshold[upper] - wealthAboveThreshold[lower]);
    }
  }

  const rate = ratePercent / 100;
  const estimatedRevenue = wealthBase * rate;

  const equivalences = spendingEquivalences.map((s) => ({
    nome: s.nome,
    count: Math.floor(estimatedRevenue / s.costoUnitario),
    unita: s.unita,
  }));

  return { threshold, rate, wealthBase, estimatedRevenue, equivalences };
}

export interface CapitalGainResult {
  currentRate: number;
  newRate: number;
  currentRevenue: number;
  newRevenue: number;
  additionalRevenue: number;
}

export function simulateCapitalGainChange(newRate: number): CapitalGainResult {
  const newRevenue =
    currentCapitalGainRevenue * (newRate / currentCapitalGainRate);
  return {
    currentRate: currentCapitalGainRate,
    newRate,
    currentRevenue: currentCapitalGainRevenue,
    newRevenue,
    additionalRevenue: newRevenue - currentCapitalGainRevenue,
  };
}
