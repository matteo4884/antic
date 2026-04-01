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
