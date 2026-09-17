import { Badge } from "@/components/ui/badge";
import type { FeedbackRecord, FeedbackStatus, Sentiment } from "@/constants/dashboard";

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  return <Badge variant={sentiment === "positive" ? "positive" : "negative"}>{sentiment}</Badge>;
}

export function StatusBadge({ status }: { status: FeedbackStatus }) {
  const variant = status === "ready_to_post" ? "positive" : status === "needs_review" ? "review" : status === "manager_alert" ? "negative" : "neutral";
  const label = status.replaceAll("_", " ");
  return <Badge variant={variant}>{label}</Badge>;
}

export function SeverityBadge({ record }: { record: FeedbackRecord }) {
  const variant = record.severity >= 4 ? "negative" : record.severity === 3 ? "review" : "neutral";
  return <Badge variant={variant}>S{record.severity}</Badge>;
}
