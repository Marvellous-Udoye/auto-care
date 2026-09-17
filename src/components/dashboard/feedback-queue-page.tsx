"use client";

import * as React from "react";
import { Check, Clipboard, Send } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { SentimentBadge, SeverityBadge } from "@/components/dashboard/status-badge";
import { alerts, currentDashboardUser, draftResponses, feedbackRecords, type FeedbackRecord, type FeedbackStatus } from "@/constants/dashboard";
import { canWrite } from "@/lib/dashboard/access";

const queueTabs: { value: FeedbackStatus; label: string }[] = [
  { value: "ready_to_post", label: "Ready to Post" },
  { value: "private_queue", label: "Private Queue" },
  { value: "manager_alert", label: "Manager Alerts" },
];

function QueueRow({ record }: { record: FeedbackRecord }) {
  const draft = draftResponses.find((item) => item.feedback_id === record.id);
  const alert = alerts.find((item) => item.feedback_id === record.id);
  const [draftText, setDraftText] = React.useState(draft?.draft_text ?? "");
  const [sent, setSent] = React.useState(Boolean(draft?.sent));
  const [acknowledged, setAcknowledged] = React.useState(Boolean(alert?.acknowledged));
  const writable = canWrite(currentDashboardUser);

  return (
    <details className="group rounded-[14px] border border-[#3a3a3a] bg-[#030303] p-4">
      <summary className="grid cursor-pointer list-none gap-4 md:grid-cols-[1.1fr_0.7fr_0.6fr_auto] md:items-center">
        <div>
          <p className="text-[15px] font-extrabold text-white">{record.branch_name}</p>
          <p className="mt-1 line-clamp-1 text-[13px] font-semibold text-[#858585]">{record.raw_text}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SentimentBadge sentiment={record.sentiment} />
          <SeverityBadge record={record} />
          {record.is_repeat_negative ? <Badge variant="negative">repeat</Badge> : null}
        </div>
        <p className="text-[12px] font-semibold text-[#858585]">
          Confidence <span className="font-extrabold text-white">{Math.round(record.confidence * 100)}%</span>
        </p>
        <span className="text-[13px] font-extrabold text-[#ec3042] group-open:hidden">Expand</span>
      </summary>
      <div className="mt-5 grid gap-5 border-t border-[#3a3a3a] pt-5 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#858585]">Customer message</p>
          <p className="mt-3 rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-4 text-[14px] font-semibold leading-relaxed text-[#d8d8d8]">{record.raw_text}</p>
          <div className="mt-4 grid gap-2 text-[12px] font-semibold text-[#858585] sm:grid-cols-2">
            <span>Phone: <b className="text-white">{record.phone}</b></span>
            <span>Channel: <b className="text-white">{record.channel.replace("_", " ")}</b></span>
            <span>Job: <b className="text-white">{record.job_id ?? "Website"}</b></span>
            <span>Created: <b className="text-white">{new Date(record.created_at).toLocaleString()}</b></span>
          </div>
        </div>
        <div>
          <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#858585]">AI-drafted response</p>
          <Textarea className="mt-3" value={draftText} onChange={(event) => setDraftText(event.target.value)} disabled={!writable} />
          <div className="mt-4 flex flex-wrap gap-3">
            {record.status === "ready_to_post" ? (
              <Button disabled={!writable} className="rounded-[12px] bg-[#ec3042] font-extrabold text-white hover:bg-[#ec3042]/90" onClick={() => navigator.clipboard?.writeText(draftText)}>
                <Clipboard className="size-4" /> Copy for publishing
              </Button>
            ) : null}
            <Button disabled={!writable || sent} variant="outline" className="rounded-[12px] border-[#3a3a3a] bg-transparent text-white hover:bg-white/[0.04]" onClick={() => setSent(true)}>
              <Send className="size-4" /> {sent ? "Sent" : "Mark as sent"}
            </Button>
            {record.status === "manager_alert" ? (
              <Button disabled={!writable || acknowledged} variant="outline" className="rounded-[12px] border-[#3a3a3a] bg-transparent text-white hover:bg-white/[0.04]" onClick={() => setAcknowledged(true)}>
                <Check className="size-4" /> {acknowledged ? "Acknowledged" : "Acknowledge"}
              </Button>
            ) : null}
          </div>
          {record.status === "manager_alert" ? (
            <p className="mt-3 text-[12px] font-semibold text-[#858585]">
              {acknowledged ? `Acknowledged by ${alert?.acknowledged_by ?? currentDashboardUser.name}` : "Awaiting manager acknowledgement"}
            </p>
          ) : null}
        </div>
      </div>
    </details>
  );
}

export function FeedbackQueuePage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Queues"
        title="Feedback Detail"
        description="Review routed feedback, edit AI drafted replies, copy positive reviews for publishing, and acknowledge urgent alerts."
      />
      <Tabs defaultValue="ready_to_post">
        <TabsList className="flex w-full flex-wrap justify-start md:w-auto">
          {queueTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
          ))}
        </TabsList>
        {queueTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="grid gap-4">
              {feedbackRecords.filter((record) => record.status === tab.value).map((record) => (
                <QueueRow key={record.id} record={record} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
