import { Badge } from "@/components/ui/badge";
import type { FeedbackRecord, FeedbackStatus, Sentiment } from "@/components/dashboard/dashboard-data-provider";

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  return <Badge variant={sentiment === "positive" ? "positive" : "negative"}>{sentiment}</Badge>;
}

export function StatusBadge({ status }: { status: FeedbackStatus }) {
  const variant = status === "ready_to_post" ? "positive" : status === "needs_review" ? "review" : status === "manager_alert" ? "negative" : "neutral";
  const labels: Record<FeedbackStatus, string> = {
    awaiting_reply: "Awaiting Reply",
    manager_alert: "Manager Alert",
    needs_review: "Needs Review",
    private_queue: "Private Queue",
    ready_to_post: "Ready to Post",
  };
  const label = labels[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function SeverityBadge({ record }: { record: FeedbackRecord }) {
  if (!record.severity) return <Badge variant="neutral">—</Badge>;
  const variant = record.severity >= 4 ? "negative" : record.severity === 3 ? "review" : "neutral";
  return <Badge variant={variant}>S{record.severity}</Badge>;
}
