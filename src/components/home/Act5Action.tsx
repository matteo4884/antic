import Link from "next/link";

const actions = [
  {
    title: "Simula una riforma",
    description:
      "Muovi gli slider e scopri quanto si raccoglierebbe con una patrimoniale o una riforma del capital gain.",
    href: "/simulatore",
    accent: "text-blue-400",
    border: "border-blue-500/30",
  },
  {
    title: "Scarica i dati",
    description:
      "Grafici esportabili, schede dati pronte, tutto con fonti ufficiali. Usali dove vuoi.",
    href: "/agisci",
    accent: "text-emerald-400",
    border: "border-emerald-500/30",
  },
  {
    title: "Scrivi al tuo parlamentare",
    description:
      "Template pronti con i dati reali. Scegli il tema, copia il testo, invialo.",
    href: "/agisci#template",
    accent: "text-amber-400",
    border: "border-amber-500/30",
  },
];

export default function Act5Action() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
        Cosa puoi fare tu
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-zinc-300">
        I numeri li hai visti. Ora hai una scelta.
      </p>

      <div className="mt-10 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`rounded-xl border ${a.border} bg-zinc-900/60 p-6 transition-colors hover:bg-zinc-800/60`}
          >
            <h3 className={`text-lg font-bold ${a.accent}`}>{a.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{a.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-16 text-sm text-zinc-600">
        Dati ufficiali da RGS, ISTAT, Banca d&apos;Italia, OECD.
      </p>
    </section>
  );
}
