import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-10 w-full rounded-[12px] border border-[#3a3a3a] bg-[#202020] px-3 text-[13px] font-semibold text-white outline-none transition-colors placeholder:text-[#777] focus:border-[#ec3042] disabled:cursor-not-allowed disabled:opacity-55",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
