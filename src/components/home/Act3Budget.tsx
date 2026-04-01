import { spese } from "@/data/budget";
import Link from "next/link";

export default function Act3Budget() {
  const maxValue = Math.max(...spese.dettaglio.map((s) => s.valore));

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Dove finiscono i tuoi soldi
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-zinc-400">
        €915 miliardi di spesa pubblica. Ecco come sono divisi.
      </p>

      <div className="mt-10 w-full max-w-2xl space-y-3">
        {spese.dettaglio.map((s) => (
          <div key={s.nome} className="flex items-center gap-4">
            <span className="w-48 text-right text-sm text-zinc-400">
              {s.nome}
            </span>
            <div className="flex-1">
              <div className="h-8 overflow-hidden rounded bg-zinc-800">
                <div
                  className="flex h-full items-center rounded px-3 text-xs font-semibold text-white transition-all duration-700"
                  style={{
                    width: `${(s.valore / maxValue) * 100}%`,
                    backgroundColor: s.colore,
                  }}
                >
                  €{s.valore} mld
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-md text-center text-sm text-zinc-400">
        <span className="font-bold text-red-400">€388 miliardi</span> vanno a
        debito e interessi — più di sanità e istruzione messe insieme.
      </p>

      <Link
        href="/bilancio"
        className="mt-6 text-sm text-blue-400 hover:text-blue-300"
      >
        Esplora il bilancio completo →
      </Link>
    </section>
  );
}
