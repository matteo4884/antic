"use client";

import { useState } from "react";
import { letterTemplates, factSheets } from "@/data/advocacy";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
    >
      {copied ? "Copiato!" : "Copia testo"}
    </button>
  );
}

export default function AgisciPage() {
  const [activeTemplateId, setActiveTemplateId] = useState(letterTemplates[0].id);

  const activeTemplate = letterTemplates.find((t) => t.id === activeTemplateId)!;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Agisci
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Strumenti concreti per informarti e contattare i tuoi rappresentanti:
          schede dati da condividere e modelli di lettera pronti all&apos;uso.
        </p>
      </header>

      {/* Section 1: Schede dati */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-zinc-100">Schede dati</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {factSheets.map((sheet) => {
            const copyText =
              sheet.fatti.join("\n") +
              "\n\nFonti: Banca d'Italia (Indagine sui Bilanci delle Famiglie 2024), MEF (Tax gap 2024), Eurostat.";

            return (
              <div
                key={sheet.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col gap-4"
              >
                <h3 className="text-base font-semibold text-zinc-100">
                  {sheet.titolo}
                </h3>
                <ul className="flex flex-col gap-2 flex-1">
                  {sheet.fatti.map((fatto, i) => (
                    <li key={i} className="flex gap-2 text-sm text-zinc-400">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <span>{fatto}</span>
                    </li>
                  ))}
                </ul>
                <CopyButton text={copyText} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Scrivi al tuo parlamentare */}
      <section id="template">
        <h2 className="mb-6 text-2xl font-bold text-zinc-100">
          Scrivi al tuo parlamentare
        </h2>

        {/* Template tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {letterTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => setActiveTemplateId(template.id)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTemplateId === template.id
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {template.titolo}
            </button>
          ))}
        </div>

        {/* Active template card */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Oggetto
            </span>
            <p className="mt-1 text-sm font-medium text-zinc-200">
              {activeTemplate.oggetto}
            </p>
          </div>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-300">
            {activeTemplate.testo}
          </pre>
          <div className="pt-2">
            <CopyButton
              text={`Oggetto: ${activeTemplate.oggetto}\n\n${activeTemplate.testo}`}
            />
          </div>
        </div>

        {/* Links to parliamentary directories */}
        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">
            Trova il tuo parlamentare
          </h3>
          <p className="mb-4 text-sm text-zinc-500">
            Cerca il tuo deputato o senatore per circoscrizione e invia
            direttamente la lettera.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.camera.it/leg19/28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Elenco deputati — Camera.it
            </a>
            <a
              href="https://www.senato.it/leg/19/BGT/Schede/Attsen/Sena.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              Elenco senatori — Senato.it
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
