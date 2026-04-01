"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { spesaPerFunzione } from "@/data/budget";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-xl">
      <p className="mb-1 font-semibold text-zinc-100">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="text-sm">
          {p.name}: {p.value}% PIL
        </p>
      ))}
    </div>
  );
};

export default function ConfrontoUeChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={spesaPerFunzione}
          margin={{ left: 10, right: 20, top: 10, bottom: 10 }}
        >
          <XAxis
            dataKey="nome"
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
            angle={-20}
            textAnchor="end"
            height={60}
          />
          <YAxis
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
          <Legend
            wrapperStyle={{ fontSize: 13, color: "#a1a1aa" }}
          />
          <Bar
            dataKey="percentualePil"
            name="Italia"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
          <Bar
            dataKey="mediaUe"
            name="Media UE"
            fill="#6b7280"
            radius={[4, 4, 0, 0]}
            barSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-sm text-zinc-500">
        Spesa per funzione in % del PIL — Italia vs Media UE
      </p>
    </div>
  );
}
