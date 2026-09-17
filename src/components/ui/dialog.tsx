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
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-[14px] border border-[#3a3a3a] bg-[#030303] p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">{title}</h2>
                {description ? <p className="mt-1 text-[13px] font-semibold leading-relaxed text-[#858585]">{description}</p> : null}
              </div>
              <Button variant="ghost" size="icon" className="text-[#858585] hover:text-white" onClick={() => setOpen(false)} aria-label="Close dialog">
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
