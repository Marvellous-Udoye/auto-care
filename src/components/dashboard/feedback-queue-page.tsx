"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, Clipboard, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SentimentBadge, SeverityBadge } from "@/components/dashboard/status-badge";
import { useDashboardData, type FeedbackRecord, type FeedbackStatus } from "@/components/dashboard/dashboard-data-provider";

const tabs: Array<{ label: string; status: FeedbackStatus; description: string }> = [
  { label: "Ready to Post", status: "ready_to_post", description: "Positive feedback ready for public publishing." },
  { label: "Private Queue", status: "private_queue", description: "Negative non-urgent feedback for private follow-up." },
  { label: "Manager Alerts", status: "manager_alert", description: "Repeat or high-severity negative feedback." },
];

function matchesQuery(record: FeedbackRecord, query: string) {
  if (!query) return true;
  return [record.job_id ?? "website", record.phone, record.raw_text ?? "", record.status, record.channel, record.sentiment ?? ""]
    .some((value) => value.toLowerCase().includes(query));
}

export function FeedbackQueuePage() {
  const { alerts, canManage, drafts, feedback, markAlertAcknowledged, markDraftSent, updateDraft } = useDashboardData();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const [activeStatus, setActiveStatus] = React.useState<FeedbackStatus>("ready_to_post");
  const [draftEdits, setDraftEdits] = React.useState<Record<string, string>>({});
  const [message, setMessage] = React.useState<string | null>(null);

  const activeRecords = feedback
    .filter((record) => record.status === activeStatus)
    .filter((record) => matchesQuery(record, query));

  async function handleCopy(record: FeedbackRecord) {
    await navigator.clipboard.writeText(record.raw_text ?? "");
    setMessage("Copied feedback for publishing.");
  }

  async function handleDraftSave(record: FeedbackRecord) {
    await updateDraft(record.id, draftEdits[record.id] ?? drafts.find((draft) => draft.feedback_id === record.id)?.draft_text ?? "");
    setMessage("Draft updated.");
  }

  async function handleMarkSent(record: FeedbackRecord) {
    await markDraftSent(record.id);
    setMessage("Draft marked as sent.");
  }

  async function handleAcknowledge(record: FeedbackRecord) {
    const alert = alerts.find((item) => item.feedback_id === record.id);
    if (!alert) return;
    await markAlertAcknowledged(alert.id);
    setMessage("Alert acknowledged.");
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Branch queues</p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Feedback Queue</h1>
        </div>
        {message ? <Badge variant="neutral">{message}</Badge> : null}
      </div>

      <div className="mb-5 flex flex-wrap gap-2 rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-2">
        {tabs.map((tab) => {
          const count = feedback.filter((record) => record.status === tab.status).length;
          const active = activeStatus === tab.status;
          return (
            <button
              key={tab.status}
              type="button"
              className={`rounded-[12px] px-4 py-3 text-left transition-colors ${active ? "bg-[#ec3042] text-white" : "text-[#858585] hover:bg-white/[0.04] hover:text-white"}`}
              onClick={() => setActiveStatus(tab.status)}
            >
              <span className="block text-[13px] font-extrabold">{tab.label} ({count})</span>
              <span className="block text-[11px] font-semibold opacity-80">{tab.description}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4">
        {activeRecords.map((record) => {
          const draft = drafts.find((item) => item.feedback_id === record.id);
          const alert = alerts.find((item) => item.feedback_id === record.id);
          const draftValue = draftEdits[record.id] ?? draft?.draft_text ?? "";
          return (
            <article key={record.id} className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-[17px] font-extrabold text-white">{record.job_id ?? "Website feedback"}</h2>
                  <p className="mt-1 text-[13px] font-semibold text-[#858585]">{record.phone} · {record.channel.replace("_", " ")} · {record.created_at ? new Date(record.created_at).toLocaleString() : "—"}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {record.sentiment ? <SentimentBadge sentiment={record.sentiment} /> : <Badge variant="neutral">unscored</Badge>}
                  <SeverityBadge record={record} />
                  {record.is_repeat_negative ? <Badge variant="negative">repeat negative</Badge> : null}
                  {alert?.acknowledged ? <Badge variant="positive">acknowledged</Badge> : null}
                </div>
              </div>
              <p className="mt-4 rounded-[12px] bg-[#202020] p-4 text-[14px] font-semibold leading-relaxed text-[#f8f8f8]">{record.raw_text ?? "No message text."}</p>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                {activeStatus !== "ready_to_post" ? (
                  <div>
                    <p className="mb-2 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#858585]">Draft response</p>
                    <Textarea
                      disabled={!canManage}
                      value={draftValue}
                      onChange={(event) => setDraftEdits((current) => ({ ...current, [record.id]: event.target.value }))}
                      placeholder="No draft generated yet."
                    />
                  </div>
                ) : (
                  <div className="rounded-[12px] bg-[#202020] p-4">
                    <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#858585]">Publishing copy</p>
                    <p className="mt-2 text-[14px] font-semibold text-white">Copy this customer message to publish it manually.</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {activeStatus === "ready_to_post" ? (
                    <Button className="rounded-[13px] bg-[#ec3042] px-5 font-extrabold text-white hover:bg-[#d92b3b]" onClick={() => void handleCopy(record)}>
                      <Clipboard className="size-4" /> Copy for publishing
                    </Button>
                  ) : (
                    <>
                      <Button disabled={!canManage} variant="outline" className="rounded-[13px] border-[#3a3a3a] bg-transparent px-5 font-extrabold text-white hover:bg-white/[0.06]" onClick={() => void handleDraftSave(record)}>
                        <CheckCircle2 className="size-4" /> Save draft
                      </Button>
                      <Button disabled={!canManage} className="rounded-[13px] bg-[#ec3042] px-5 font-extrabold text-white hover:bg-[#d92b3b]" onClick={() => void handleMarkSent(record)}>
                        <Send className="size-4" /> Mark as sent
                      </Button>
                      {activeStatus === "manager_alert" ? (
                        <Button disabled={!canManage || alert?.acknowledged} variant="outline" className="rounded-[13px] border-[#3a3a3a] bg-transparent px-5 font-extrabold text-white hover:bg-white/[0.06]" onClick={() => void handleAcknowledge(record)}>
                          <AlertTriangle className="size-4" /> Acknowledge
                        </Button>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
        {!activeRecords.length ? (
          <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-10 text-center">
            <h2 className="text-xl font-extrabold text-white">No records in this queue</h2>
            <p className="mt-2 text-sm font-semibold text-[#858585]">New routed feedback from the automation will appear here.</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
