"use client";

import * as React from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

type ToastKind = "success" | "error";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastPayload = {
  action?: ToastAction;
  description?: string;
  kind: ToastKind;
  title: string;
};

type ToastItem = ToastPayload & {
  id: string;
};

const TOAST_EVENT = "autocare-toast";

function emitToast(payload: ToastPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
}

export const toast = {
  error(title: string, options?: Omit<ToastPayload, "kind" | "title">) {
    emitToast({ ...options, kind: "error", title });
  },
  success(title: string, options?: Omit<ToastPayload, "kind" | "title">) {
    emitToast({ ...options, kind: "success", title });
  },
};

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    function handleToast(event: Event) {
      const detail = (event as CustomEvent<ToastPayload>).detail;
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { ...detail, id }].slice(-4));
      window.setTimeout(() => {
        setToasts((current) => current.filter((toastItem) => toastItem.id !== id));
      }, 5200);
    }

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className="fixed right-4 top-4 z-[100] grid w-[min(380px,calc(100vw-32px))] gap-3">
      {toasts.map((toastItem) => {
        const Icon = toastItem.kind === "success" ? CheckCircle2 : XCircle;
        return (
          <section
            key={toastItem.id}
            className="rounded-[14px] border border-[#3a3a3a] bg-[#202020] p-4 text-white shadow-[0_24px_70px_rgb(0_0_0/35%)]"
            role={toastItem.kind === "error" ? "alert" : "status"}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${toastItem.kind === "success" ? "bg-emerald-500/15 text-emerald-300" : "bg-[#ec3042]/15 text-[#ff6b78]"}`}>
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-extrabold">{toastItem.title}</p>
                {toastItem.description ? <p className="mt-1 text-[12px] font-semibold leading-relaxed text-[#a7a7a7]">{toastItem.description}</p> : null}
                {toastItem.action ? (
                  <Button
                    className="mt-3 h-9 rounded-[11px] bg-[#ec3042] px-4 text-[12px] font-extrabold text-white hover:bg-[#d92b3b]"
                    onClick={toastItem.action.onClick}
                  >
                    {toastItem.action.label}
                  </Button>
                ) : null}
              </div>
              <button
                type="button"
                className="grid size-7 shrink-0 place-items-center rounded-full text-[#858585] transition hover:bg-white/[0.06] hover:text-white"
                aria-label="Dismiss notification"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toastItem.id))}
              >
                <X className="size-4" />
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}
