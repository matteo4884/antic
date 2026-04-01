import { fonti } from "@/data/budget";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 pt-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
        Fonti ufficiali
      </h3>
      <ul className="mt-3 space-y-1">
        {fonti.map((f) => (
          <li key={f.nome}>
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 underline decoration-zinc-700 hover:text-zinc-200"
            >
              {f.nome}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-zinc-600">
        I dati sono tratti da fonti pubbliche ufficiali. Valori in miliardi di
        euro, anno di riferimento 2025 (previsione di competenza).
      </p>
    </footer>
  );
}
