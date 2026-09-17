import { AlertTriangle, ClipboardCheck, MessageCircle, ThumbsUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { FeedbackTable } from "@/components/dashboard/feedback-table";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { getDashboardContext, getSummaryMetrics } from "@/services/dashboard-service";

export function OverviewPage() {
  const { feedback } = getDashboardContext();
  const metrics = getSummaryMetrics();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Dashboard"
        title="Reputation Intelligence"
        description="Monitor every customer reply, AI routing outcome, draft response, and manager escalation across AutoCare branches."
      />
      <FilterBar />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={MessageCircle} label="Feedback today / week" value={`${metrics.totalToday}/${metrics.totalWeek}`} hint="live queue" />
        <MetricCard icon={ThumbsUp} label="Positive vs negative" value={`${metrics.positivePercent}% / ${metrics.negativePercent}%`} tone="positive" />
        <MetricCard icon={AlertTriangle} label="Open manager alerts" value={metrics.openAlerts} tone="negative" />
        <MetricCard icon={ClipboardCheck} label="Pending drafts" value={metrics.pendingDrafts} tone="review" />
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Latest feedback</CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <FeedbackTable records={feedback} />
        </CardContent>
      </Card>
    </div>
  );
}
