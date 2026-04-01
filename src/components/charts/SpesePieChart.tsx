"use client";

import type { PieLabelRenderProps } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { PieLabel } from "recharts/types/polar/Pie";
import { spese } from "@/data/budget";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { nome: string; valore: number } }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = ((d.valore / spese.totale) * 100).toFixed(1);
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-xl">
      <p className="font-semibold text-zinc-100">{d.nome}</p>
      <p className="text-lg text-zinc-300">
        €{d.valore} mld{" "}
        <span className="text-sm text-zinc-500">({pct}%)</span>
      </p>
    </div>
  );
};

export default function SpesePieChart() {
  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={spese.dettaglio}
            dataKey="valore"
            nameKey="nome"
            cx="50%"
            cy="50%"
            outerRadius={150}
            innerRadius={70}
            strokeWidth={2}
            stroke="#18181b"
            label={((props: PieLabelRenderProps & { nome?: string }) => {
              const nome = (props.nome ?? "") as string;
              const percent = (props.percent ?? 0) as number;
              return `${nome.length > 20 ? nome.slice(0, 18) + "…" : nome} ${(percent * 100).toFixed(0)}%`;
            }) as PieLabel}
            labelLine={{ stroke: "#71717a" }}
          >
            {spese.dettaglio.map((entry, i) => (
              <Cell key={i} fill={entry.colore} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-2 text-sm text-zinc-500">
        Totale spese finali: <strong className="text-zinc-300">€{spese.totale} miliardi</strong>
      </p>
    </div>
  );
}
