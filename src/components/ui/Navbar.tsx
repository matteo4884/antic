"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/bilancio", label: "Bilancio" },
  { href: "/confronto", label: "Confronto" },
  { href: "/simulatore", label: "Simulatore" },
  { href: "/mondo", label: "Nel mondo" },
  { href: "/agisci", label: "Agisci" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-3 md:px-8">
        <Link
          href="/"
          className="mr-4 text-lg font-bold tracking-tight text-zinc-100"
        >
          Antic
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm transition-colors ${
              pathname === l.href
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
