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
