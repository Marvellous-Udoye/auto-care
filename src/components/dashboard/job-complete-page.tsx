"use client";

import * as React from "react";
import { CheckCircle2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDashboardData } from "@/components/dashboard/dashboard-data-provider";

export function JobCompletePage() {
  const { branch, createJobComplete, user } = useDashboardData();
  const [jobId, setJobId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setSubmitting(true);

    try {
      await createJobComplete({ jobId, phone });
      setJobId("");
      setPhone("");
      setMessage("Job completed. The feedback request automation has been triggered.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to trigger the feedback workflow.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Staff entry point</p>
        <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Complete a job</h1>
        <p className="mt-2 max-w-2xl text-[14px] font-semibold leading-relaxed text-[#858585]">
          Submit a completed repair job to start the WhatsApp feedback loop for this branch.
        </p>
      </div>

      <section className="grid gap-5 rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-6 lg:grid-cols-[1fr_0.8fr]">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div>
            <Label>Branch</Label>
            <Input className="mt-2" value={branch?.name ?? "Assigned branch"} disabled readOnly />
          </div>
          <div>
            <Label htmlFor="job-id">Job reference / ID</Label>
            <Input id="job-id" className="mt-2" value={jobId} onChange={(event) => setJobId(event.target.value)} placeholder="JOB-8492" required />
          </div>
          <div>
            <Label htmlFor="phone">Customer phone number</Label>
            <Input id="phone" className="mt-2" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+2348012345678" required />
          </div>
          <Button disabled={submitting} className="h-12 w-fit rounded-[13px] bg-[#ec3042] px-6 font-extrabold text-white shadow-[0_12px_24px_rgb(236_48_66/22%)] hover:bg-[#d92b3b]">
            <Send className="size-4" /> {submitting ? "Triggering..." : "Trigger feedback request"}
          </Button>
          {message ? (
            <p className="rounded-[12px] border border-[#3a3a3a] bg-[#202020] px-4 py-3 text-[13px] font-semibold text-[#f8f8f8]">{message}</p>
          ) : null}
        </form>
        <aside className="rounded-[12px] bg-[#202020] p-5">
          <CheckCircle2 className="mb-4 size-8 text-[#ec3042]" />
          <h2 className="text-xl font-extrabold text-white">What happens next?</h2>
          <p className="mt-3 text-[14px] font-semibold leading-relaxed text-[#858585]">
            n8n creates or updates the pending feedback record, sends the WhatsApp opener, and waits for the customer reply. The dashboard will show the routed feedback after the automation scores it.
          </p>
          <div className="mt-5 rounded-[12px] border border-[#3a3a3a] p-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Logged in as</p>
            <p className="mt-1 text-[15px] font-extrabold text-white">{user?.name}</p>
            <p className="text-[13px] font-semibold text-[#858585]">{user?.role}</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
