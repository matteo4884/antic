"use client";

import { useState } from "react";
import { calculateIrpef } from "@/lib/irpef";
import { billionaireReference } from "@/data/tax";
import { UserPanel, BillionairePanel } from "@/components/confronto/TaxPanel";
import ComparisonBars from "@/components/confronto/ComparisonBars";

export default function ConfrontoPage() {
  const [rawInput, setRawInput] = useState("");
  const grossIncome = parseFloat(rawInput.replace(/\./g, "").replace(",", "."));
  const validIncome = !isNaN(grossIncome) && grossIncome > 0;

  const result = validIncome ? calculateIrpef(grossIncome) : null;
  const billionaireRate = billionaireReference.effectiveRate * 100;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Il tuo confronto fiscale
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Inserisci il tuo reddito lordo annuo e scopri come la tua aliquota
          effettiva si confronta con quella dei miliardari italiani.
        </p>
      </header>

      {/* Income input */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <label
          htmlFor="income"
          className="block text-sm font-semibold text-zinc-300"
        >
          Reddito annuo lordo (€)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <span className="text-zinc-500">€</span>
          <input
            id="income"
            type="text"
            inputMode="numeric"
            placeholder="es. 30000"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-lg text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        {rawInput && !validIncome && (
          <p className="mt-2 text-sm text-red-400">
            Inserisci un numero valido
          </p>
        )}
      </div>

      {/* Results */}
      {result && (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <UserPanel result={result} />
            <BillionairePanel />
          </div>

          <ComparisonBars
            userRate={result.effectiveRate}
            billionaireRate={billionaireRate}
          />
        </>
      )}

      {/* Source note */}
      <p className="text-xs text-zinc-600">
        Calcolo IRPEF 2025 basato sulle aliquote ufficiali Agenzia delle
        Entrate. Dati miliardari: Forbes Italia 2025, stime Oxfam Italia.
        L&apos;aliquota effettiva include capital gain tassato al 26% e
        ottimizzazione fiscale stimata.
      </p>
    </div>
  );
}
