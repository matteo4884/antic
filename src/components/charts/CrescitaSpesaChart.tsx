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
import { crescitaSpesa2019_2025 } from "@/data/budget";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { nome: string; crescita: number } }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-xl">
      <p className="font-semibold text-zinc-100">{d.nome}</p>
      <p className="text-lg text-emerald-400">+{d.crescita}%</p>
    </div>
  );
};

export default function CrescitaSpesaChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={crescitaSpesa2019_2025}
          margin={{ left: 10, right: 20, top: 10, bottom: 10 }}
        >
          <XAxis
            dataKey="nome"
            tick={{ fill: "#d4d4d8", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Bar dataKey="crescita" radius={[6, 6, 0, 0]} barSize={50}>
            {crescitaSpesa2019_2025.map((entry, i) => (
              <Cell key={i} fill={entry.colore} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-sm text-zinc-500">
        Crescita % della spesa per settore (2019–2025)
      </p>
    </div>
  );
}
