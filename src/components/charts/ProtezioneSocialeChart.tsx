"use client";

import type { PieLabelRenderProps } from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PieLabel } from "recharts/types/polar/Pie";
import { protezioneSociale } from "@/data/budget";

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: {
      nome: string;
      valore: number;
      percentuale: number;
      descrizione: string;
    };
  }>;
}) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="max-w-xs rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-xl">
      <p className="font-semibold text-zinc-100">{d.nome}</p>
      <p className="text-lg text-zinc-300">
        €{d.valore} mld{" "}
        <span className="text-sm text-zinc-500">({d.percentuale}%)</span>
      </p>
      <p className="mt-1 text-xs text-zinc-500">{d.descrizione}</p>
    </div>
  );
};

export default function ProtezioneSocialeChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex flex-wrap justify-center gap-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-zinc-100">
            €{protezioneSociale.totale} mld
          </p>
          <p className="text-sm text-zinc-500">Spesa totale</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-amber-400">
            {protezioneSociale.percentualePil}%
          </p>
          <p className="text-sm text-zinc-500">del PIL</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-400">
            {protezioneSociale.percentualeSpesaCorrente}%
          </p>
          <p className="text-sm text-zinc-500">della spesa corrente</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={protezioneSociale.dettaglio}
            dataKey="valore"
            nameKey="nome"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={60}
            strokeWidth={2}
            stroke="#18181b"
            label={((props: PieLabelRenderProps & { nome?: string; percentuale?: number }) => `${props.nome} ${props.percentuale}%`) as PieLabel}
            labelLine={{ stroke: "#71717a" }}
          >
            {protezioneSociale.dettaglio.map((entry, i) => (
              <Cell key={i} fill={entry.colore} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
