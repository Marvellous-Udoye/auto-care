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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="mb-3 text-[14px] font-extrabold uppercase tracking-[0.3em] text-[#ec3042]">{eyebrow}</p> : null}
        <h1 className="text-[clamp(32px,4vw,48px)] font-extrabold leading-tight text-white">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-[15px] font-semibold leading-relaxed text-[#858585]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
