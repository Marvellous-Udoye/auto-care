"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ClipboardList, MessageSquareText, Send, ShieldAlert, ThumbsDown, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, SentimentBadge, SeverityBadge } from "@/components/dashboard/status-badge";
import { useDashboardData, type FeedbackRecord } from "@/components/dashboard/dashboard-data-provider";

function matchesQuery(record: FeedbackRecord, query: string) {
  if (!query) return true;
  return [record.job_id ?? "website", record.phone, record.raw_text ?? "", record.status, record.channel, record.sentiment ?? ""]
    .some((value) => value.toLowerCase().includes(query));
}

export function OverviewPage() {
  const { alerts, branch, drafts, feedback } = useDashboardData();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const visibleFeedback = feedback.filter((record) => matchesQuery(record, query));
  const today = new Date().toISOString().slice(0, 10);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const scored = feedback.filter((record) => record.sentiment);
  const positive = scored.filter((record) => record.sentiment === "positive").length;
  const negative = scored.filter((record) => record.sentiment === "negative").length;
  const totalScored = positive + negative;
  const openAlerts = alerts.filter((alert) => !alert.acknowledged).length;
  const pendingDrafts = drafts.filter((draft) => !draft.sent).length;
  const needsReview = feedback.filter((record) => record.status === "needs_review").length;
  const privateQueue = feedback.filter((record) => record.status === "private_queue").length;
  const readyToPost = feedback.filter((record) => record.status === "ready_to_post").length;
  const urgentFeedback = visibleFeedback
    .filter((record) => record.status === "manager_alert" || (record.severity ?? 0) >= 4 || record.is_repeat_negative)
    .slice(0, 3);

  const cards = [
    { label: "Open alerts", value: openAlerts, hint: "Needs manager attention", icon: AlertTriangle, tone: "danger" },
    { label: "Pending drafts", value: pendingDrafts, hint: `${privateQueue} private follow-ups`, icon: Send, tone: "primary" },
    { label: "Needs review", value: needsReview, hint: "Human judgment required", icon: ShieldAlert, tone: "review" },
    {
      label: "Positive rate",
      value: totalScored ? `${Math.round((positive / totalScored) * 100)}%` : "-",
      hint: `${positive} positive / ${negative} negative`,
      icon: positive >= negative ? ThumbsUp : ThumbsDown,
      tone: "neutral",
    },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Branch dashboard</p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Customer Experience Command Center</h1>
          <p className="mt-2 text-[14px] font-semibold text-[#858585]">
            {branch?.name ?? "Assigned branch"} · {feedback.filter((record) => record.created_at?.startsWith(today)).length} feedback today · {feedback.filter((record) => new Date(record.created_at ?? 0).getTime() >= weekAgo).length} this week
          </p>
        </div>
        <Link href="/dashboard/job-complete" className="inline-flex h-11 items-center rounded-[13px] bg-[#ec3042] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#d92b3b]">
          Complete a job
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <section key={card.label} className={`rounded-[14px] border p-5 ${card.tone === "danger" && openAlerts ? "border-[#ec3042]/50 bg-[#ec3042]/10" : "border-[#3a3a3a] bg-[#292929]"}`}>
              <div className="flex items-start justify-between gap-3">
                <span className={`grid size-10 place-items-center rounded-[12px] ${card.tone === "primary" ? "bg-[#ec3042] text-white" : card.tone === "danger" ? "bg-[#ec3042] text-white" : card.tone === "review" ? "bg-[#f59e0b]/15 text-[#f59e0b]" : "bg-white/[0.06] text-white"}`}>
                  <Icon className="size-5" />
                </span>
                <span className="text-right text-[11px] font-semibold text-[#858585]">{card.hint}</span>
              </div>
              <p className="mt-6 text-[34px] font-extrabold leading-none text-white">{card.value}</p>
              <p className="mt-2 text-[13px] font-semibold text-[#858585]">{card.label}</p>
            </section>
          );
        })}
      </div>

      <section className="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-white">
                <AlertTriangle className="size-5 text-[#ec3042]" /> What needs attention
              </h2>
              <p className="mt-1 text-[13px] font-semibold text-[#858585]">Urgent and high-severity customer experience issues.</p>
            </div>
            <Button asChild className="h-10 rounded-[12px] bg-[#ec3042] px-4 text-[12px] font-extrabold text-white hover:bg-[#d92b3b]">
              <Link href="/dashboard/feedback">Open queues</Link>
            </Button>
          </div>
          <div className="grid gap-3">
            {urgentFeedback.map((record) => (
              <Link key={record.id} href="/dashboard/feedback" className="rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-4 transition hover:border-[#ec3042]/60">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[14px] font-extrabold text-white">{record.job_id ?? "Website message"}</p>
                  <div className="flex gap-2">
                    <SeverityBadge record={record} />
                    <StatusBadge status={record.status} />
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-[13px] font-semibold leading-relaxed text-[#cfcfcf]">{record.raw_text ?? "No customer message."}</p>
                <p className="mt-2 text-[12px] font-semibold text-[#858585]">{record.phone} · {record.created_at ? new Date(record.created_at).toLocaleString() : "-"}</p>
              </Link>
            ))}
            {!urgentFeedback.length ? (
              <div className="rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-5">
                <p className="text-[15px] font-extrabold text-white">No urgent feedback</p>
                <p className="mt-1 text-[13px] font-semibold text-[#858585]">Your branch has no unresolved high-severity feedback.</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
          <h2 className="text-[17px] font-extrabold text-white">Recommended next actions</h2>
          <div className="mt-4 grid gap-3">
            <Link href="/dashboard/feedback" className="rounded-[12px] bg-[#202020] p-4 transition hover:bg-white/[0.05]">
              <p className="text-[14px] font-extrabold text-white">Handle pending responses</p>
              <p className="mt-1 text-[12px] font-semibold text-[#858585]">{pendingDrafts} draft response{pendingDrafts === 1 ? "" : "s"} waiting.</p>
            </Link>
            <Link href="/dashboard/review" className="rounded-[12px] bg-[#202020] p-4 transition hover:bg-white/[0.05]">
              <p className="text-[14px] font-extrabold text-white">Review uncertain feedback</p>
              <p className="mt-1 text-[12px] font-semibold text-[#858585]">{needsReview} message{needsReview === 1 ? "" : "s"} need human routing.</p>
            </Link>
            <Link href="/dashboard/feedback" className="rounded-[12px] bg-[#202020] p-4 transition hover:bg-white/[0.05]">
              <p className="text-[14px] font-extrabold text-white">Publish positive feedback</p>
              <p className="mt-1 text-[12px] font-semibold text-[#858585]">{readyToPost} positive message{readyToPost === 1 ? "" : "s"} ready to copy.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-white">
              <ClipboardList className="size-5 text-[#ec3042]" /> Recent feedback
            </h2>
            <p className="mt-1 text-[13px] font-semibold text-[#858585]">Latest customer messages for this branch.</p>
          </div>
          {query ? <Badge variant="neutral">Filtered by "{query}"</Badge> : null}
        </div>
        {visibleFeedback.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Feedback</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleFeedback.slice(0, 10).map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <p className="font-extrabold text-white">{record.job_id ?? "Website message"}</p>
                    <p className="max-w-[420px] truncate text-[12px] text-[#858585]">{record.raw_text ?? record.phone}</p>
                  </TableCell>
                  <TableCell>{record.sentiment ? <SentimentBadge sentiment={record.sentiment} /> : <Badge variant="neutral">unscored</Badge>}</TableCell>
                  <TableCell><SeverityBadge record={record} /></TableCell>
                  <TableCell><StatusBadge status={record.status} /></TableCell>
                  <TableCell><Badge variant="neutral">{record.channel.replace("_", " ")}</Badge></TableCell>
                  <TableCell>{record.created_at ? new Date(record.created_at).toLocaleString() : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-[12px] bg-[#202020] p-8 text-center">
            <MessageSquareText className="mx-auto mb-3 size-7 text-[#858585]" />
            <h3 className="text-lg font-extrabold text-white">No feedback yet</h3>
            <p className="mt-2 text-sm font-semibold text-[#858585]">Completed jobs and website messages will appear here after customers reply.</p>
          </div>
        )}
      </section>
    </div>
  );
}
