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
  const capitalGainResult = simulateCapitalGainChange(
    config.capitalGainRate / 100
  );

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
