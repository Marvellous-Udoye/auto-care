import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn("relative flex size-9 shrink-0 overflow-hidden rounded-full border border-[#e8eaee] bg-[#eef2f7]", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn("flex h-full w-full items-center justify-center text-xs font-semibold text-[#111827]", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback };
