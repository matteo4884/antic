"use client";

import { formatEuro } from "@/lib/format";

export interface SimulatorConfig {
  threshold: number;
  wealthTaxRate: number;
  capitalGainRate: number;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="text-zinc-400">{label}</span>
        <span className="font-semibold text-zinc-100">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
      <div className="flex justify-between text-xs text-zinc-600">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function SliderPanel({
  config,
  onChange,
}: {
  config: SimulatorConfig;
  onChange: (c: SimulatorConfig) => void;
}) {
  return (
    <div className="space-y-8 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h3 className="text-lg font-bold text-zinc-100">Parametri</h3>

      <Slider
        label="Soglia patrimonio"
        value={config.threshold}
        min={1_000_000}
        max={50_000_000}
        step={1_000_000}
        format={(v) => formatEuro(v)}
        onChange={(v) => onChange({ ...config, threshold: v })}
      />

      <Slider
        label="Aliquota patrimoniale"
        value={config.wealthTaxRate}
        min={0.5}
        max={5}
        step={0.5}
        format={(v) => `${v}%`}
        onChange={(v) => onChange({ ...config, wealthTaxRate: v })}
      />

      <Slider
        label="Tassa capital gain"
        value={config.capitalGainRate}
        min={26}
        max={50}
        step={1}
        format={(v) => `${v}%`}
        onChange={(v) => onChange({ ...config, capitalGainRate: v })}
      />
    </div>
  );
}
