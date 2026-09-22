"use client";

import { useSearchParams } from "next/navigation";
import { AlertTriangle, CheckCircle2, MessageSquareText, Save, ShieldQuestion } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { feedbackRecords } from "@/constants/dashboard";

export function ReviewPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const reviewItems = feedbackRecords
    .filter((record) => record.status === "needs_review")
    .filter((record) => {
      if (!query) return true;
      return [record.branch_name, record.phone, record.job_id ?? "website message", record.raw_text, record.channel]
        .some((value) => value.toLowerCase().includes(query));
    });
  const activeRecord = reviewItems[0];

  return (
    <div className="pt-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7b8190]">Confidence gate</p>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111827]">Needs Review</h1>
        </div>
      </div>

      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <section className="rounded-[16px] bg-white p-5">
          <ShieldQuestion className="mb-4 size-5 text-[#ec3042]" />
          <p className="text-[30px] font-semibold leading-none">{reviewItems.length}</p>
          <p className="mt-2 text-[12px] font-medium text-[#7b8190]">Low-confidence records</p>
        </section>
        <section className="rounded-[16px] bg-white p-5">
          <MessageSquareText className="mb-4 size-5 text-[#111827]" />
          <p className="text-[30px] font-semibold leading-none">{activeRecord ? Math.round(activeRecord.confidence * 100) : 0}%</p>
          <p className="mt-2 text-[12px] font-medium text-[#7b8190]">Current confidence score</p>
        </section>
        <section className="rounded-[16px] bg-white p-5">
          <AlertTriangle className="mb-4 size-5 text-[#b7791f]" />
          <p className="text-[30px] font-semibold leading-none">Manual</p>
          <p className="mt-2 text-[12px] font-medium text-[#7b8190]">Human routing required</p>
        </section>
      </div>

      {activeRecord ? (
        <section className="grid gap-5 rounded-[18px] bg-white p-5 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-semibold text-[#111827]">{activeRecord.branch_name}</h2>
                <p className="mt-1 text-[12px] font-medium text-[#7b8190]">
                  {activeRecord.phone} · {activeRecord.channel.replace("_", " ")} · {activeRecord.job_id ?? "Website message"}
                </p>
              </div>
              <Badge variant="review">needs review</Badge>
            </div>
            <div className="rounded-[16px] border border-[#eef0f3] bg-[#f9fafb] p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a91a0]">Customer message</p>
              <p className="text-[18px] font-semibold leading-relaxed tracking-[-0.02em] text-[#111827]">
                {activeRecord.raw_text}
              </p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[14px] bg-[#f7f8fa] p-4">
                <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">AI sentiment</p>
                <p className="mt-2 text-[15px] font-semibold capitalize text-[#111827]">{activeRecord.sentiment}</p>
              </div>
              <div className="rounded-[14px] bg-[#f7f8fa] p-4">
                <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">AI severity</p>
                <p className="mt-2 text-[15px] font-semibold text-[#111827]">Severity {activeRecord.severity}</p>
              </div>
              <div className="rounded-[14px] bg-[#f7f8fa] p-4">
                <p className="text-[11px] font-semibold uppercase text-[#8a91a0]">Route</p>
                <p className="mt-2 text-[15px] font-semibold text-[#111827]">Hold queue</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[16px] bg-[#f7f8fa] p-5">
            <div className="mb-5 grid size-12 place-items-center rounded-[14px] bg-[#fff4d6] text-[#b7791f]">
              <ShieldQuestion className="size-6" />
            </div>
            <h3 className="text-[17px] font-semibold text-[#111827]">Manual override</h3>
            <p className="mt-2 text-[12px] font-medium leading-relaxed text-[#7b8190]">
              Confirm the final score before routing this message into the correct queue.
            </p>
            <div className="mt-5 space-y-4">
              <div>
                <Label>Sentiment</Label>
                <Select defaultValue={activeRecord.sentiment}>
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="Sentiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Severity</Label>
                <Select defaultValue={String(activeRecord.severity)}>
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <SelectItem key={item} value={String(item)}>Severity {item}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="h-11 w-full rounded-full bg-[#ec3042] font-semibold text-white hover:bg-[#d92b3b]">
                <Save className="size-4" /> Save override
              </Button>
            </div>
          </aside>
        </section>
      ) : (
        <section className="rounded-[18px] bg-white p-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 size-10 text-[#13a56b]" />
          <h2 className="text-[20px] font-semibold text-[#111827]">No records need review</h2>
          <p className="mt-2 text-[13px] font-medium text-[#7b8190]">Every feedback message has enough confidence to route automatically.</p>
        </section>
      )}
    </div>
  );
}
