import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold",
  {
    variants: {
      variant: {
        default: "bg-[#ec3042] text-white",
        positive: "bg-[#d9fbef] text-[#099268]",
        negative: "bg-[#fff1f1] text-[#e94949]",
        review: "bg-[#fff7d6] text-[#b7791f]",
        neutral: "bg-[#f2f4f7] text-[#5f6675]",
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
