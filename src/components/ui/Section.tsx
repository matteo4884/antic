export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 md:p-8">
      <h2 className="text-2xl font-bold text-zinc-100">{title}</h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
      <div className="mt-6">{children}</div>
    </section>
  );
}
