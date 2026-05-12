export function DashboardPageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent sm:text-sm sm:tracking-[0.2em]">Dashboard MIDIGI</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[40px]">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
