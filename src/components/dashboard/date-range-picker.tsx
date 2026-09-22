"use client";

import * as React from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogActions } from "@/components/ui/dialog";

const ranges = [
  "Today",
  "Last 7 days",
  "Last 30 days",
  "Sep 11, 2026 - Sep 17, 2026",
];

export function DateRangePicker() {
  const [range, setRange] = React.useState(ranges[3]);

  return (
    <Dialog
      title="Date range"
      description="Choose the reporting window for dashboard metrics."
      trigger={
        <Button
          type="button"
          variant="outline"
          className="h-10 w-full justify-start rounded-full border-[#dce3ee] bg-white px-3 text-sm font-medium text-[#111827] hover:bg-[#f7f8fa]"
        >
          <CalendarDays className="size-4 text-[#ec3042]" />
          {range}
        </Button>
      }
    >
      <div className="grid gap-2">
        {ranges.map((item) => (
          <button
            key={item}
            type="button"
            className="flex h-10 items-center justify-between rounded-lg bg-[#f7f8fa] px-4 text-left text-sm font-medium text-[#111827] transition-colors hover:bg-[#fff1f2]"
            onClick={() => setRange(item)}
          >
            {item}
            {item === range ? <span className="size-2 rounded-full bg-[#ec3042]" /> : null}
          </button>
        ))}
      </div>
      <DialogActions>
        <Button className="rounded-full bg-[#ec3042] px-5 font-semibold text-white hover:bg-[#d92b3b]">Apply range</Button>
      </DialogActions>
    </Dialog>
  );
}
