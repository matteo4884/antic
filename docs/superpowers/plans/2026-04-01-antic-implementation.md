# Antic Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive scrollytelling website that exposes Italian fiscal inequality through official data, personal tax comparison, a "what-if" tax simulator, and advocacy tools.

**Architecture:** Hybrid scrollytelling homepage (5 narrative acts) + 5 deep-dive pages (`/bilancio`, `/confronto`, `/simulatore`, `/mondo`, `/agisci`). All data static in TypeScript files, calculation logic in pure functions under `src/lib/`, interactive charts with Recharts. No backend.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, Recharts

---

## File Structure

### Data files (`src/data/`)
- `budget.ts` — **exists** — state budget breakdown (entrate, spese, protezione sociale, confronto UE)
- `tax.ts` — **create** — IRPEF 2025 brackets, capital gain rate, deductions, budget spending percentages
- `wealth.ts` — **create** — wealth distribution by percentile (Banca d'Italia), top 10 Italian billionaires (Forbes), spending equivalences (cost of hospital beds, scholarships, etc.)
- `international.ts` — **create** — country comparison data (Norway, Spain, France, Germany): wealth tax rates, effective top rates, health/education indicators
- `advocacy.ts` — **create** — letter templates for parliamentarians, fact sheet data

### Library files (`src/lib/`)
- `irpef.ts` — **create** — pure functions: `calculateIrpef(gross)` returns effective rate, tax paid, net income, spending breakdown
- `simulator.ts` — **create** — pure functions: `simulateWealthTax(threshold, rate, capitalGainRate)` returns estimated revenue and what it could fund
- `format.ts` — **create** — `formatEuro()`, `formatPercent()`, `formatCompact()`

### Shared components (`src/components/ui/`)
- `Navbar.tsx` — **create** — site navigation with links to all pages
- `StatCard.tsx` — **create** — extracted from current `page.tsx`
- `Section.tsx` — **create** — extracted from current `page.tsx`
- `Footer.tsx` — **create** — sources footer reusable across pages

### Homepage components (`src/components/home/`)
- `Act1Income.tsx` — **create** — income input + instant tax calculation
- `Act2Comparison.tsx` — **create** — your rate vs billionaire rate bars
- `Act3Budget.tsx` — **create** — budget blocks proportional visualization
- `Act4International.tsx` — **create** — country cards
- `Act5Action.tsx` — **create** — CTA cards

### Page-specific components
- `src/components/confronto/TaxPanel.tsx` — **create** — "Tu" / "Miliardario" panel
- `src/components/confronto/ComparisonBars.tsx` — **create** — side-by-side bar visualization
- `src/components/simulatore/SliderPanel.tsx` — **create** — slider controls
- `src/components/simulatore/ResultsPanel.tsx` — **create** — real-time simulation output

### Pages (`src/app/`)
- `page.tsx` — **rewrite** — scrollytelling homepage
- `bilancio/page.tsx` — **create** — move current charts here
- `confronto/page.tsx` — **create** — personal comparison
- `simulatore/page.tsx` — **create** — what-if simulator
- `mondo/page.tsx` — **create** — international comparison
- `agisci/page.tsx` — **create** — advocacy toolkit

### Tests (`src/lib/__tests__/`)
- `irpef.test.ts` — **create** — IRPEF calculation tests
- `simulator.test.ts` — **create** — wealth tax simulation tests

---

## Task 1: Shared UI components + Navigation

Extract reusable components and add site-wide navigation.

**Files:**
- Create: `src/components/ui/Navbar.tsx`
- Create: `src/components/ui/StatCard.tsx`
- Create: `src/components/ui/Section.tsx`
- Create: `src/components/ui/Footer.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/ui/StatCard.tsx`**

```tsx
export default function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent ?? "text-zinc-100"}`}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-zinc-500">{sub}</p>}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Section.tsx`**

```tsx
export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/ui/Footer.tsx`**

