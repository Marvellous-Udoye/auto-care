import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  tone = "neutral",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  hint?: string;
  tone?: "neutral" | "positive" | "negative" | "review";
}) {
  const tones = {
    neutral: "bg-white/[0.04] text-[#858585]",
    positive: "bg-emerald-400/10 text-emerald-300",
    negative: "bg-[#ec3042]/12 text-[#ff6b78]",
    review: "bg-amber-300/10 text-amber-200",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className={cn("inline-grid size-10 place-items-center rounded-[12px]", tones[tone])}>
            <Icon className="size-5" />
          </span>
          {hint ? <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#858585]">{hint}</span> : null}
        </div>
        <p className="mt-5 text-[34px] font-extrabold leading-none text-white">{value}</p>
        <p className="mt-2 text-[13px] font-semibold text-[#858585]">{label}</p>
      </CardContent>
    </Card>
  );
}
