import { bilancioSintesi } from "@/data/budget";
import StatCard from "@/components/ui/StatCard";
import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";
import SpesePieChart from "@/components/charts/SpesePieChart";
import EntrateBarChart from "@/components/charts/EntrateBarChart";
import ConfrontoUeChart from "@/components/charts/ConfrontoUeChart";
import ProtezioneSocialeChart from "@/components/charts/ProtezioneSocialeChart";
import CrescitaSpesaChart from "@/components/charts/CrescitaSpesaChart";

export default function BilancioPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50">
          Il Bilancio dello Stato
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Bilancio dello Stato 2025 — dati ufficiali della Ragioneria Generale
          dello Stato, ISTAT e MEF, visualizzati per capire davvero come
          vengono usati i nostri soldi.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Entrate finali"
          value={`€${bilancioSintesi.entrateFinali} mld`}
          sub="Quanto lo Stato incassa"
          accent="text-blue-400"
        />
        <StatCard
          label="Spese finali"
          value={`€${bilancioSintesi.speseFinali} mld`}
          sub="Quanto lo Stato spende"
          accent="text-amber-400"
        />
        <StatCard
          label="Saldo netto"
          value={`€${bilancioSintesi.saldoNetto} mld`}
          sub="Deficit da finanziare"
          accent="text-red-400"
        />
        <StatCard
          label="Ricorso al mercato"
          value={`€${bilancioSintesi.ricorsoMercato} mld`}
          sub="Nuovo debito emesso"
          accent="text-red-500"
        />
      </div>

      <Section
        title="Come spendiamo"
        description="La voce più grande? Il rimborso del debito pubblico. Più di quanto spendiamo per sanità o istruzione."
      >
        <SpesePieChart />
      </Section>

      <Section
        title="Da dove arrivano i soldi"
        description="Più della metà delle entrate viene dalle tasse sul reddito (IRPEF) e sui consumi (IVA) — pagate da lavoratori dipendenti e consumatori."
      >
        <EntrateBarChart />
      </Section>

      <Section
        title="Protezione sociale"
        description="Il welfare italiano assorbe quasi il 60% della spesa corrente. Ma la stragrande maggioranza va in pensioni."
      >
        <ProtezioneSocialeChart />
      </Section>

      <Section
        title="Italia vs Media UE"
        description="L'Italia spende molto più della media europea per interessi sul debito, ma meno per sanità e istruzione."
      >
        <ConfrontoUeChart />
      </Section>

      <Section
        title="Come è cambiata la spesa (2019–2025)"
        description="Tutte le voci di spesa sono cresciute, ma non allo stesso ritmo."
      >
        <CrescitaSpesaChart />
      </Section>

      <Footer />
    </div>
  );
}