```tsx
import { fonti } from "@/data/budget";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 pt-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Fonti ufficiali
      </h3>
      <ul className="mt-3 space-y-1">
        {fonti.map((f) => (
          <li key={f.nome}>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 underline decoration-zinc-700 hover:text-zinc-200"
            >
              {f.nome}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-zinc-600">
        I dati sono tratti da fonti pubbliche ufficiali. Valori in miliardi di
        euro, anno di riferimento 2025 (previsione di competenza).
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Create `src/components/ui/Navbar.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/bilancio", label: "Bilancio" },
  { href: "/confronto", label: "Confronto" },
  { href: "/simulatore", label: "Simulatore" },
  { href: "/mondo", label: "Nel mondo" },
  { href: "/agisci", label: "Agisci" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-3 md:px-8">
        <Link
          href="/"
          className="mr-4 text-lg font-bold tracking-tight text-zinc-100"
        >
          Antic
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
              pathname === l.href
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: Add Navbar to layout**

Modify `src/app/layout.tsx`: import `Navbar` and place it inside `<body>` before `{children}`.

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antic — Dove vanno i soldi dell'Italia",
  description:
    "Dati ufficiali sulla disuguaglianza fiscale in Italia. Scopri quanto paghi, confronta, simula riforme, agisci.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Update `src/app/page.tsx` to use extracted components**

Replace inline `StatCard` and `Section` definitions with imports from `@/components/ui/StatCard` and `@/components/ui/Section`. Replace inline footer with `<Footer />`.

- [ ] **Step 7: Verify the page loads correctly**

Run: visit `http://localhost:3000` — navbar should show with all links, page should render as before.

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/ src/app/layout.tsx src/app/page.tsx
git commit -m "feat: extract shared UI components and add site navigation"
```

---

## Task 2: Format utilities + IRPEF calculation library (TDD)

Build the core tax calculation logic that powers both the homepage and `/confronto`.

**Files:**
- Create: `src/lib/format.ts`
- Create: `src/data/tax.ts`
- Create: `src/lib/irpef.ts`
- Create: `src/lib/__tests__/irpef.test.ts`

- [ ] **Step 1: Install vitest**

```bash
npm install -D vitest
```

Add to `package.json` scripts: `"test": "vitest run", "test:watch": "vitest"`

- [ ] **Step 2: Create `src/lib/format.ts`**

```ts
export function formatEuro(n: number): string {
  return n.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `€${(n / 1_000_000_000).toFixed(1)} mld`;
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)} mln`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(1)}k`;
  return formatEuro(n);
}
```

- [ ] **Step 3: Create `src/data/tax.ts`**

```ts
// IRPEF 2025 brackets — Agenzia delle Entrate
// https://www.agenziaentrate.gov.it
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
// Used to show "where your taxes go"
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
  avgWealth: 14_700_000_000, // €14.7 mld avg
  estimatedAnnualReturn: 0.05, // 5% annual return on wealth
  effectiveRate: 0.17, // ~17% effective rate via capital gain + optimization
  source: "Forbes Italia 2025, stime Oxfam Italia",
};
```

- [ ] **Step 4: Write failing tests for IRPEF calculation**

Create `src/lib/__tests__/irpef.test.ts`:

```ts
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
    // €25,000 * 23% = €5,750 gross tax
    // minus €1,955 deduction = €3,795
    expect(result.grossTax).toBe(5_750);
    expect(result.taxPaid).toBe(3_795);
    expect(result.netIncome).toBe(25_000 - 3_795);
    expect(result.effectiveRate).toBeCloseTo(15.18, 1);
  });

  it("calculates correctly for income crossing second bracket (€40,000)", () => {
    const result = calculateIrpef(40_000);
    // First €28,000 * 23% = €6,440
    // Next €12,000 * 35% = €4,200
    // Gross = €10,640 - €1,955 deduction = €8,685
    expect(result.grossTax).toBe(10_640);
    expect(result.taxPaid).toBe(8_685);
    expect(result.effectiveRate).toBeCloseTo(21.71, 1);
  });

  it("calculates correctly for high income (€100,000)", () => {
    const result = calculateIrpef(100_000);
    // First €28,000 * 23% = €6,440
    // Next €22,000 * 35% = €7,700
    // Next €50,000 * 43% = €21,500
    // Gross = €35,640 - €1,955 = €33,685
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
```

- [ ] **Step 5: Run tests to verify they fail**

```bash
npx vitest run src/lib/__tests__/irpef.test.ts
```

Expected: FAIL — module `../irpef` not found.

- [ ] **Step 6: Implement `src/lib/irpef.ts`**

```ts
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
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npx vitest run src/lib/__tests__/irpef.test.ts
```

Expected: all 5 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/ src/data/tax.ts package.json
git commit -m "feat: add IRPEF calculation library with tests and tax data"
```

---

## Task 3: Wealth data + Simulator calculation library (TDD)

**Files:**
- Create: `src/data/wealth.ts`
- Create: `src/lib/simulator.ts`
- Create: `src/lib/__tests__/simulator.test.ts`

- [ ] **Step 1: Create `src/data/wealth.ts`**

```ts
// Distribuzione della ricchezza in Italia
// Fonte: Banca d'Italia — Indagine sui Bilanci delle Famiglie 2024
// https://www.bancaditalia.it/statistiche/tematiche/indagini-famiglie-imprese/bilanci-famiglie/

// Total Italian household net wealth: ~€11,000 billion (11 trillion)
export const totalHouseholdWealth = 11_000; // billions

// Wealth above threshold (estimated, in billions)
// These are approximations from Banca d'Italia data and Oxfam reports
export const wealthAboveThreshold: Record<number, number> = {
  1_000_000: 5_500, // wealth held by households with >€1M: ~€5,500 bln
  5_000_000: 2_800, // wealth held by households with >€5M: ~€2,800 bln
  10_000_000: 1_800, // wealth held by households with >€10M: ~€1,800 bln
  50_000_000: 600, // wealth held by households with >€50M: ~€600 bln
};

// What public spending items cost (annual, in billions €)
// Sources: RGS Bilancio Semplificato 2025, ISTAT
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
```

- [ ] **Step 2: Write failing tests for simulator**

Create `src/lib/__tests__/simulator.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { simulateWealthTax, simulateCapitalGainChange } from "../simulator";

describe("simulateWealthTax", () => {
  it("calculates revenue for €1M threshold at 1%", () => {
    const result = simulateWealthTax(1_000_000, 1);
    // €5,500 bln * 1% = €55 bln
    expect(result.estimatedRevenue).toBeCloseTo(55, 0);
  });

  it("calculates revenue for €50M threshold at 2%", () => {
    const result = simulateWealthTax(50_000_000, 2);
    // €600 bln * 2% = €12 bln
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
    // Current: €15.2 bln at 26%. At 35%: 15.2 * (35/26) = €20.46 bln
    // Additional: €5.26 bln
    expect(result.newRevenue).toBeGreaterThan(15.2);
    expect(result.additionalRevenue).toBeGreaterThan(0);
  });

  it("returns zero additional for current rate", () => {
    const result = simulateCapitalGainChange(0.26);
    expect(result.additionalRevenue).toBeCloseTo(0, 1);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
npx vitest run src/lib/__tests__/simulator.test.ts
```

Expected: FAIL — module not found.

- [ ] **Step 4: Implement `src/lib/simulator.ts`**

```ts
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
  // Find the closest threshold in our data
  const thresholds = Object.keys(wealthAboveThreshold)
    .map(Number)
    .sort((a, b) => a - b);

  let wealthBase: number;
  const exactMatch = wealthAboveThreshold[threshold];
  if (exactMatch !== undefined) {
    wealthBase = exactMatch;
  } else {
    // Interpolate between nearest thresholds
    const lower = thresholds.filter((t) => t <= threshold).pop() ?? thresholds[0];
    const upper = thresholds.find((t) => t >= threshold) ?? thresholds[thresholds.length - 1];
    if (lower === upper) {
      wealthBase = wealthAboveThreshold[lower];
    } else {
      const ratio =
        (threshold - lower) / (upper - lower);
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
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx vitest run src/lib/__tests__/simulator.test.ts
```

Expected: all 5 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data/wealth.ts src/lib/simulator.ts src/lib/__tests__/simulator.test.ts
git commit -m "feat: add wealth tax simulator library with tests"
```

---

## Task 4: International comparison data

**Files:**
- Create: `src/data/international.ts`

- [ ] **Step 1: Create `src/data/international.ts`**

```ts
// Country comparison data
// Sources: OECD Government at a Glance 2025, Eurostat, national tax authorities

export interface CountryData {
  nome: string;
  codice: string;
  wealthTax: {
    hasIt: boolean;
    description: string;
    rate: string;
  };
  effectiveTopRate: number; // effective rate for top earners (%)
  healthSpendingPctGdp: number;
  educationSpendingPctGdp: number;
  healthIndex: number; // 0-100 quality index (Bloomberg/WHO)
  educationIndex: number; // PISA average score normalized to 0-100
  giniIndex: number; // income inequality (lower = more equal)
}

export const countries: CountryData[] = [
  {
    nome: "Italia",
    codice: "IT",
    wealthTax: {
      hasIt: false,
      description: "Nessuna imposta patrimoniale generale. IVIE e IVAFE solo su patrimoni esteri.",
      rate: "0%",
    },
    effectiveTopRate: 17,
    healthSpendingPctGdp: 6.3,
    educationSpendingPctGdp: 3.9,
    healthIndex: 67,
    educationIndex: 56,
    giniIndex: 32.8,
  },
  {
    nome: "Norvegia",
    codice: "NO",
    wealthTax: {
      hasIt: true,
      description: "Imposta patrimoniale progressiva su patrimoni netti sopra ~€150.000.",
      rate: "0.95% – 1.1%",
    },
    effectiveTopRate: 47,
    healthSpendingPctGdp: 11.4,
    educationSpendingPctGdp: 5.9,
    healthIndex: 83,
    educationIndex: 75,
    giniIndex: 25.3,
  },
  {
    nome: "Spagna",
    codice: "ES",
    wealthTax: {
      hasIt: true,
      description: "Imposta di Solidarietà sui Grandi Patrimoni: 1.7% - 3.5% sopra €3M.",
      rate: "1.7% – 3.5%",
    },
    effectiveTopRate: 40,
    healthSpendingPctGdp: 7.3,
    educationSpendingPctGdp: 4.3,
    healthIndex: 72,
    educationIndex: 60,
    giniIndex: 32.0,
  },
  {
    nome: "Francia",
    codice: "FR",
    wealthTax: {
      hasIt: true,
      description: "IFI (Impôt sur la Fortune Immobilière): tassa sui patrimoni immobiliari sopra €1.3M.",
      rate: "0.5% – 1.5%",
    },
    effectiveTopRate: 45,
    healthSpendingPctGdp: 12.1,
    educationSpendingPctGdp: 5.5,
    healthIndex: 79,
    educationIndex: 63,
    giniIndex: 30.5,
  },
  {
    nome: "Germania",
    codice: "DE",
    wealthTax: {
      hasIt: false,
      description: "Sospesa dal 1997, ma il dibattito per reintrodurla è attivo.",
      rate: "0% (sospesa)",
    },
    effectiveTopRate: 45,
    healthSpendingPctGdp: 12.7,
    educationSpendingPctGdp: 4.7,
    healthIndex: 78,
    educationIndex: 66,
    giniIndex: 29.7,
  },
];

export const italyHighlight = {
  interestOnDebtPctGdp: 4.6,
  avgEuInterestPctGdp: 1.8,
  publicDebtPctGdp: 137,
  avgEuDebtPctGdp: 82,
};
```

- [ ] **Step 2: Commit**

```bash
git add src/data/international.ts
git commit -m "feat: add international comparison data (NO, ES, FR, DE)"
```

---

## Task 5: `/bilancio` page — move existing charts

Move the current homepage charts to a dedicated `/bilancio` page.

**Files:**
- Create: `src/app/bilancio/page.tsx`

- [ ] **Step 1: Create `src/app/bilancio/page.tsx`**

Move the current chart content from `src/app/page.tsx` into the new page. Import `StatCard`, `Section`, `Footer` from `@/components/ui/`.

```tsx
import { bilancioSintesi } from "@/data/budget";
import StatCard from "@/components/ui/StatCard";
import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";
import SpesePieChart from "@/components/charts/SpesePieChart";
import EntrateBarChart from "@/components/charts/EntrateBarChart";
import ConfrontoUeChart from "@/components/charts/ConfrontoUeChart";
import ProtezioneSocialeChart from "@/components/charts/ProtezioneSocialeChart";
import CrescitaSpesaChart from "@/components/charts/CrescitaSpesaChart";

export default function BilancioPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Il Bilancio dello Stato
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Bilancio dello Stato 2025 — dati ufficiali della Ragioneria Generale
          dello Stato, ISTAT e MEF, visualizzati per capire davvero come
          vengono usati i nostri soldi.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Entrate finali"
          value={`€${bilancioSintesi.entrateFinali} mld`}
          sub="Quanto lo Stato incassa"
          accent="text-blue-400"
        />
        <StatCard
          label="Spese finali"
          value={`€${bilancioSintesi.speseFinali} mld`}
          sub="Quanto lo Stato spende"
          accent="text-amber-400"
        />
        <StatCard
          label="Saldo netto"
          value={`€${bilancioSintesi.saldoNetto} mld`}
          sub="Deficit da finanziare"
          accent="text-red-400"
        />
        <StatCard
          label="Ricorso al mercato"
          value={`€${bilancioSintesi.ricorsoMercato} mld`}
          sub="Nuovo debito emesso"
          accent="text-red-500"
        />
      </div>

      <Section
        title="Come spendiamo"
        description="La voce più grande? Il rimborso del debito pubblico. Più di quanto spendiamo per sanità o istruzione."
      >
        <SpesePieChart />
      </Section>

      <Section
        title="Da dove arrivano i soldi"
        description="Più della metà delle entrate viene dalle tasse sul reddito (IRPEF) e sui consumi (IVA) — pagate da lavoratori dipendenti e consumatori."
      >
        <EntrateBarChart />
      </Section>

      <Section
        title="Protezione sociale"
        description="Il welfare italiano assorbe quasi il 60% della spesa corrente. Ma la stragrande maggioranza va in pensioni."
      >
        <ProtezioneSocialeChart />
      </Section>

      <Section
        title="Italia vs Media UE"
        description="L'Italia spende molto più della media europea per interessi sul debito, ma meno per sanità e istruzione."
      >
        <ConfrontoUeChart />
      </Section>

      <Section
        title="Come è cambiata la spesa (2019–2025)"
        description="Tutte le voci di spesa sono cresciute, ma non allo stesso ritmo."
      >
        <CrescitaSpesaChart />
      </Section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Verify `/bilancio` loads correctly**

Visit `http://localhost:3000/bilancio` — all charts should render.

- [ ] **Step 3: Commit**

```bash
git add src/app/bilancio/
git commit -m "feat: add /bilancio page with all budget charts"
```

---

## Task 6: Homepage scrollytelling — Acts 1 & 2

The income input and comparison with billionaires.

**Files:**
- Create: `src/components/home/Act1Income.tsx`
- Create: `src/components/home/Act2Comparison.tsx`
- Rewrite: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/home/Act1Income.tsx`**

```tsx
"use client";

import { useState } from "react";
import { calculateIrpef } from "@/lib/irpef";
import { formatEuro, formatPercent } from "@/lib/format";

export default function Act1Income({
  onIncomeSet,
}: {
  onIncomeSet: (income: number) => void;
}) {
  const [input, setInput] = useState("");
  const income = parseInt(input.replace(/\D/g, ""), 10) || 0;
  const result = income > 0 ? calculateIrpef(income) : null;

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-4xl font-extrabold tracking-tight text-zinc-50 md:text-6xl">
        Quanto dai allo Stato?
      </h2>
      <p className="mt-4 text-center text-lg text-zinc-400">
        Inserisci il tuo reddito annuo lordo
      </p>
      <div className="mt-8 w-full max-w-sm">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Es. 30000"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            const val = parseInt(e.target.value.replace(/\D/g, ""), 10) || 0;
            if (val > 0) onIncomeSet(val);
          }}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-center text-3xl font-bold text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      {result && (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="text-4xl font-bold text-red-400">
              {formatPercent(result.effectiveRate)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Aliquota effettiva</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-amber-400">
              {formatEuro(result.taxPaid)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Tasse pagate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-emerald-400">
              {formatEuro(result.netIncome)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Netto in tasca</p>
          </div>
        </div>
      )}
      {result && (
        <p className="mt-12 animate-bounce text-sm text-zinc-500">
          ↓ Ora vediamo chi sta dall&apos;altra parte
        </p>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/home/Act2Comparison.tsx`**

```tsx
"use client";

import { calculateIrpef } from "@/lib/irpef";
import { billionaireReference } from "@/data/tax";
import { formatPercent } from "@/lib/format";
import Link from "next/link";

export default function Act2Comparison({ income }: { income: number }) {
  const userResult = calculateIrpef(income);
  const billionaireRate = billionaireReference.effectiveRate * 100;

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Quanto paga chi ha di più?
      </h2>

      <div className="mt-12 flex w-full max-w-2xl flex-col gap-8 md:flex-row md:gap-12">
        {/* User column */}
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Tu
          </p>
          <p className="mt-2 text-5xl font-bold text-red-400">
            {formatPercent(userResult.effectiveRate)}
          </p>
          <p className="mt-2 text-sm text-zinc-400">aliquota effettiva</p>
          <div className="mx-auto mt-4 h-4 w-full max-w-xs overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-red-500 transition-all duration-700"
              style={{ width: `${Math.min(userResult.effectiveRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="hidden items-center md:flex">
          <span className="text-2xl font-bold text-zinc-600">vs</span>
        </div>
        <p className="text-center text-2xl font-bold text-zinc-600 md:hidden">
          vs
        </p>

        {/* Billionaire column */}
        <div className="flex-1 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Top 0.1%
          </p>
          <p className="mt-2 text-5xl font-bold text-amber-400">
            {formatPercent(billionaireRate)}
          </p>
          <p className="mt-2 text-sm text-zinc-400">aliquota effettiva</p>
          <div className="mx-auto mt-4 h-4 w-full max-w-xs overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-amber-500 transition-all duration-700"
              style={{ width: `${Math.min(billionaireRate, 100)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-lg text-center text-lg text-zinc-300">
        Tu dai il{" "}
        <span className="font-bold text-red-400">
          {formatPercent(userResult.effectiveRate)}
        </span>{" "}
        del tuo reddito. Chi possiede miliardi dà il{" "}
        <span className="font-bold text-amber-400">
          {formatPercent(billionaireRate)}
        </span>
        .
      </p>

      <Link
        href="/confronto"
        className="mt-6 text-sm text-blue-400 hover:text-blue-300"
      >
        Approfondisci →
      </Link>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/app/page.tsx` — first two acts**

```tsx
"use client";

import { useState } from "react";
import Act1Income from "@/components/home/Act1Income";
import Act2Comparison from "@/components/home/Act2Comparison";

export default function Home() {
  const [income, setIncome] = useState(0);

  return (
    <main>
      <Act1Income onIncomeSet={setIncome} />
      {income > 0 && <Act2Comparison income={income} />}
    </main>
  );
}
```

- [ ] **Step 4: Verify homepage loads, enter a salary, see comparison**

Visit `http://localhost:3000` — enter 30000, verify tax calculation shows, scroll down to see comparison with billionaire.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: homepage scrollytelling acts 1-2 (income input + billionaire comparison)"
```

---

## Task 7: Homepage scrollytelling — Acts 3, 4, 5

**Files:**
- Create: `src/components/home/Act3Budget.tsx`
- Create: `src/components/home/Act4International.tsx`
- Create: `src/components/home/Act5Action.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create `src/components/home/Act3Budget.tsx`**

```tsx
import { spese } from "@/data/budget";
import Link from "next/link";

export default function Act3Budget() {
  const maxValue = Math.max(...spese.dettaglio.map((s) => s.valore));

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Dove finiscono i tuoi soldi
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-zinc-400">
        €915 miliardi di spesa pubblica. Ecco come sono divisi.
      </p>

      <div className="mt-10 w-full max-w-2xl space-y-3">
        {spese.dettaglio.map((s) => (
          <div key={s.nome} className="flex items-center gap-4">
            <span className="w-48 text-right text-sm text-zinc-400">
              {s.nome}
            </span>
            <div className="flex-1">
              <div className="h-8 overflow-hidden rounded bg-zinc-800">
                <div
                  className="flex h-full items-center rounded px-3 text-xs font-semibold text-white transition-all duration-700"
                  style={{
                    width: `${(s.valore / maxValue) * 100}%`,
                    backgroundColor: s.colore,
                  }}
                >
                  €{s.valore} mld
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-sm text-zinc-400">
        <span className="font-bold text-red-400">€388 miliardi</span> vanno a
        debito e interessi — più di sanità e istruzione messe insieme.
      </p>

      <Link
        href="/bilancio"
        className="mt-6 text-sm text-blue-400 hover:text-blue-300"
      >
        Esplora il bilancio completo →
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/home/Act4International.tsx`**

```tsx
import { countries } from "@/data/international";
import Link from "next/link";

export default function Act4International() {
  const others = countries.filter((c) => c.codice !== "IT");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Come fanno gli altri
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-zinc-400">
        Non è utopia. Altri paesi europei tassano i grandi patrimoni e
        investono di più in servizi.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {others.map((c) => (
          <div
            key={c.codice}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <h3 className="text-lg font-bold text-zinc-100">{c.nome}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Tassa patrimoni</span>
                <span
                  className={
                    c.wealthTax.hasIt ? "text-emerald-400" : "text-zinc-500"
                  }
                >
                  {c.wealthTax.rate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Aliquota top effettiva</span>
                <span className="text-zinc-200">{c.effectiveTopRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Sanità (% PIL)</span>
                <span className="text-zinc-200">
                  {c.healthSpendingPctGdp}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Istruzione (% PIL)</span>
                <span className="text-zinc-200">
                  {c.educationSpendingPctGdp}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/mondo"
        className="mt-8 text-sm text-blue-400 hover:text-blue-300"
      >
        Vedi il confronto completo →
      </Link>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/components/home/Act5Action.tsx`**

```tsx
import Link from "next/link";

const actions = [
  {
    title: "Simula una riforma",
    description:
      "Muovi gli slider e scopri quanto si raccoglierebbe con una patrimoniale o una riforma del capital gain.",
    href: "/simulatore",
    accent: "text-blue-400",
    border: "border-blue-500/30",
  },
  {
    title: "Scarica i dati",
    description:
      "Grafici esportabili, schede dati pronte, tutto con fonti ufficiali. Usali dove vuoi.",
    href: "/agisci",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  {
    title: "Scrivi al tuo parlamentare",
    description:
      "Template pronti con i dati reali. Scegli il tema, copia il testo, invialo.",
    href: "/agisci#template",
    accent: "text-amber-400",
    border: "border-amber-500/30",
  },
];

export default function Act5Action() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Cosa puoi fare tu
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-zinc-300">
        I numeri li hai visti. Ora hai una scelta.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`rounded-xl border ${a.border} bg-zinc-900/60 p-6 transition-colors hover:bg-zinc-800/60`}
          >
            <h3 className={`text-lg font-bold ${a.accent}`}>{a.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{a.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-16 text-sm text-zinc-600">
        Dati ufficiali da RGS, ISTAT, Banca d&apos;Italia, OECD.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Update `src/app/page.tsx` with all 5 acts**

```tsx
"use client";

import { useState } from "react";
import Act1Income from "@/components/home/Act1Income";
import Act2Comparison from "@/components/home/Act2Comparison";
import Act3Budget from "@/components/home/Act3Budget";
import Act4International from "@/components/home/Act4International";
import Act5Action from "@/components/home/Act5Action";

export default function Home() {
  const [income, setIncome] = useState(0);

  return (
    <main>
      <Act1Income onIncomeSet={setIncome} />
      {income > 0 && <Act2Comparison income={income} />}
      <Act3Budget />
      <Act4International />
      <Act5Action />
    </main>
  );
}
```

- [ ] **Step 5: Verify all acts render in sequence**

Visit `http://localhost:3000` — scroll through all 5 acts, check links work.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/ src/app/page.tsx
git commit -m "feat: complete homepage scrollytelling (acts 3-5: budget, international, CTA)"
```

---

## Task 8: `/confronto` page — Personal comparison

**Files:**
- Create: `src/components/confronto/TaxPanel.tsx`
- Create: `src/components/confronto/ComparisonBars.tsx`
- Create: `src/app/confronto/page.tsx`

- [ ] **Step 1: Create `src/components/confronto/TaxPanel.tsx`**

```tsx
import { formatEuro, formatPercent } from "@/lib/format";
import type { IrpefResult } from "@/lib/irpef";

export function UserPanel({ result }: { result: IrpefResult }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Tu
      </h3>
      <p className="mt-3 text-4xl font-bold text-red-400">
        {formatPercent(result.effectiveRate)}
      </p>
      <p className="text-sm text-zinc-500">aliquota effettiva</p>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Reddito lordo</span>
          <span className="text-zinc-200">{formatEuro(result.grossIncome)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">IRPEF lorda</span>
          <span className="text-zinc-200">{formatEuro(result.grossTax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Detrazioni</span>
          <span className="text-emerald-400">-{formatEuro(result.deduction)}</span>
        </div>
        <div className="flex justify-between border-t border-zinc-800 pt-2 font-semibold">
          <span className="text-zinc-300">Tasse pagate</span>
          <span className="text-amber-400">{formatEuro(result.taxPaid)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-zinc-300">Netto in tasca</span>
          <span className="text-emerald-400">{formatEuro(result.netIncome)}</span>
        </div>
      </div>

      {result.spendingBreakdown.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase text-zinc-500">
            Dove vanno i tuoi soldi
          </p>
          <div className="space-y-1.5">
            {result.spendingBreakdown.map((s) => (
              <div key={s.nome} className="flex justify-between text-xs">
                <span className="text-zinc-500">{s.nome}</span>
                <span className="text-zinc-300">{formatEuro(s.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BillionairePanel() {
  // Inline data from tax.ts billionaireReference to keep it self-contained
  const wealth = 14_700_000_000;
  const annualReturn = 0.05;
  const effectiveRate = 0.17;
  const estimatedIncome = wealth * annualReturn;
  const taxPaid = estimatedIncome * effectiveRate;
  const taxOnWealth = taxPaid / wealth;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Un miliardario (media top 10)
      </h3>
      <p className="mt-3 text-4xl font-bold text-amber-400">
        {formatPercent(effectiveRate * 100)}
      </p>
      <p className="text-sm text-zinc-500">aliquota effettiva stimata</p>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-500">Patrimonio medio</span>
          <span className="text-zinc-200">€14,7 mld</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Rendita stimata (5%/anno)</span>
          <span className="text-zinc-200">{formatEuro(estimatedIncome)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">Capital gain (26%) + ottimizzazione</span>
          <span className="text-zinc-200">~17% effettivo</span>
        </div>
        <div className="flex justify-between border-t border-zinc-800 pt-2 font-semibold">
          <span className="text-zinc-300">Tasse stimate</span>
          <span className="text-amber-400">{formatEuro(taxPaid)}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span className="text-zinc-300">% sul patrimonio</span>
          <span className="text-zinc-400">
            {formatPercent(taxOnWealth * 100, 2)}
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs text-zinc-600">
        Fonte: Forbes Italia 2025, stime Oxfam Italia. L&apos;aliquota effettiva
        è inferiore al 26% nominale per via di holding, ottimizzazione fiscale
        e cedolare secca.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/confronto/ComparisonBars.tsx`**

```tsx
"use client";

import { formatPercent } from "@/lib/format";

export default function ComparisonBars({
  userRate,
  billionaireRate,
}: {
  userRate: number;
  billionaireRate: number;
}) {
  const userDays = Math.round((userRate / 100) * 365);
  const billionaireDays = Math.round((billionaireRate / 100) * 365);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Il confronto
      </h3>

      <div className="mt-6 space-y-8">
        {/* Per ogni €100 */}
        <div>
          <p className="mb-3 text-sm text-zinc-400">Per ogni €100 guadagnati:</p>
          <div className="flex items-center gap-4">
            <span className="w-12 text-right text-xs text-zinc-500">Tu</span>
            <div className="flex-1">
              <div className="h-6 overflow-hidden rounded bg-zinc-800">
                <div
                  className="flex h-full items-center rounded px-2 text-xs font-bold text-white"
                  style={{ width: `${userRate}%`, backgroundColor: "#ef4444" }}
                >
                  €{userRate.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <span className="w-12 text-right text-xs text-zinc-500">Top 0.1%</span>
            <div className="flex-1">
              <div className="h-6 overflow-hidden rounded bg-zinc-800">
                <div
                  className="flex h-full items-center rounded px-2 text-xs font-bold text-white"
                  style={{
                    width: `${billionaireRate}%`,
                    backgroundColor: "#eab308",
                  }}
                >
                  €{billionaireRate.toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Freedom Day */}
        <div>
          <p className="mb-2 text-sm text-zinc-400">
            Giorni lavorativi dedicati solo alle tasse:
          </p>
          <p className="text-lg text-zinc-200">
            Tu lavori{" "}
            <span className="font-bold text-red-400">{userDays} giorni</span>{" "}
            l&apos;anno solo per pagare le tasse.
          </p>
          <p className="text-lg text-zinc-200">
            Un miliardario ne &quot;lavora&quot;{" "}
            <span className="font-bold text-amber-400">
              {billionaireDays} giorni
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/confronto/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { calculateIrpef } from "@/lib/irpef";
import { billionaireReference } from "@/data/tax";
import { UserPanel, BillionairePanel } from "@/components/confronto/TaxPanel";
import ComparisonBars from "@/components/confronto/ComparisonBars";

export default function ConfrontoPage() {
  const [input, setInput] = useState("");
  const income = parseInt(input.replace(/\D/g, ""), 10) || 0;
  const result = income > 0 ? calculateIrpef(income) : null;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Il Confronto Personale
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Inserisci il tuo reddito e scopri quanto paghi tu rispetto a chi
          possiede miliardi.
        </p>
      </header>

      <div className="mx-auto w-full max-w-sm">
        <label className="mb-2 block text-sm text-zinc-400">
          Reddito annuo lordo (€)
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Es. 30000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-4 text-center text-2xl font-bold text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <UserPanel result={result} />
            <BillionairePanel />
          </div>

          <ComparisonBars
            userRate={result.effectiveRate}
            billionaireRate={billionaireReference.effectiveRate * 100}
          />
        </>
      )}

      <p className="text-xs text-zinc-600">
        Calcolo IRPEF basato sugli scaglioni 2025 (Agenzia delle Entrate).
        Aliquota miliardaria stimata da Oxfam Italia e Forbes.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Verify `/confronto` renders correctly**

Visit `http://localhost:3000/confronto` — enter a salary, check both panels and comparison bars render.

- [ ] **Step 5: Commit**

```bash
git add src/components/confronto/ src/app/confronto/
git commit -m "feat: add /confronto page with personal tax comparison"
```

---

## Task 9: `/simulatore` page — What-if simulator

**Files:**
- Create: `src/components/simulatore/SliderPanel.tsx`
- Create: `src/components/simulatore/ResultsPanel.tsx`
- Create: `src/app/simulatore/page.tsx`

- [ ] **Step 1: Create `src/components/simulatore/SliderPanel.tsx`**

```tsx
"use client";

import { formatEuro } from "@/lib/format";

interface SliderConfig {
  threshold: number;
  wealthTaxRate: number;
  capitalGainRate: number;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold text-zinc-100">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-xs text-zinc-600">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function SliderPanel({
  config,
  onChange,
}: {
  config: SliderConfig;
  onChange: (c: SliderConfig) => void;
}) {
  return (
    <div className="space-y-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-lg font-bold text-zinc-100">Parametri</h3>

      <Slider
        label="Soglia patrimonio"
        value={config.threshold}
        min={1_000_000}
        max={50_000_000}
        step={1_000_000}
        format={(v) => formatEuro(v)}
        onChange={(v) => onChange({ ...config, threshold: v })}
      />

      <Slider
        label="Aliquota patrimoniale"
        value={config.wealthTaxRate}
        min={0.5}
        max={5}
        step={0.5}
        format={(v) => `${v}%`}
        onChange={(v) => onChange({ ...config, wealthTaxRate: v })}
      />

      <Slider
        label="Tassa capital gain"
        value={config.capitalGainRate}
        min={26}
        max={50}
        step={1}
        format={(v) => `${v}%`}
        onChange={(v) => onChange({ ...config, capitalGainRate: v })}
      />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/simulatore/ResultsPanel.tsx`**

```tsx
import { formatCompact } from "@/lib/format";
import type { WealthTaxResult, CapitalGainResult } from "@/lib/simulator";

export default function ResultsPanel({
  wealthResult,
  capitalGainResult,
}: {
  wealthResult: WealthTaxResult;
  capitalGainResult: CapitalGainResult;
}) {
  const totalAdditional =
    wealthResult.estimatedRevenue + capitalGainResult.additionalRevenue;

  return (
    <div className="space-y-6">
      {/* Total */}
      <div className="rounded-xl border border-blue-500/30 bg-zinc-900/60 p-6">
        <p className="text-sm text-zinc-500">Gettito aggiuntivo stimato</p>
        <p className="mt-1 text-4xl font-bold text-blue-400">
          {formatCompact(totalAdditional * 1_000_000_000)}
        </p>
        <p className="mt-1 text-xs text-zinc-500">all&apos;anno</p>
      </div>

      {/* Breakdown */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h4 className="text-sm font-semibold text-zinc-400">Dettaglio</h4>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Da patrimoniale</span>
            <span className="text-zinc-200">
              {formatCompact(wealthResult.estimatedRevenue * 1_000_000_000)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Da capital gain (+{((capitalGainResult.newRate - capitalGainResult.currentRate) * 100).toFixed(0)}pp)</span>
            <span className="text-zinc-200">
              {formatCompact(capitalGainResult.additionalRevenue * 1_000_000_000)}
            </span>
          </div>
        </div>
      </div>

      {/* Equivalences */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h4 className="text-sm font-semibold text-zinc-400">
          Con questi soldi potresti finanziare
        </h4>
        <div className="mt-3 space-y-3">
          {wealthResult.equivalences.map((e) => (
            <div key={e.nome} className="flex items-baseline justify-between">
              <span className="text-sm text-zinc-400">{e.nome}</span>
              <span className="text-lg font-bold text-emerald-400">
                {e.count.toLocaleString("it-IT")} {e.unita}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/simulatore/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { simulateWealthTax, simulateCapitalGainChange } from "@/lib/simulator";
import SliderPanel from "@/components/simulatore/SliderPanel";
import ResultsPanel from "@/components/simulatore/ResultsPanel";

export default function SimulatorePage() {
  const [config, setConfig] = useState({
    threshold: 5_000_000,
    wealthTaxRate: 1,
    capitalGainRate: 35,
  });

  const wealthResult = simulateWealthTax(config.threshold, config.wealthTaxRate);
  const capitalGainResult = simulateCapitalGainChange(config.capitalGainRate / 100);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Simulatore &ldquo;What if&rdquo;
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Muovi gli slider e scopri quanto raccoglierebbe l&apos;Italia con una
          riforma della tassazione sui grandi patrimoni.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <SliderPanel config={config} onChange={setConfig} />
        <ResultsPanel
          wealthResult={wealthResult}
          capitalGainResult={capitalGainResult}
        />
      </div>

      <p className="text-xs text-zinc-600">
        Stime basate su dati Banca d&apos;Italia (distribuzione ricchezza) e
        Agenzia delle Entrate (gettito capital gain). I calcoli sono
        semplificati e non tengono conto di effetti comportamentali.
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Verify `/simulatore` renders and slider interaction works**

Visit `http://localhost:3000/simulatore` — move sliders, verify results update in real time.

- [ ] **Step 5: Commit**

```bash
git add src/components/simulatore/ src/app/simulatore/
git commit -m "feat: add /simulatore page with interactive wealth tax simulator"
```

---

## Task 10: `/mondo` page — International comparison

**Files:**
- Create: `src/app/mondo/page.tsx`

- [ ] **Step 1: Create `src/app/mondo/page.tsx`**

```tsx
import { countries, italyHighlight } from "@/data/international";
import Section from "@/components/ui/Section";

function CountryCard({ country }: { country: (typeof countries)[0] }) {
  const italy = countries.find((c) => c.codice === "IT")!;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-xl font-bold text-zinc-100">{country.nome}</h3>

      <div className="mt-4 space-y-4">
        {/* Wealth tax */}
        <div>
          <p className="text-xs font-semibold uppercase text-zinc-500">
            Tassa sui patrimoni
          </p>
          <p
            className={`mt-1 text-lg font-bold ${country.wealthTax.hasIt ? "text-emerald-400" : "text-zinc-500"}`}
          >
            {country.wealthTax.rate}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {country.wealthTax.description}
          </p>
        </div>

        {/* Comparison bars */}
        <div className="space-y-3">
          <CompBar
            label="Aliquota top effettiva"
            value={country.effectiveTopRate}
            italyValue={italy.effectiveTopRate}
            max={60}
            unit="%"
          />
          <CompBar
            label="Sanità (% PIL)"
            value={country.healthSpendingPctGdp}
            italyValue={italy.healthSpendingPctGdp}
            max={15}
            unit="%"
          />
          <CompBar
            label="Istruzione (% PIL)"
            value={country.educationSpendingPctGdp}
            italyValue={italy.educationSpendingPctGdp}
            max={8}
            unit="%"
          />
          <CompBar
            label="Disuguaglianza (Gini)"
            value={country.giniIndex}
            italyValue={italy.giniIndex}
            max={40}
            unit=""
            lowerIsBetter
          />
        </div>
      </div>
    </div>
  );
}

function CompBar({
  label,
  value,
  italyValue,
  max,
  unit,
  lowerIsBetter = false,
}: {
  label: string;
  value: number;
  italyValue: number;
  max: number;
  unit: string;
  lowerIsBetter?: boolean;
}) {
  const isBetter = lowerIsBetter ? value < italyValue : value > italyValue;

  return (
    <div>
      <p className="mb-1 text-xs text-zinc-500">{label}</p>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-4 overflow-hidden rounded bg-zinc-800">
            <div
              className={`h-full rounded ${isBetter ? "bg-emerald-500" : "bg-zinc-600"}`}
              style={{ width: `${(value / max) * 100}%` }}
            />
          </div>
        </div>
        <span className="w-14 text-right text-xs text-zinc-300">
          {value}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 overflow-hidden rounded bg-zinc-800">
            <div
              className="h-full rounded bg-zinc-600/50"
              style={{ width: `${(italyValue / max) * 100}%` }}
            />
          </div>
        </div>
        <span className="w-14 text-right text-xs text-zinc-600">
          IT {italyValue}
          {unit}
        </span>
      </div>
    </div>
  );
}

export default function MondoPage() {
  const others = countries.filter((c) => c.codice !== "IT");

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Come fanno gli altri
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          L&apos;Italia non tassa i grandi patrimoni. Ma non è l&apos;unica
          strada possibile. Ecco come si comportano altri paesi europei — e
          cosa ottengono in cambio.
        </p>
      </header>

      {/* Italy debt highlight */}
      <Section title="Il prezzo del debito italiano">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-500/20 bg-zinc-900/60 p-4 text-center">
            <p className="text-3xl font-bold text-red-400">
              {italyHighlight.interestOnDebtPctGdp}%
            </p>
            <p className="text-sm text-zinc-500">
              Interessi sul debito (% PIL) — Italia
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 text-center">
            <p className="text-3xl font-bold text-zinc-400">
              {italyHighlight.avgEuInterestPctGdp}%
            </p>
            <p className="text-sm text-zinc-500">
              Interessi sul debito (% PIL) — Media UE
            </p>
          </div>
        </div>
      </Section>

      {/* Country cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {others.map((c) => (
          <CountryCard key={c.codice} country={c} />
        ))}
      </div>

      <p className="text-xs text-zinc-600">
        Fonti: OECD Government at a Glance 2025, Eurostat, autorità fiscali
        nazionali. Indice Gini: Eurostat 2024.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Verify `/mondo` renders**

Visit `http://localhost:3000/mondo` — check all 4 country cards render with comparison bars.

- [ ] **Step 3: Commit**

```bash
git add src/app/mondo/
git commit -m "feat: add /mondo page with international comparison"
```

---

## Task 11: `/agisci` page — Advocacy toolkit

**Files:**
- Create: `src/data/advocacy.ts`
- Create: `src/app/agisci/page.tsx`

- [ ] **Step 1: Create `src/data/advocacy.ts`**

```ts
export const letterTemplates = [
  {
    id: "patrimoniale",
    titolo: "Introduzione di una patrimoniale",
    oggetto: "Richiesta di discussione parlamentare sull'introduzione di un'imposta patrimoniale",
    testo: `Gentile Onorevole,

Le scrivo come cittadino/a preoccupato/a per la crescente disuguaglianza fiscale nel nostro Paese.

I dati ufficiali mostrano che:
- L'Italia è uno dei pochi paesi europei senza un'imposta patrimoniale generale
- Il 5% più ricco possiede il 46% della ricchezza nazionale (Banca d'Italia)
- L'aliquota effettiva sui grandi patrimoni è circa il 17%, contro il 30-35% di un lavoratore medio
- Paesi come Norvegia e Spagna applicano patrimoniali tra l'1% e il 3.5% sui grandi patrimoni

Una patrimoniale dell'1% sui patrimoni superiori a €5 milioni genererebbe circa €28 miliardi l'anno — sufficienti per finanziare 5.600.000 borse di studio universitarie o 3.500.000 posti in asilo nido.

Le chiedo di portare questa discussione in Parlamento e di sostenere una riforma fiscale che riequilibri il carico tra chi lavora e chi possiede.

Cordiali saluti`,
  },
  {
    id: "evasione",
    titolo: "Contrasto all'evasione fiscale",
    oggetto: "Richiesta di misure concrete contro l'evasione e l'ottimizzazione fiscale aggressiva",
    testo: `Gentile Onorevole,

Le scrivo in merito al tema dell'evasione e dell'ottimizzazione fiscale in Italia.

I dati sono chiari:
- Il tax gap italiano è stimato in oltre €80 miliardi l'anno (MEF)
- L'utilizzo di holding, schermi societari e giurisdizioni a bassa fiscalità riduce l'aliquota effettiva dei super-ricchi a circa il 17%
- Un lavoratore dipendente con reddito medio paga un'aliquota effettiva del 27-33%
- La flat tax al 26% sui capital gain favorisce chi vive di rendite finanziarie rispetto a chi vive di lavoro

Le chiedo di sostenere:
1. Maggiore trasparenza sui patrimoni dei grandi contribuenti
2. Revisione delle agevolazioni fiscali che favoriscono i redditi da capitale
3. Rafforzamento dei controlli sulle strutture societarie utilizzate per l'ottimizzazione fiscale

Cordiali saluti`,
  },
  {
    id: "confronto-ue",
    titolo: "Allineamento alla media europea",
    oggetto: "Richiesta di allineamento della spesa sociale italiana alla media UE",
    testo: `Gentile Onorevole,

Le scrivo per sottoporre alla Sua attenzione il divario tra la spesa sociale italiana e la media europea.

I dati OECD e Eurostat mostrano che:
- L'Italia spende il 6.3% del PIL in sanità, contro una media UE dell'8.0%
- L'Italia spende il 3.9% del PIL in istruzione, contro una media UE del 4.6%
- Al contempo, l'Italia spende il 4.6% del PIL in interessi sul debito, contro l'1.8% della media UE

Paesi come Francia (12.1% in sanità) e Norvegia (5.9% in istruzione) dimostrano che investire di più nei servizi è possibile — e produce risultati misurabili in termini di qualità della vita.

Le chiedo di lavorare per un progressivo allineamento della spesa sociale italiana alla media europea, individuando le risorse necessarie attraverso una riforma della tassazione sui grandi patrimoni.

Cordiali saluti`,
  },
];

export const factSheets = [
  {
    id: "disuguaglianza",
    titolo: "La disuguaglianza fiscale in Italia — I numeri",
    fatti: [
      "Il 5% più ricco possiede il 46% della ricchezza nazionale",
      "L'aliquota effettiva di un miliardario è circa il 17%",
      "L'aliquota effettiva di un lavoratore medio è circa il 27-33%",
      "L'Italia non ha un'imposta patrimoniale generale",
      "€388 miliardi di spesa pubblica vanno a debito e interessi",
      "La spesa in sanità è il 6.3% del PIL, sotto la media UE del 8%",
    ],
  },
  {
    id: "confronto-paesi",
    titolo: "Cosa fanno gli altri paesi",
    fatti: [
      "Norvegia: patrimoniale 0.95-1.1%, sanità 11.4% PIL, Gini 25.3",
      "Spagna: patrimoniale 1.7-3.5% sopra €3M, sanità 7.3% PIL",
      "Francia: IFI 0.5-1.5% su immobili sopra €1.3M, sanità 12.1% PIL",
      "Italia: nessuna patrimoniale, sanità 6.3% PIL, Gini 32.8",
    ],
  },
  {
    id: "simulazione",
    titolo: "Quanto raccoglieremmo con una patrimoniale",
    fatti: [
      "1% sopra €1M: ~€55 miliardi/anno",
      "1% sopra €5M: ~€28 miliardi/anno",
      "2% sopra €10M: ~€36 miliardi/anno",
      "Capital gain al 35% (dal 26%): +€5.3 miliardi/anno",
    ],
  },
];
```

- [ ] **Step 2: Create `src/app/agisci/page.tsx`**

```tsx
"use client";

import { useState } from "react";
import { letterTemplates, factSheets } from "@/data/advocacy";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-700"
    >
      {copied ? "Copiato!" : "Copia testo"}
    </button>
  );
}

export default function AgisciPage() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    letterTemplates[0].id
  );
  const template = letterTemplates.find((t) => t.id === selectedTemplate)!;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Agisci
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Hai visto i dati. Ora hai gli strumenti per fare qualcosa di concreto.
        </p>
      </header>

      {/* Fact sheets */}
      <section>
        <h2 className="text-2xl font-bold text-zinc-100">Schede dati</h2>
        <p className="mt-2 text-sm text-zinc-400">
          I fatti chiave, pronti da condividere.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {factSheets.map((sheet) => (
            <div
              key={sheet.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
            >
              <h3 className="text-sm font-bold text-zinc-100">
                {sheet.titolo}
              </h3>
              <ul className="mt-3 space-y-2">
                {sheet.fatti.map((fatto, i) => (
                  <li key={i} className="text-xs text-zinc-400">
                    • {fatto}
                  </li>
                ))}
              </ul>
              <CopyButton text={`${sheet.titolo}\n\n${sheet.fatti.map((f) => `• ${f}`).join("\n")}\n\nFonte: antic — dati ufficiali RGS, ISTAT, Banca d'Italia`} />
            </div>
          ))}
        </div>
      </section>

      {/* Letter templates */}
      <section id="template">
        <h2 className="text-2xl font-bold text-zinc-100">
          Scrivi al tuo parlamentare
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Scegli il tema, copia il testo, invialo al tuo rappresentante.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {letterTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className={`rounded-lg px-4 py-2 text-sm transition-colors ${
                selectedTemplate === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t.titolo}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <p className="mb-2 text-xs text-zinc-500">
            Oggetto: {template.oggetto}
          </p>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-300">
            {template.testo}
          </pre>
          <div className="mt-4">
            <CopyButton
              text={`Oggetto: ${template.oggetto}\n\n${template.testo}`}
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="text-sm font-bold text-zinc-100">
            Dove inviare la lettera
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <a
              href="https://www.camera.it/leg19/28"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300"
            >
              Camera dei Deputati — Elenco deputati →
            </a>
            <a
              href="https://www.senato.it/leg/19/BGT/Schede/Attsen/Sena.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300"
            >
              Senato della Repubblica — Elenco senatori →
            </a>
          </div>
        </div>
      </section>

      <p className="text-xs text-zinc-600">
        Tutti i dati citati nei template provengono da fonti ufficiali: RGS,
        ISTAT, Banca d&apos;Italia, OECD, Eurostat, Forbes Italia, Oxfam
        Italia.
      </p>
    </div>
  );
}
```

- [ ] **Step 3: Verify `/agisci` renders**

Visit `http://localhost:3000/agisci` — check fact sheets, template switching, copy button, and links to camera.it/senato.it.

- [ ] **Step 4: Commit**

```bash
git add src/data/advocacy.ts src/app/agisci/
git commit -m "feat: add /agisci page with fact sheets and letter templates"
```

---

## Task 12: Run all tests + final verification

**Files:** none (verification only)

- [ ] **Step 1: Run all tests**

```bash
npx vitest run
```

Expected: all tests in `irpef.test.ts` and `simulator.test.ts` PASS.

- [ ] **Step 2: Verify all pages load**

Visit each page and verify no errors:
- `http://localhost:3000/` — scrollytelling with 5 acts
- `http://localhost:3000/bilancio` — budget charts
- `http://localhost:3000/confronto` — personal comparison
- `http://localhost:3000/simulatore` — what-if simulator
- `http://localhost:3000/mondo` — international comparison
- `http://localhost:3000/agisci` — advocacy tools

- [ ] **Step 3: Verify navigation**

Click through all Navbar links, verify active state highlights correctly.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final verification pass — all pages working"
```
