import * as React from "react";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar"
      className={cn("relative flex size-9 shrink-0 overflow-hidden rounded-full border border-[#3a3a3a] bg-[#202020]", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={cn("flex h-full w-full items-center justify-center text-[12px] font-extrabold text-white", className)}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback };
