import { countries } from "@/data/international";
import Link from "next/link";

export default function Act4International() {
  const others = countries.filter((c) => c.codice !== "IT");

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Come fanno gli altri
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-zinc-400">
        Non è utopia. Altri paesi europei tassano i grandi patrimoni e
        investono di più in servizi.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
        {others.map((c) => (
          <div
            key={c.codice}
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6"
          >
            <h3 className="text-lg font-bold text-zinc-100">{c.nome}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Tassa patrimoni</span>
                <span
                  className={
                    c.wealthTax.hasIt ? "text-emerald-400" : "text-zinc-500"
                  }
                >
                  {c.wealthTax.rate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Aliquota top effettiva</span>
                <span className="text-zinc-200">{c.effectiveTopRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Sanità (% PIL)</span>
                <span className="text-zinc-200">
                  {c.healthSpendingPctGdp}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Istruzione (% PIL)</span>
                <span className="text-zinc-200">
                  {c.educationSpendingPctGdp}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/mondo"
        className="mt-8 text-sm text-blue-400 hover:text-blue-300"
      >
        Vedi il confronto completo →
      </Link>
    </section>
  );
}
