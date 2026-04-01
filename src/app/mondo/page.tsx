import { countries, italyHighlight, type CountryData } from "@/data/international";
import Section from "@/components/ui/Section";

// Italy is always the reference country (codice "IT")
const italy = countries.find((c) => c.codice === "IT") as CountryData;
const otherCountries = countries.filter((c) => c.codice !== "IT");

interface BarMetric {
  label: string;
  countryValue: number;
  italyValue: number;
  unit: string;
  lowerIsBetter?: boolean;
}

function ComparisonBar({
  label,
  countryValue,
  italyValue,
  unit,
  lowerIsBetter = false,
}: BarMetric) {
  // Scale bars relative to the larger of the two values
  const max = Math.max(countryValue, italyValue) * 1.15;
  const countryPct = (countryValue / max) * 100;
  const italyPct = (italyValue / max) * 100;

  // "better" means higher value, unless lowerIsBetter (Gini)
  const countryIsBetter = lowerIsBetter
    ? countryValue < italyValue
    : countryValue > italyValue;

  const barColor = countryIsBetter ? "bg-emerald-500" : "bg-zinc-600";

  return (
    <div>
      <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
        <span>{label}</span>
        <span className={countryIsBetter ? "text-emerald-400" : "text-zinc-400"}>
          {countryValue}
          {unit}
        </span>
      </div>

      {/* Country bar */}
      <div className="relative h-3 rounded-full bg-zinc-800 overflow-hidden mb-1">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${countryPct}%` }}
        />
      </div>

      {/* Italy reference bar (thinner) */}
      <div className="relative h-1.5 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-zinc-500"
          style={{ width: `${italyPct}%` }}
        />
      </div>

      <div className="flex items-center gap-1.5 mt-1">
        <div className="h-1 w-3 rounded-full bg-zinc-500" />
        <span className="text-xs text-zinc-600">Italia {italyValue}{unit}</span>
      </div>
    </div>
  );
}

function CountryCard({ country }: { country: CountryData }) {
  const metrics: BarMetric[] = [
    {
      label: "Aliquota effettiva top",
      countryValue: country.effectiveTopRate,
      italyValue: italy.effectiveTopRate,
      unit: "%",
    },
    {
      label: "Spesa sanitaria % PIL",
      countryValue: country.healthSpendingPctGdp,
      italyValue: italy.healthSpendingPctGdp,
      unit: "%",
    },
    {
      label: "Spesa istruzione % PIL",
      countryValue: country.educationSpendingPctGdp,
      italyValue: italy.educationSpendingPctGdp,
      unit: "%",
    },
    {
      label: "Indice di Gini",
      countryValue: country.giniIndex,
      italyValue: italy.giniIndex,
      unit: "",
      lowerIsBetter: true,
    },
  ];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col gap-5">
      {/* Country header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-100">{country.nome}</h3>
        <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-mono font-semibold text-zinc-400">
          {country.codice}
        </span>
      </div>

      {/* Wealth tax badge */}
      <div
        className={`rounded-lg p-3 ${
          country.wealthTax.hasIt
            ? "border border-emerald-800 bg-emerald-950/50"
            : "border border-zinc-800 bg-zinc-950/40"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-zinc-400">
            Imposta patrimoniale
          </span>
          <span
            className={`text-xs font-bold ${
              country.wealthTax.hasIt ? "text-emerald-400" : "text-zinc-500"
            }`}
          >
            {country.wealthTax.rate}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-zinc-500">
          {country.wealthTax.description}
        </p>
      </div>

      {/* Comparison bars */}
      <div className="flex flex-col gap-4">
        {metrics.map((m) => (
          <ComparisonBar key={m.label} {...m} />
        ))}
      </div>
    </div>
  );
}

export default function MondoPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      {/* Page header */}
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Come fanno gli altri
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Come si colloca l&apos;Italia rispetto ad altri paesi europei su fisco,
          spesa pubblica e disuguaglianza. I dati mostrano scelte politiche
          concrete, non inevitabilità economiche.
        </p>
      </header>

      {/* Debt highlight section */}
      <Section
        title="Il peso del debito"
        description="L'Italia paga quasi tre volte la media UE in interessi sul debito pubblico. Ogni euro speso in interessi è un euro in meno per sanità, istruzione, futuro."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Italy interest card */}
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-6">
            <p className="text-sm text-zinc-400">Italia — interessi sul debito</p>
            <p className="mt-2 text-4xl font-extrabold text-red-400">
              {italyHighlight.interestOnDebtPctGdp}%
              <span className="ml-1 text-lg font-semibold text-red-500">PIL</span>
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Debito pubblico al {italyHighlight.publicDebtPctGdp}% del PIL
            </p>
          </div>

          {/* EU average card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
            <p className="text-sm text-zinc-400">Media UE — interessi sul debito</p>
            <p className="mt-2 text-4xl font-extrabold text-zinc-100">
              {italyHighlight.avgEuInterestPctGdp}%
              <span className="ml-1 text-lg font-semibold text-zinc-400">PIL</span>
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Debito medio UE al {italyHighlight.avgEuDebtPctGdp}% del PIL
            </p>
          </div>
        </div>
      </Section>

      {/* Country cards grid */}
      <Section
        title="Confronto per paese"
        description="Quattro paesi europei a confronto con l'Italia su aliquote fiscali, spesa pubblica e disuguaglianza. Le barre più scure indicano i valori italiani di riferimento."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {otherCountries.map((country) => (
            <CountryCard key={country.codice} country={country} />
          ))}
        </div>
      </Section>

      {/* Source note */}
      <p className="text-xs text-zinc-600">
        Fonti: OCSE Government at a Glance 2025, Eurostat, autorità fiscali
        nazionali. Aliquote effettive stimate su redditi nella fascia più alta.
        L&apos;indice di Gini misura la disuguaglianza del reddito (0 = uguaglianza
        perfetta, 100 = massima disuguaglianza). Dati aggiornati al 2024–2025.
      </p>
    </div>
  );
}
