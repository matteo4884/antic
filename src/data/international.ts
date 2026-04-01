// Country comparison data
// Sources: OECD Government at a Glance 2025, Eurostat, national tax authorities

export interface CountryData {
  nome: string;
  codice: string;
  wealthTax: {
    hasIt: boolean;
    description: string;
    rate: string;
  };
  effectiveTopRate: number;
  healthSpendingPctGdp: number;
  educationSpendingPctGdp: number;
  healthIndex: number;
  educationIndex: number;
  giniIndex: number;
}

export const countries: CountryData[] = [
  {
    nome: "Italia",
    codice: "IT",
    wealthTax: {
      hasIt: false,
      description:
        "Nessuna imposta patrimoniale generale. IVIE e IVAFE solo su patrimoni esteri.",
      rate: "0%",
    },
    effectiveTopRate: 17,
    healthSpendingPctGdp: 6.3,
    educationSpendingPctGdp: 3.9,
    healthIndex: 67,
    educationIndex: 56,
    giniIndex: 32.8,
  },
  {
    nome: "Norvegia",
    codice: "NO",
    wealthTax: {
      hasIt: true,
      description:
        "Imposta patrimoniale progressiva su patrimoni netti sopra ~€150.000.",
      rate: "0.95% – 1.1%",
    },
    effectiveTopRate: 47,
    healthSpendingPctGdp: 11.4,
    educationSpendingPctGdp: 5.9,
    healthIndex: 83,
    educationIndex: 75,
    giniIndex: 25.3,
  },
  {
    nome: "Spagna",
    codice: "ES",
    wealthTax: {
      hasIt: true,
      description:
        "Imposta di Solidarietà sui Grandi Patrimoni: 1.7% - 3.5% sopra €3M.",
      rate: "1.7% – 3.5%",
    },
    effectiveTopRate: 40,
    healthSpendingPctGdp: 7.3,
    educationSpendingPctGdp: 4.3,
    healthIndex: 72,
    educationIndex: 60,
    giniIndex: 32.0,
  },
  {
    nome: "Francia",
    codice: "FR",
    wealthTax: {
      hasIt: true,
      description:
        "IFI (Impôt sur la Fortune Immobilière): tassa sui patrimoni immobiliari sopra €1.3M.",
      rate: "0.5% – 1.5%",
    },
    effectiveTopRate: 45,
    healthSpendingPctGdp: 12.1,
    educationSpendingPctGdp: 5.5,
    healthIndex: 79,
    educationIndex: 63,
    giniIndex: 30.5,
  },
  {
    nome: "Germania",
    codice: "DE",
    wealthTax: {
      hasIt: false,
      description:
        "Sospesa dal 1997, ma il dibattito per reintrodurla è attivo.",
      rate: "0% (sospesa)",
    },
    effectiveTopRate: 45,
    healthSpendingPctGdp: 12.7,
    educationSpendingPctGdp: 4.7,
    healthIndex: 78,
    educationIndex: 66,
    giniIndex: 29.7,
  },
];

export const italyHighlight = {
  interestOnDebtPctGdp: 4.6,
  avgEuInterestPctGdp: 1.8,
  publicDebtPctGdp: 137,
  avgEuDebtPctGdp: 82,
};
