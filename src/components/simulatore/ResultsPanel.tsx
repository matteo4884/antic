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
            <span className="text-zinc-500">
              Da capital gain (+
              {((capitalGainResult.newRate - capitalGainResult.currentRate) * 100).toFixed(0)}
              pp)
            </span>
            <span className="text-zinc-200">
              {formatCompact(
                capitalGainResult.additionalRevenue * 1_000_000_000
              )}
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
