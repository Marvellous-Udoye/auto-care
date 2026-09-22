"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Clipboard, Mail, MoreHorizontal, Phone, Send, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { draftResponses, feedbackRecords } from "@/constants/dashboard";

const columns = [
  { label: "Ready to Post", status: "ready_to_post", color: "bg-[#d9fbef] text-[#0f8a5f]" },
  { label: "Private Queue", status: "private_queue", color: "bg-[#fff1f2] text-[#ec3042]" },
  { label: "Manager Alerts", status: "manager_alert", color: "bg-[#ffe8ec] text-[#d92d20]" },
];

export function FeedbackQueuePage() {
  const searchParams = useSearchParams();
  const [period, setPeriod] = React.useState("Week");
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const visibleRecords = feedbackRecords.filter((record) => {
    if (!query) return true;
    return [
      record.branch_name,
      record.job_id ?? "website whatsapp",
      record.phone,
      record.raw_text,
      record.channel,
      record.status,
      record.sentiment,
    ].some((value) => value.toLowerCase().includes(query));
  });
  const selected = visibleRecords.find((record) => record.status === "manager_alert") ?? visibleRecords[0];
  const selectedDraft = selected ? draftResponses.find((draft) => draft.feedback_id === selected.id) : null;

  return (
    <div className="pt-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Feedback Queue</h1>
          <p className="mt-1 text-[13px] font-medium text-[#7b8190]">AI-scored WhatsApp replies grouped by routing outcome.</p>
        </div>
        <div className="flex rounded-full bg-white p-1 text-[12px] font-semibold text-[#7b8190]">
          {["Today", "Week", "Month"].map((tab) => (
            <button
              key={tab}
              className={`cursor-pointer rounded-full px-3 py-1 transition-colors ${tab === period ? "bg-[#fff1f2] text-[#ec3042]" : "hover:bg-[#f7f8fa] hover:text-[#111827]"}`}
              onClick={() => setPeriod(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_320px] gap-5">
        <section className="grid gap-4 lg:grid-cols-3">
          {columns.map((column) => {
            const records = visibleRecords.filter((record) => record.status === column.status);
            return (
              <div key={column.status} className="rounded-[18px] bg-white p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-[15px] font-semibold">{column.label}</h2>
                  <span className="rounded-full bg-[#f3f6fb] px-2 py-1 text-[11px] font-semibold text-[#7b8190]">{records.length}</span>
                </div>
                <div className="space-y-3">
                  {records.map((record) => (
                    <article key={record.id} className="rounded-[14px] border border-[#eef0f3] bg-[#f9fafb] p-3">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[13px] font-semibold text-[#111827]">{record.job_id ?? "Website WhatsApp"}</p>
                          <p className="text-[11px] font-medium text-[#8a91a0]">{record.branch_name}</p>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${column.color}`}>{record.sentiment}</span>
                      </div>
                      <p className="line-clamp-3 text-[12px] font-medium leading-relaxed text-[#596071]">{record.raw_text}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#7b8190]">
                        <span>{record.phone}</span>
                        <span>Severity {record.severity}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
        <aside className="rounded-[18px] bg-white p-5">
          {selected ? (
            <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold">Selected Feedback</h2>
            <MoreHorizontal className="size-5" />
          </div>
          <div className="rounded-[18px] bg-[#f7f8fa] p-5 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#ffe8ec] text-[#d92d20]">
              <AlertTriangle className="size-7" />
            </div>
            <h3 className="mt-3 text-[20px] font-semibold">{selected.branch_name}</h3>
            <Badge variant="negative" className="mt-2">{selected.status.replaceAll("_", " ")}</Badge>
          </div>
          <div className="mt-5 space-y-4 text-[13px]">
            <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">Customer Context</p>
            <p className="flex items-center gap-3"><Phone className="size-4" /> {selected.phone}</p>
            <p className="flex items-center gap-3"><Mail className="size-4" /> {selected.channel.replace("_", " ")} channel</p>
            <div className="h-px bg-[#eef0f3]" />
            <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">AI Result</p>
            <div className="grid grid-cols-[90px_1fr] gap-y-3">
              <span className="text-[#8a91a0]">Sentiment</span><span><Badge variant={selected.sentiment === "positive" ? "positive" : "negative"}>{selected.sentiment}</Badge></span>
              <span className="text-[#8a91a0]">Severity</span><span className="font-semibold">{selected.severity}/5</span>
              <span className="text-[#8a91a0]">Confidence</span><span className="font-semibold">{Math.round(selected.confidence * 100)}%</span>
              <span className="text-[#8a91a0]">Repeat</span><span className="font-semibold">{selected.is_repeat_negative ? "Yes" : "No"}</span>
            </div>
            <div className="rounded-[14px] bg-[#f9fafb] p-3">
              <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">Draft response</p>
              <p className="mt-2 text-[12px] font-medium leading-relaxed text-[#596071]">{selectedDraft?.draft_text ?? "No draft generated yet."}</p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            <Button className="h-11 w-full rounded-full bg-[#ec3042] text-white hover:bg-[#d92b3b]">
              <Send className="size-4" /> Mark as sent
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-full border-[#dce3ee] bg-white text-[#111827] hover:bg-[#f7f8fa]">
              <Clipboard className="size-4" /> Copy for publishing
            </Button>
            <Button variant="outline" className="h-11 w-full rounded-full border-[#dce3ee] bg-white text-[#111827] hover:bg-[#f7f8fa]">
              <UserRound className="size-4" /> Acknowledge alert
            </Button>
          </div>
            </>
          ) : (
            <div className="grid min-h-[360px] place-items-center text-center">
              <div>
                <SearchEmptyIcon />
                <h2 className="mt-4 text-[17px] font-semibold text-[#111827]">No feedback found</h2>
                <p className="mt-2 text-[13px] font-medium text-[#7b8190]">Try a branch, phone, job ID, or status.</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function SearchEmptyIcon() {
  return <span className="mx-auto grid size-12 place-items-center rounded-full bg-[#fff1f2] text-[#ec3042]">?</span>;
}
