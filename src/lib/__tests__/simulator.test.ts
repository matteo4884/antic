import { describe, it, expect } from "vitest";
import { simulateWealthTax, simulateCapitalGainChange } from "../simulator";

describe("simulateWealthTax", () => {
  it("calculates revenue for €1M threshold at 1%", () => {
    const result = simulateWealthTax(1_000_000, 1);
    expect(result.estimatedRevenue).toBeCloseTo(55, 0);
  });

  it("calculates revenue for €50M threshold at 2%", () => {
    const result = simulateWealthTax(50_000_000, 2);
    expect(result.estimatedRevenue).toBeCloseTo(12, 0);
  });

  it("includes spending equivalences", () => {
    const result = simulateWealthTax(1_000_000, 1);
    expect(result.equivalences.length).toBeGreaterThan(0);
    expect(result.equivalences[0].count).toBeGreaterThan(0);
  });
});

describe("simulateCapitalGainChange", () => {
  it("calculates additional revenue from rate increase", () => {
    const result = simulateCapitalGainChange(0.35);
    expect(result.newRevenue).toBeGreaterThan(15.2);
    expect(result.additionalRevenue).toBeGreaterThan(0);
  });

  it("returns zero additional for current rate", () => {
    const result = simulateCapitalGainChange(0.26);
    expect(result.additionalRevenue).toBeCloseTo(0, 1);
  });
});
