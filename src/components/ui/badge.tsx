import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        default: "border-[#ec3042]/30 bg-[#ec3042]/12 text-[#ff6b78]",
        positive: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
        negative: "border-[#ec3042]/30 bg-[#ec3042]/12 text-[#ff6b78]",
        review: "border-amber-300/30 bg-amber-300/10 text-amber-200",
        neutral: "border-[#626262] bg-white/[0.04] text-[#d8d8d8]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
