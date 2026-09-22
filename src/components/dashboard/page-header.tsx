import type { ReactNode } from "react";

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7b8190]">{eyebrow}</p>
        ) : null}
        <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[#111827]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-[13px] font-medium leading-relaxed text-[#7b8190]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
