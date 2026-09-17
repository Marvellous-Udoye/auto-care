"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  defaultValue,
  children,
  className,
}: {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <div data-slot="tabs" data-value={value} className={className}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ value?: string; activeValue?: string; onValueChange?: (value: string) => void }>, {
              activeValue: value,
              onValueChange: setValue,
            })
          : child,
      )}
    </div>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<"div"> & { activeValue?: string; onValueChange?: (value: string) => void }) {
  const { activeValue, onValueChange, ...rest } = props;
  return (
    <div
      data-slot="tabs-list"
      data-active-value={activeValue}
      className={cn("inline-flex rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-1", className)}
      {...rest}
    >
      {React.Children.map(rest.children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ activeValue?: string; onValueChange?: (value: string) => void }>, {
              activeValue,
              onValueChange,
            })
          : child,
      )}
    </div>
  );
}

function TabsTrigger({
  value,
  className,
  activeValue,
  onValueChange,
  ...props
}: React.ComponentProps<"button"> & {
  value: string;
  activeValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const active = value === activeValue;
  return (
    <button
      data-slot="tabs-trigger"
      type="button"
      className={cn(
        "h-9 rounded-[10px] px-4 text-[13px] font-extrabold text-[#858585] transition-colors hover:text-white",
        active && "bg-[#ec3042] text-white shadow-[0_12px_24px_rgb(236_48_66/18%)]",
        className,
      )}
      onClick={() => onValueChange?.(value)}
      {...props}
    />
  );
}

function TabsContent({
  value,
  activeValue,
  className,
  ...props
}: React.ComponentProps<"div"> & { value: string; activeValue?: string }) {
  if (value !== activeValue) return null;
  return <div data-slot="tabs-content" className={cn("mt-5", className)} {...props} />;
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
