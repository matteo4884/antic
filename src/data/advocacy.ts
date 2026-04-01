// Dati per il toolkit di advocacy fiscale

export interface LetterTemplate {
  id: string;
  titolo: string;
  oggetto: string;
  testo: string;
}

export interface FactSheet {
  id: string;
  titolo: string;
  fatti: string[];
}

export const letterTemplates: LetterTemplate[] = [
  {
    id: "patrimoniale",
    titolo: "Imposta patrimoniale",
    oggetto: "Richiesta di introduzione di un'imposta patrimoniale progressiva",
    testo: `Gentile Onorevole,

Le scrivo in qualità di cittadino/a per sollecitare una riflessione urgente sull'equità del sistema fiscale italiano e, in particolare, sull'opportunità di introdurre un'imposta patrimoniale progressiva sui grandi patrimoni.

I dati disponibili mostrano una concentrazione della ricchezza preoccupante: il 5% più ricco della popolazione detiene il 46% della ricchezza netta complessiva delle famiglie italiane. Nel frattempo, chi percepisce redditi da lavoro dipendente sopporta aliquote effettive IRPEF che raggiungono il 30-35%, mentre i grandi patrimoni scontano un'aliquota effettiva complessiva stimata intorno al 17%, grazie alla prevalenza di redditi da capitale tassati in forma sostitutiva.

Paesi a noi vicini hanno già intrapreso questa strada: la Norvegia applica un'imposta patrimoniale con aliquota dello 0,95% sui patrimoni superiori a 1,7 milioni di corone; la Spagna prevede un'imposta sul patrimonio fino all'3,5% per i grandi patrimoni, con franchigie significative a tutela del ceto medio.

Secondo stime econometriche indipendenti, un'imposta dell'1% applicata ai soli patrimoni netti superiori a 5 milioni di euro potrebbe generare un gettito annuo di circa 28 miliardi di euro — risorse sufficienti, a titolo di esempio, a finanziare 5,6 milioni di borse di studio universitarie complete.

Le chiedo pertanto di sostenere in sede parlamentare ogni iniziativa legislativa volta a introdurre un prelievo patrimoniale progressivo e strutturale, accompagnato da adeguate franchigie a protezione della ricchezza medio-bassa e da meccanismi anti-elusione efficaci.

Cordiali saluti`,
  },
  {
    id: "evasione",
    titolo: "Evasione e ottimizzazione fiscale",
    oggetto: "Contrasto all'evasione fiscale e revisione della tassazione sui capitali",
    testo: `Gentile Onorevole,

Le scrivo per portare alla Sua attenzione il tema del tax gap e dell'ottimizzazione fiscale aggressiva, fenomeni che erodono gravemente le risorse pubbliche disponibili per servizi essenziali come sanità, istruzione e previdenza.

Il Ministero dell'Economia stima il tax gap italiano in circa 80 miliardi di euro annui — una cifra che colloca l'Italia tra i Paesi europei con il maggiore divario tra imposta teorica e imposta effettivamente riscossa. A questo si aggiunge la cosiddetta "ottimizzazione fiscale": grandi patrimoni e imprese ricorrono sistematicamente a strutture holding, trust, fondazioni di famiglia e regimi agevolati per ridurre l'imponibile in misura non proporzionata rispetto a quanto accade per redditi da lavoro.

Sul versante della tassazione dei capitali, l'aliquota piatta del 26% sui capital gain appare insufficiente rispetto alle aliquote progressive che gravano sui redditi da lavoro, e crea un incentivo strutturale a trasformare reddito ordinario in reddito finanziario.

Le chiedo pertanto di sostenere:
— Una maggiore trasparenza sui beneficiari effettivi di strutture fiduciarie e holding;
— Una revisione delle norme che consentono l'ottimizzazione aggressiva del carico fiscale da parte di grandi patrimoni;
— Un rafforzamento delle risorse e dei poteri dell'Agenzia delle Entrate per il contrasto all'evasione fiscale di maggiore impatto economico;
— Una riflessione parlamentare sull'allineamento della tassazione del capitale a logiche di maggiore progressività.

Il recupero anche parziale del tax gap e la riduzione dell'ottimizzazione aggressiva potrebbero liberare risorse significative senza aumentare la pressione fiscale su chi già paga.

Cordiali saluti`,
  },
  {
    id: "confronto-ue",
    titolo: "Allineamento alla media UE",
    oggetto: "Adeguamento della spesa pubblica italiana alle medie europee in sanità ed istruzione",
    testo: `Gentile Onorevole,

Le scrivo per richiamare la Sua attenzione su un confronto che ritengo fondamentale per valutare le scelte di bilancio del nostro Paese: il divario tra la spesa pubblica italiana e quella media dei principali partner europei nei settori della sanità e dell'istruzione.

I dati Eurostat più recenti evidenziano un quadro preoccupante:
— Sanità: l'Italia destina il 6,3% del PIL alla spesa sanitaria pubblica, contro una media UE dell'8,0%. La Francia raggiunge il 12,1% del PIL. Il divario rispetto alla media europea corrisponde a circa 35 miliardi di euro annui.
— Istruzione: l'Italia spende il 3,9% del PIL in istruzione pubblica, contro una media UE del 4,6%. La Norvegia investe il 5,9% del PIL. Il divario supera i 15 miliardi di euro annui.
— Interessi sul debito: l'Italia spende il 4,6% del PIL in interessi sul debito pubblico, contro una media UE dell'1,8%. Ridurre questa voce — attraverso politiche fiscali più eque e una crescita sostenuta — libererebbe risorse enormi per investimenti produttivi.

Questi dati mostrano che la questione non è solo di spending review, ma di priorità politiche e di capacità di reperire risorse. Un sistema fiscale più equo, che riduca l'evasione e introduca una maggiore progressività sulla ricchezza, potrebbe consentire all'Italia di avvicinarsi agli standard europei in termini di qualità dei servizi pubblici.

Le chiedo di sostenere un piano pluriennale di convergenza verso le medie europee in sanità e istruzione, accompagnato da una riforma fiscale che ne garantisca la sostenibilità finanziaria.

Cordiali saluti`,
  },
];

