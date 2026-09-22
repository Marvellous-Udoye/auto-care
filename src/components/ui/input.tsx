import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full rounded-[10px] border border-[#e8eaee] bg-white px-3 text-[13px] font-medium text-[#111827] outline-none transition-colors placeholder:text-[#9aa0ad] focus:border-[#ec3042] disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
