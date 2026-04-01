import { bilancioSintesi } from "@/data/budget";
import SpesePieChart from "@/components/charts/SpesePieChart";
import EntrateBarChart from "@/components/charts/EntrateBarChart";
import ConfrontoUeChart from "@/components/charts/ConfrontoUeChart";
import ProtezioneSocialeChart from "@/components/charts/ProtezioneSocialeChart";
import CrescitaSpesaChart from "@/components/charts/CrescitaSpesaChart";
import StatCard from "@/components/ui/StatCard";
import Section from "@/components/ui/Section";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:px-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-50 md:text-5xl">
          Dove vanno i soldi dell&apos;Italia
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
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
        description="La voce più grande? Il rimborso del debito pubblico. Più di quanto spendiamo per sanità o istruzione. Ogni anno, centinaia di miliardi vanno a ripagare debiti accumulati nei decenni."
      >
        <SpesePieChart />
      </Section>

      <Section
        title="Da dove arrivano i soldi"
        description="Più della metà delle entrate dello Stato viene dalle tasse sul reddito (IRPEF) e sui consumi (IVA) — pagate in larga parte da lavoratori dipendenti e consumatori."
      >
        <EntrateBarChart />
      </Section>

      <Section
        title="Protezione sociale"
        description="Il welfare italiano assorbe quasi il 60% della spesa corrente. Ma la stragrande maggioranza va in pensioni — sanità e assistenza ricevono molto meno."
      >
        <ProtezioneSocialeChart />
      </Section>

      <Section
        title="Italia vs Media UE"
        description="L'Italia spende molto più della media europea per interessi sul debito, ma meno per sanità e istruzione. Questo è il prezzo del debito pubblico accumulato."
      >
        <ConfrontoUeChart />
      </Section>

      <Section
        title="Come è cambiata la spesa (2019–2025)"
        description="Tutte le voci di spesa sono cresciute, ma non allo stesso ritmo. Le politiche sociali hanno visto l'aumento maggiore, spinte anche dalla pandemia."
      >
        <CrescitaSpesaChart />
      </Section>

      <Footer />
    </div>
  );
}
