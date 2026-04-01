"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { entrate } from "@/data/budget";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { nome: string; valore: number } }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const pct = ((d.valore / entrate.totale) * 100).toFixed(1);
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

export default function EntrateBarChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={entrate.dettaglio}
          layout="vertical"
          margin={{ left: 20, right: 20, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
            unit=" mld"
          />
          <YAxis
            type="category"
            dataKey="nome"
            width={140}
            tick={{ fill: "#d4d4d8", fontSize: 13 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="valore" radius={[0, 6, 6, 0]} barSize={28}>
            {entrate.dettaglio.map((entry, i) => (
              <Cell key={i} fill={entry.colore} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-sm text-zinc-500">
        Totale entrate finali: <strong className="text-zinc-300">€{entrate.totale} miliardi</strong>
      </p>
    </div>
  );
}
