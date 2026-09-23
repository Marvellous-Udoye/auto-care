"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle, MessageCircle, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/metric-card";
import { useDashboardData, type FeedbackRecord } from "@/components/dashboard/dashboard-data-provider";

function matchesQuery(record: FeedbackRecord, query: string) {
  if (!query) return true;
  return [record.job_id ?? "website", record.phone, record.raw_text ?? "", record.status, record.channel, record.sentiment ?? ""]
    .some((value) => value.toLowerCase().includes(query));
}

export function BranchPage() {
  const { alerts, branch, feedback } = useDashboardData();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const visibleFeedback = feedback.filter((record) => matchesQuery(record, query));
  const positive = feedback.filter((record) => record.sentiment === "positive").length;
  const negative = feedback.filter((record) => record.sentiment === "negative").length;
  const total = positive + negative;
  const byDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label, day) => {
    const records = feedback.filter((record) => record.created_at && new Date(record.created_at).getDay() === day);
    return {
      label,
      positive: records.filter((record) => record.sentiment === "positive").length,
      negative: records.filter((record) => record.sentiment === "negative").length,
    };
  });

  return (
    <div>
      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Branch view</p>
        <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">{branch?.name ?? "Assigned branch"}</h1>
        <p className="mt-2 text-[14px] font-semibold text-[#858585]">{branch?.city} · {branch?.manager_email}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={MessageCircle} label="Feedback records" value={feedback.length} />
        <MetricCard icon={ThumbsUp} label="Positive sentiment" value={total ? `${Math.round((positive / total) * 100)}%` : "—"} tone="positive" />
        <MetricCard icon={AlertTriangle} label="Open manager alerts" value={alerts.filter((alert) => !alert.acknowledged).length} tone="negative" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
          <h2 className="mb-5 text-[17px] font-extrabold text-white">Sentiment trend</h2>
          <div className="flex h-64 items-end gap-4 border-b border-[#3a3a3a] pb-4">
            {byDay.map((point) => {
              const pointTotal = point.positive + point.negative;
              return (
                <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-2">
                  <div className="flex flex-col justify-end overflow-hidden rounded-t-[10px] bg-white/[0.06]" style={{ height: `${Math.max(pointTotal * 28, 36)}px` }}>
                    <span className="block bg-[#22c55e]" style={{ height: pointTotal ? `${(point.positive / pointTotal) * 100}%` : "0%" }} />
                    <span className="block bg-[#ec3042]" style={{ height: pointTotal ? `${(point.negative / pointTotal) * 100}%` : "0%" }} />
                  </div>
                  <span className="text-center text-[11px] font-semibold text-[#858585]">{point.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <Badge variant="positive">positive</Badge>
            <Badge variant="negative">negative</Badge>
          </div>
        </section>
        <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
          <h2 className="text-[17px] font-extrabold text-white">Recent branch feedback</h2>
          <div className="mt-5 space-y-3">
            {visibleFeedback.slice(0, 8).map((record) => (
              <div key={record.id} className="rounded-[12px] bg-[#202020] p-3">
                <p className="line-clamp-2 text-[13px] font-semibold leading-relaxed text-[#f8f8f8]">{record.raw_text ?? "No message text."}</p>
                <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#858585]">{record.status.replaceAll("_", " ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
