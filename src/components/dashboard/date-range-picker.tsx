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
          className="mt-2 h-11 w-full justify-start rounded-[12px] border-[#3a3a3a] bg-[#030303] px-3.5 text-[14px] font-semibold text-white hover:bg-white/[0.04]"
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
            className="flex h-11 items-center justify-between rounded-[12px] border border-[#3a3a3a] bg-[#030303] px-4 text-left text-[14px] font-semibold text-white transition-colors hover:border-[#ec3042]"
            onClick={() => setRange(item)}
          >
            {item}
            {item === range ? <span className="size-2 rounded-full bg-[#ec3042]" /> : null}
          </button>
        ))}
      </div>
      <DialogActions>
        <Button className="rounded-[12px] bg-[#ec3042] font-extrabold text-white hover:bg-[#ec3042]/90">Apply range</Button>
      </DialogActions>
    </Dialog>
  );
}
