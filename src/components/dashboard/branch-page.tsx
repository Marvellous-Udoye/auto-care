import { AlertTriangle, MessageCircle, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/dashboard/metric-card";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { branches, feedbackRecords, sentimentTrend } from "@/constants/dashboard";
import { getSummaryMetrics } from "@/services/dashboard-service";

export function BranchPage() {
  const activeBranch = branches[0];
  const metrics = getSummaryMetrics(activeBranch.id);
  const branchFeedback = feedbackRecords.filter((record) => record.branch_id === activeBranch.id);

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Branch view"
        title="Branch Reputation Health"
        description="Review sentiment, alert volume, and feedback patterns for a single AutoCare location."
        actions={
          <Select defaultValue={activeBranch.id}>
            <SelectTrigger className="min-w-64">
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
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader>
            <CardTitle>Sentiment trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-72 items-end gap-4 border-b border-[#3a3a3a] pb-4">
              {sentimentTrend.map((point) => {
                const total = point.positive + point.negative;
                return (
                  <div key={point.label} className="flex h-full flex-1 flex-col justify-end gap-1">
                    <div className="flex flex-col justify-end overflow-hidden rounded-t-[10px] bg-white/[0.04]" style={{ height: `${Math.max(total * 7, 48)}px` }}>
                      <span className="block bg-emerald-400/80" style={{ height: `${(point.positive / total) * 100}%` }} />
                      <span className="block bg-[#ec3042]" style={{ height: `${(point.negative / total) * 100}%` }} />
                    </div>
                    <span className="text-center text-[11px] font-extrabold text-[#858585]">{point.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex gap-3">
              <Badge variant="positive">positive</Badge>
              <Badge variant="negative">negative</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{activeBranch.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[14px] font-semibold leading-relaxed text-[#858585]">
              {activeBranch.city} branch feedback is routed through the same AI scoring and manager alert rules used across AutoCare.
            </p>
            <div className="mt-5 space-y-3">
              {branchFeedback.map((record) => (
                <div key={record.id} className="rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-3">
                  <p className="line-clamp-2 text-[13px] font-semibold leading-relaxed text-[#d8d8d8]">{record.raw_text}</p>
                  <p className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#858585]">{record.status.replaceAll("_", " ")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
