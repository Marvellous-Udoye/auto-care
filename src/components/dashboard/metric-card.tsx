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
    neutral: "bg-[#f3f6fb] text-[#111827]",
    positive: "bg-[#d9fbef] text-[#0f8a5f]",
    negative: "bg-[#ffe8ec] text-[#d92d20]",
    review: "bg-[#fff4d6] text-[#b7791f]",
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <span className={cn("inline-grid size-10 place-items-center rounded-[12px]", tones[tone])}>
            <Icon className="size-5" />
          </span>
          {hint ? <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a91a0]">{hint}</span> : null}
        </div>
        <p className="mt-6 text-[32px] font-semibold leading-none tracking-[-0.03em] text-[#111827]">{value}</p>
        <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#7b8190]">{label}</p>
      </CardContent>
    </Card>
  );
}
