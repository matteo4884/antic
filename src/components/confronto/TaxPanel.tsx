import { IrpefResult } from "@/lib/irpef";
import { billionaireReference } from "@/data/tax";
import { formatEuro, formatPercent } from "@/lib/format";

export function UserPanel({ result }: { result: IrpefResult }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Tu
      </p>

      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-4xl font-bold text-red-400">
          {formatPercent(result.effectiveRate)}
        </p>
        <p className="text-sm text-zinc-400">aliquota effettiva</p>
      </div>

      <dl className="mt-6 space-y-3">
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Reddito lordo</dt>
          <dd className="text-sm font-medium text-zinc-200">
            {formatEuro(result.grossIncome)}
          </dd>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">IRPEF lorda</dt>
          <dd className="text-sm font-medium text-zinc-200">
            {formatEuro(result.grossTax)}
          </dd>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Detrazioni</dt>
          <dd className="text-sm font-medium text-emerald-400">
            -{formatEuro(result.deduction)}
          </dd>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Tasse pagate</dt>
          <dd className="text-sm font-bold text-red-400">
            {formatEuro(result.taxPaid)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-zinc-400">Netto in tasca</dt>
          <dd className="text-sm font-bold text-emerald-400">
            {formatEuro(result.netIncome)}
          </dd>
        </div>
      </dl>

      {result.spendingBreakdown.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Dove vanno i tuoi soldi
          </p>
          <ul className="mt-3 space-y-2">
            {result.spendingBreakdown.map((item) => (
              <li key={item.nome}>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>{item.nome}</span>
                  <span>{formatEuro(item.amount)}</span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-red-500/60"
                    style={{ width: `${item.percentuale}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function BillionairePanel() {
  const { avgWealth, estimatedAnnualReturn, effectiveRate, source } =
    billionaireReference;

  const estimatedReturn = avgWealth * estimatedAnnualReturn;
  const estimatedTax = estimatedReturn * effectiveRate;
  const taxOnWealth = (estimatedTax / avgWealth) * 100;

  return (
    <div className="rounded-xl border border-amber-800/40 bg-zinc-900/60 p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Top 0.1% — Miliardari
      </p>

      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-4xl font-bold text-amber-400">
          {formatPercent(effectiveRate * 100)}
        </p>
        <p className="text-sm text-zinc-400">aliquota effettiva</p>
      </div>

      <dl className="mt-6 space-y-3">
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Patrimonio medio</dt>
          <dd className="text-sm font-medium text-zinc-200">€14,7 mld</dd>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Rendita stimata al 5%</dt>
          <dd className="text-sm font-medium text-zinc-200">
            {formatEuro(estimatedReturn)}
          </dd>
        </div>
        <div className="flex justify-between border-b border-zinc-800 pb-2">
          <dt className="text-sm text-zinc-400">Tasse stimate</dt>
          <dd className="text-sm font-bold text-amber-400">
            {formatEuro(estimatedTax)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm text-zinc-400">% sul patrimonio</dt>
          <dd className="text-sm font-bold text-amber-400">
            {formatPercent(taxOnWealth, 2)}
          </dd>
        </div>
      </dl>

      <p className="mt-6 text-xs text-zinc-600">
        Fonte: {source}
      </p>
    </div>
  );
}
