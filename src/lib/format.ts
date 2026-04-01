export function formatEuro(n: number): string {
  return n.toLocaleString("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `€${(n / 1_000_000_000).toFixed(1)} mld`;
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)} mln`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(1)}k`;
  return formatEuro(n);
}
