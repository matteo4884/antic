"use client";

import { useState } from "react";
import Act1Income from "@/components/home/Act1Income";
import Act2Comparison from "@/components/home/Act2Comparison";
import Act3Budget from "@/components/home/Act3Budget";
import Act4International from "@/components/home/Act4International";
import Act5Action from "@/components/home/Act5Action";

export default function Home() {
  const [income, setIncome] = useState(0);

  return (
    <main>
      <Act1Income onIncomeSet={setIncome} />
      {income > 0 && <Act2Comparison income={income} />}
      <Act3Budget />
      <Act4International />
      <Act5Action />
    </main>
  );
}
