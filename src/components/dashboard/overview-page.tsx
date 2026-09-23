"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ClipboardList, MessageSquareText, Send, ThumbsDown, ThumbsUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge, SentimentBadge, SeverityBadge } from "@/components/dashboard/status-badge";
import { useDashboardData, type FeedbackRecord } from "@/components/dashboard/dashboard-data-provider";

function matchesQuery(record: FeedbackRecord, query: string) {
  if (!query) return true;
  return [record.job_id ?? "website", record.phone, record.raw_text ?? "", record.status, record.channel, record.sentiment ?? ""]
    .some((value) => value.toLowerCase().includes(query));
}

export function OverviewPage() {
  const { alerts, drafts, feedback } = useDashboardData();
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

  const cards = [
    {
      label: "Feedback today",
      value: feedback.filter((record) => record.created_at?.startsWith(today)).length,
      hint: `${feedback.filter((record) => new Date(record.created_at ?? 0).getTime() >= weekAgo).length} this week`,
      icon: MessageSquareText,
      tone: "primary",
    },
    {
      label: "Positive / negative",
      value: totalScored ? `${Math.round((positive / totalScored) * 100)}%` : "—",
      hint: `${positive} positive · ${negative} negative`,
      icon: positive >= negative ? ThumbsUp : ThumbsDown,
      tone: "neutral",
    },
    {
      label: "Open alerts",
      value: openAlerts,
      hint: "Manager attention",
      icon: AlertTriangle,
      tone: "danger",
    },
    {
      label: "Pending drafts",
      value: pendingDrafts,
      hint: "Awaiting manager action",
      icon: Send,
      tone: "neutral",
    },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Branch dashboard</p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Feedback Intelligence</h1>
        </div>
        <Link href="/dashboard/job-complete" className="inline-flex h-11 items-center rounded-[13px] bg-[#ec3042] px-5 text-[13px] font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#d92b3b]">
          Complete a job
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <section key={card.label} className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
              <div className="flex items-start justify-between">
                <span className={`grid size-10 place-items-center rounded-[12px] ${card.tone === "primary" ? "bg-[#ec3042] text-white" : card.tone === "danger" ? "bg-[#ec30421f] text-[#ec3042]" : "bg-white/[0.06] text-white"}`}>
                  <Icon className="size-5" />
                </span>
                <span className="text-[11px] font-semibold text-[#858585]">{card.hint}</span>
              </div>
              <p className="mt-6 text-[34px] font-extrabold leading-none text-white">{card.value}</p>
              <p className="mt-2 text-[13px] font-semibold text-[#858585]">{card.label}</p>
            </section>
          );
        })}
      </div>

      <section className="mt-5 rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-[17px] font-extrabold text-white">
              <ClipboardList className="size-5 text-[#ec3042]" /> Latest feedback
            </h2>
            <p className="mt-1 text-[13px] font-semibold text-[#858585]">Live records from this branch.</p>
          </div>
          {query ? <Badge variant="neutral">Filtered by “{query}”</Badge> : null}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleFeedback.slice(0, 10).map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <p className="font-extrabold text-white">{record.job_id ?? "Website message"}</p>
                  <p className="text-[12px] text-[#858585]">{record.phone}</p>
                </TableCell>
                <TableCell>{record.sentiment ? <SentimentBadge sentiment={record.sentiment} /> : <Badge variant="neutral">unscored</Badge>}</TableCell>
                <TableCell><SeverityBadge record={record} /></TableCell>
                <TableCell><StatusBadge status={record.status} /></TableCell>
                <TableCell><Badge variant="neutral">{record.channel.replace("_", " ")}</Badge></TableCell>
                <TableCell>{record.created_at ? new Date(record.created_at).toLocaleString() : "—"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