export const factSheets: FactSheet[] = [
  {
    id: "disuguaglianza",
    titolo: "Disuguaglianza fiscale in Italia",
    fatti: [
      "Il 5% più ricco degli italiani detiene il 46% della ricchezza netta complessiva delle famiglie (Banca d'Italia, 2024).",
      "I lavoratori dipendenti con redditi medi sopportano aliquote IRPEF effettive del 30-35%, mentre i grandi patrimoni scontano un'aliquota effettiva complessiva stimata intorno al 17%.",
      "Il tax gap italiano ammonta a circa 80 miliardi di euro annui, tra i più alti in Europa in rapporto al PIL (MEF, 2024).",
      "I redditi da capitale (dividendi, capital gain, rendite finanziarie) sono tassati con aliquota piatta al 26%, indipendentemente dall'ammontare percepito.",
      "L'1% più ricco della popolazione detiene circa il 23% della ricchezza netta nazionale, una quota in crescita rispetto al decennio precedente.",
      "Le famiglie nel quintile più povero detengono in media una ricchezza netta prossima a zero o negativa, a causa di debiti e assenza di risparmi.",
    ],
  },
  {
    id: "confronto-paesi",
    titolo: "Confronto internazionale: fisco e spesa pubblica",
    fatti: [
      "Norvegia: applica un'imposta patrimoniale con aliquota dello 0,95% sui patrimoni superiori a circa 200.000 euro, con gettito superiore a 3 miliardi di euro l'anno. Spende il 5,9% del PIL in istruzione.",
      "Spagna: prevede un'imposta sul patrimonio con aliquote fino al 3,5% per i grandi patrimoni (oltre 10 milioni di euro); nel 2023 ha introdotto anche un'imposta di solidarietà temporanea sui patrimoni superiori a 3 milioni di euro.",
      "Francia: destina il 12,1% del PIL alla sanità pubblica e mantiene un sistema di imposizione patrimoniale (IFI) sugli immobili superiori a 1,3 milioni di euro.",
      "Italia: spende il 6,3% del PIL in sanità (vs media UE 8,0%), il 3,9% in istruzione (vs media UE 4,6%), e il 4,6% del PIL in soli interessi sul debito — più del doppio della media UE dell'1,8%.",
    ],
  },
  {
    id: "simulazione",
    titolo: "Simulazione: cosa renderebbe un'imposta patrimoniale",
    fatti: [
      "Un'aliquota dell'1% sui patrimoni netti superiori a 5 milioni di euro genererebbe circa 28 miliardi di euro annui, equivalenti a finanziare 5,6 milioni di borse di studio universitarie complete (stima su base Banca d'Italia 2024).",
      "Un'aliquota dello 0,5% con franchigia a 2 milioni di euro produrrebbe circa 14 miliardi di euro l'anno — sufficienti a coprire interamente il disavanzo tra la spesa sanitaria italiana e la media UE.",
      "Portare la tassazione dei capital gain da una flat tax del 26% a un'aliquota progressiva analoga all'IRPEF per i patrimoni finanziari sopra 500.000 euro potrebbe generare ulteriori 8-12 miliardi annui.",
      "Il solo recupero del 20% del tax gap stimato (80 miliardi) equivale a 16 miliardi di euro addizionali, pari all'intera spesa pubblica annua per l'università italiana.",
    ],
  },
];
