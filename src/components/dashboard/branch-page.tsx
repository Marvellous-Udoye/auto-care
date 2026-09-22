"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle, MessageCircle, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { branches, feedbackRecords, sentimentTrend } from "@/constants/dashboard";
import { getSummaryMetrics } from "@/services/dashboard-service";

export function BranchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const activeBranch = branches[0];
  const metrics = getSummaryMetrics(activeBranch.id);
  const branchFeedback = feedbackRecords
    .filter((record) => record.branch_id === activeBranch.id)
    .filter((record) => {
      if (!query) return true;
      return [record.branch_name, record.phone, record.job_id ?? "website message", record.raw_text, record.status, record.sentiment]
        .some((value) => value.toLowerCase().includes(query));
    });

  return (
    <div className="pt-5">
      <DashboardPageHeader
        eyebrow="Branch intelligence"
        title="Branch Performance"
        description="A branch-level view of feedback volume, sentiment, and urgent recovery work."
        actions={
          <Select defaultValue={activeBranch.id}>
            <SelectTrigger className="min-w-56 rounded-full bg-white">
              <SelectValue placeholder="Choose branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard icon={MessageCircle} label="Feedback this week" value={metrics.totalWeek} />
        <MetricCard icon={ThumbsUp} label="Positive sentiment" value={`${metrics.positivePercent}%`} tone="positive" />
        <MetricCard icon={AlertTriangle} label="Manager alerts" value={metrics.openAlerts} tone="negative" />
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <section className="rounded-[18px] bg-white p-5">
          <h2 className="mb-5 text-[15px] font-semibold text-[#111827]">Sentiment trend</h2>
          <div className="flex h-64 items-end gap-4 border-b border-[#eef0f3] pb-4">
            {sentimentTrend.map((point) => {
              const total = point.positive + point.negative;
              return (
                <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-2">
                  <div className="flex flex-col justify-end overflow-hidden rounded-t-[10px] bg-[#eef0f4]" style={{ height: `${Math.max(total * 7, 48)}px` }}>
                    <span className="block bg-[#ec3042]" style={{ height: `${(point.positive / total) * 100}%` }} />
                    <span className="block bg-[#ff5a70]" style={{ height: `${(point.negative / total) * 100}%` }} />
                  </div>
                  <span className="text-center text-[11px] font-semibold text-[#7b8190]">{point.label}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <Badge variant="default">positive</Badge>
            <Badge variant="negative">negative</Badge>
          </div>
        </section>
        <section className="rounded-[18px] bg-white p-5">
          <h2 className="text-[15px] font-semibold text-[#111827]">{activeBranch.name}</h2>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#7b8190]">
            {activeBranch.city} feedback is routed through the same AI scoring, repeat-customer checks, and escalation rules used across AutoCare.
          </p>
          <div className="mt-5 space-y-3">
            {branchFeedback.map((record) => (
              <div key={record.id} className="rounded-[14px] border border-[#eef0f3] bg-[#f9fafb] p-3">
                <p className="line-clamp-2 text-[13px] font-medium leading-relaxed text-[#111827]">{record.raw_text}</p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8a91a0]">{record.status.replaceAll("_", " ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
