import type { Metadata } from "next";
import { Suspense } from "react";

import { DashboardDataProvider } from "@/components/dashboard/dashboard-data-provider";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: {
    default: "Dashboard",
    template: "%s | AutoCare Dashboard",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <DashboardDataProvider>
        <DashboardShell>{children}</DashboardShell>
      </DashboardDataProvider>
    </Suspense>
  );
}
