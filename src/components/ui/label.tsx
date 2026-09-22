import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn("text-[12px] font-semibold uppercase tracking-[0.04em] text-[#7b8190]", className)}
      {...props}
    />
  );
}

export { Label };
