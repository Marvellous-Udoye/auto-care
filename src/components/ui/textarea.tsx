import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-28 w-full rounded-[10px] border border-[#e8eaee] bg-white px-3 py-3 text-[13px] font-medium leading-relaxed text-[#111827] outline-none transition-colors placeholder:text-[#9aa0ad] focus:border-[#ec3042] disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
