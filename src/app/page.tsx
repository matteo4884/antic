"use client";

import { useState } from "react";
import Act1Income from "@/components/home/Act1Income";
import Act2Comparison from "@/components/home/Act2Comparison";

export default function Home() {
  const [income, setIncome] = useState(0);

  return (
    <main>
      <Act1Income onIncomeSet={setIncome} />
      {income > 0 && <Act2Comparison income={income} />}
    </main>
  );
}
