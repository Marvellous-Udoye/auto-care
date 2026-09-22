"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Dialog({
  trigger,
  title,
  description,
  children,
}: {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <span onClick={() => setOpen(true)}>{trigger}</span>
      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[18px] bg-white p-6 shadow-[rgba(16,24,40,0.18)_0px_24px_80px_0px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-[#111827]">{title}</h2>
                {description ? <p className="mt-1 text-sm font-medium leading-[1.5] text-[#7b8190]">{description}</p> : null}
              </div>
              <Button variant="ghost" size="icon" className="rounded-full text-[#7b8190] hover:bg-[#f3f6fb] hover:text-[#111827]" onClick={() => setOpen(false)} aria-label="Close dialog">
                <X className="size-4" />
              </Button>
            </div>
            <div className="mt-5">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function DialogActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-5 flex justify-end gap-3", className)} {...props} />;
}

export { Dialog, DialogActions };
