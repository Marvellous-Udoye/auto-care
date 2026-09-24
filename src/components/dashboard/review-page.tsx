"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ShieldQuestion } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { useDashboardData, type FeedbackRecord, type Sentiment } from "@/components/dashboard/dashboard-data-provider";

function matchesQuery(record: FeedbackRecord, query: string) {
  if (!query) return true;
  return [record.job_id ?? "website", record.phone, record.raw_text ?? "", record.channel]
    .some((value) => value.toLowerCase().includes(query));
}

export function ReviewPage() {
  const { canManage, feedback, routeReview } = useDashboardData();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const reviewItems = feedback.filter((record) => record.status === "needs_review").filter((record) => matchesQuery(record, query));
  const [overrides, setOverrides] = React.useState<Record<string, { sentiment: Sentiment; severity: 1 | 2 | 3 | 4 | 5 }>>({});
  const [message, setMessage] = React.useState<string | null>(null);

  async function handleRoute(record: FeedbackRecord) {
    const override = overrides[record.id] ?? {
      sentiment: record.sentiment ?? "negative",
      severity: (record.severity ?? 3) as 1 | 2 | 3 | 4 | 5,
    };
    try {
      await routeReview(record.id, override);
      setMessage("Feedback routed.");
      toast.success("Feedback routed", {
        description: `Moved to the ${override.sentiment === "positive" ? "ready-to-post" : override.severity >= 4 ? "manager alerts" : "private queue"} workflow.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unable to route feedback.";
      toast.error("Routing failed", { description: errorMessage });
    }
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Confidence gate</p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Needs Review</h1>
          <p className="mt-2 text-[14px] font-semibold text-[#858585]">Low-confidence AI results waiting for human routing.</p>
        </div>
        {message ? <Badge variant="positive">{message}</Badge> : null}
      </div>

      <div className="grid gap-4">
        {reviewItems.map((record) => {
          const selected = overrides[record.id] ?? {
            sentiment: record.sentiment ?? "negative",
            severity: (record.severity ?? 3) as 1 | 2 | 3 | 4 | 5,
          };
          return (
            <article key={record.id} className="grid gap-5 rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5 xl:grid-cols-[1fr_320px]">
              <div>
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[17px] font-extrabold text-white">{record.job_id ?? "Website message"}</h2>
                    <p className="mt-1 text-[13px] font-semibold text-[#858585]">
                      {record.phone} · {record.channel.replace("_", " ")} · {Math.round((record.confidence ?? 0) * 100)}% confidence
                    </p>
                  </div>
                  <Badge variant="review">needs review</Badge>
                </div>
                <p className="rounded-[12px] bg-[#202020] p-4 text-[16px] font-semibold leading-relaxed text-white">
                  {record.raw_text ?? "No message text."}
                </p>
              </div>
              <aside className="rounded-[12px] bg-[#202020] p-5">
                <ShieldQuestion className="mb-4 size-7 text-[#ec3042]" />
                <h3 className="text-lg font-extrabold text-white">Manual override</h3>
                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#858585]">Sentiment</p>
                    <Select
                      disabled={!canManage}
                      value={selected.sentiment}
                      onValueChange={(sentiment: Sentiment) => setOverrides((current) => ({ ...current, [record.id]: { ...selected, sentiment } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#858585]">Severity</p>
                    <Select
                      disabled={!canManage}
                      value={String(selected.severity)}
                      onValueChange={(severity) => setOverrides((current) => ({ ...current, [record.id]: { ...selected, severity: Number(severity) as 1 | 2 | 3 | 4 | 5 } }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <SelectItem key={item} value={String(item)}>Severity {item}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button disabled={!canManage} className="h-11 rounded-[13px] bg-[#ec3042] font-extrabold text-white hover:bg-[#d92b3b]" onClick={() => void handleRoute(record)}>
                    <CheckCircle2 className="size-4" /> Route feedback
                  </Button>
                  {!canManage ? <p className="text-[12px] font-semibold text-[#858585]">Staff can view needs-review items, but managers route them.</p> : null}
                </div>
              </aside>
            </article>
          );
        })}
        {!reviewItems.length ? (
          <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-10 text-center">
            <h2 className="text-xl font-extrabold text-white">No feedback needs review</h2>
            <p className="mt-2 text-sm font-semibold text-[#858585]">Low-confidence messages will appear here.</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
