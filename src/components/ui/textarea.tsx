import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-28 w-full rounded-[12px] border border-[#3a3a3a] bg-[#202020] px-3 py-3 text-[13px] font-semibold leading-relaxed text-white outline-none transition-colors placeholder:text-[#777] focus:border-[#ec3042] disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
