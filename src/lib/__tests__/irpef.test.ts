import { describe, it, expect } from "vitest";
import { calculateIrpef } from "../irpef";

describe("calculateIrpef", () => {
  it("returns zero for zero income", () => {
    const result = calculateIrpef(0);
    expect(result.taxPaid).toBe(0);
    expect(result.effectiveRate).toBe(0);
    expect(result.netIncome).toBe(0);
  });

  it("calculates correctly for income in first bracket (€25,000)", () => {
    const result = calculateIrpef(25_000);
    expect(result.grossTax).toBe(5_750);
    expect(result.taxPaid).toBe(3_795);
    expect(result.netIncome).toBe(25_000 - 3_795);
    expect(result.effectiveRate).toBeCloseTo(15.18, 1);
  });

  it("calculates correctly for income crossing second bracket (€40,000)", () => {
    const result = calculateIrpef(40_000);
    expect(result.grossTax).toBe(10_640);
    expect(result.taxPaid).toBe(8_685);
    expect(result.effectiveRate).toBeCloseTo(21.71, 1);
  });

  it("calculates correctly for high income (€100,000)", () => {
    const result = calculateIrpef(100_000);
    expect(result.grossTax).toBe(35_640);
    expect(result.taxPaid).toBe(33_685);
    expect(result.effectiveRate).toBeCloseTo(33.69, 1);
  });

  it("includes spending breakdown", () => {
    const result = calculateIrpef(30_000);
    expect(result.spendingBreakdown.length).toBeGreaterThan(0);
    const total = result.spendingBreakdown.reduce((s, b) => s + b.amount, 0);
    expect(total).toBeCloseTo(result.taxPaid, 0);
  });
});
