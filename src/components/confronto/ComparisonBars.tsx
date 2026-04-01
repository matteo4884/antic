"use client";

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
      <h3 className="text-lg font-bold text-zinc-100">
        Per ogni €100 guadagnati
      </h3>

      <div className="mt-6 space-y-6">
        {/* User bar */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-zinc-300">Tu</span>
            <span className="font-bold text-red-400">
              €{userRate.toFixed(1)} in tasse
            </span>
          </div>
          <div className="mt-2 h-8 w-full overflow-hidden rounded-lg bg-zinc-800">
            <div
              className="flex h-full items-center justify-end rounded-lg bg-red-500 pr-2 text-xs font-bold text-white transition-all duration-700"
              style={{ width: `${Math.min(userRate, 100)}%` }}
            >
              {userRate.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Billionaire bar */}
        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-zinc-300">Top 0.1%</span>
            <span className="font-bold text-amber-400">
              €{billionaireRate.toFixed(1)} in tasse
            </span>
          </div>
          <div className="mt-2 h-8 w-full overflow-hidden rounded-lg bg-zinc-800">
            <div
              className="flex h-full items-center justify-end rounded-lg bg-amber-500 pr-2 text-xs font-bold text-white transition-all duration-700"
              style={{ width: `${Math.min(billionaireRate, 100)}%` }}
            >
              {billionaireRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Tax Freedom Day */}
      <div className="mt-8 border-t border-zinc-800 pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Tax Freedom Day
        </h4>
        <p className="mt-3 text-zinc-300">
          Tu lavori{" "}
          <span className="font-bold text-red-400">{userDays} giorni</span>{" "}
          l&apos;anno solo per pagare le tasse. Un miliardario ne lavora{" "}
          <span className="font-bold text-amber-400">{billionaireDays}</span>.
        </p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-xs text-zinc-400">Tu — {userDays} giorni</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-xs text-zinc-400">
              Top 0.1% — {billionaireDays} giorni
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
