import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-[min(100%_-_64px,1360px)] max-[700px]:w-[min(100%_-_28px,420px)]", className)}>
      {children}
    </div>
  );
}

export function Logo() {
  return (
    <a
      className="text-[27px] font-extrabold tracking-[-0.02em] text-white max-[700px]:text-[23px]"
      href="#"
      aria-label="AutoCare home"
    >
      Aut
      <span className="mx-px inline-grid size-[25px] place-items-center rounded-full bg-[#ec3042] text-[16px] text-[#111]">
        o
      </span>
      Care
    </a>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  centered,
  alignRight,
  children,
}: {
  eyebrow?: string;
  title: string;
  centered?: boolean;
  alignRight?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={cn(centered && "text-center", alignRight && "text-right")}>
      {eyebrow ? (
        <p className="mb-[18px] text-[23px] font-extrabold uppercase tracking-[0.32em] text-[#ec3042] max-[700px]:text-[17px]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="m-0 text-[clamp(42px,4vw,58px)] font-extrabold leading-[1.12] text-white max-[700px]:text-[36px]">
        {title}
      </h2>
      {children}
    </div>
  );
}
