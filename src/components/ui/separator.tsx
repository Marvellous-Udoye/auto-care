import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="separator" className={cn("h-px w-full bg-[#3a3a3a]", className)} {...props} />;
}

export { Separator };
