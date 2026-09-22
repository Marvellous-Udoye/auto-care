"use client";

import type { ElementType, ReactNode } from "react";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentDashboardUser } from "@/constants/dashboard";
import { cn } from "@/lib/utils";

const SIDEBAR_OPEN = 248;
const SIDEBAR_CLOSED = 82;
const HEADER_HEIGHT = 72;
const PRIMARY = "#ec3042";

const navGroups = [
  {
    label: "GENERAL",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: Home },
      { href: "/dashboard/feedback", label: "Feedback Queue", icon: CalendarDays, count: "32" },
      { href: "/dashboard/review", label: "Needs Review", icon: ClipboardCheck, count: "7" },
      { href: "/dashboard/branches", label: "Branches", icon: Wrench, count: "4" },
      { href: "/dashboard/team", label: "Team & Staff", icon: Users },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { href: "/dashboard/profile", label: "Job Complete", icon: FileText },
      { href: "/dashboard/feedback", label: "WhatsApp Logs", icon: Bell, chip: "NEW" },
      { href: "/dashboard/branches", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/profile", label: "Settings", icon: Settings },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/feedback": "Feedback Queue",
  "/dashboard/review": "Needs Review",
  "/dashboard/branches": "Branches",
  "/dashboard/team": "Team & Staff",
  "/dashboard/profile": "Profile",
};

function AutoCareLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/dashboard" className={cn("flex h-10 items-center", collapsed ? "justify-center" : "gap-0")}>
      {collapsed ? (
        <span className="grid size-10 place-items-center rounded-full bg-[#ec3042] text-[18px] font-extrabold text-[#111]">o</span>
      ) : (
        <span className="text-[27px] font-extrabold tracking-[-0.02em] text-[#111827]">
          Aut
          <span className="mx-px inline-grid size-[25px] place-items-center rounded-full bg-[#ec3042] text-[16px] text-[#111]">
            o
          </span>
          Care
        </span>
      )}
    </Link>
  );
}

function SidebarItem({
  href,
  label,
  icon: Icon,
  count,
  chip,
  collapsed,
}: {
  href: string;
  label: string;
  icon: ElementType;
  count?: string;
  chip?: string;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex h-11 items-center rounded-[14px] text-[13px] font-semibold transition-colors",
        collapsed ? "justify-center px-0" : "gap-3 px-3",
        active
          ? "bg-[#fff1f2] text-[#ec3042]"
          : "text-[#737b8c] hover:bg-[#f7f8fa] hover:text-[#111827]",
      )}
    >
      <Icon className="size-[18px]" strokeWidth={2} />
      {!collapsed ? <span className="min-w-0 flex-1 truncate">{label}</span> : null}
      {!collapsed && count ? <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#111827]">{count}</span> : null}
      {!collapsed && chip ? <span className="rounded-full bg-[#ec3042] px-2 py-0.5 text-[9px] font-semibold text-white">{chip}</span> : null}
      {collapsed && active ? <span className="absolute right-1 h-5 w-1 rounded-full bg-[#ec3042]" /> : null}
    </Link>
  );
}

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#eceff3] bg-white px-4 py-5 transition-[width] duration-300"
      style={{ width: collapsed ? SIDEBAR_CLOSED : SIDEBAR_OPEN }}
    >
      <div className={cn("mb-7 flex items-center", collapsed ? "justify-center" : "justify-between")}>
        <AutoCareLogo collapsed={collapsed} />
        {!collapsed ? (
          <Button variant="ghost" size="icon-sm" className="rounded-full text-[#667085] hover:bg-[#fff1f2] hover:text-[#ec3042]" onClick={onToggle} aria-label="Collapse sidebar">
            <Menu className="size-4" />
          </Button>
        ) : null}
      </div>
      {collapsed ? (
        <Button variant="ghost" size="icon-sm" className="mx-auto mb-5 rounded-full text-[#667085] hover:bg-[#fff1f2] hover:text-[#ec3042]" onClick={onToggle} aria-label="Expand sidebar">
          <Menu className="size-4" />
        </Button>
      ) : null}
      <nav className="min-h-0 flex-1 space-y-5 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label}>
            {!collapsed ? <p className="mb-2 px-3 text-[11px] font-semibold text-[#8a91a0]">{group.label}</p> : null}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={`${group.label}-${item.label}`} {...item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className={cn("mt-5 rounded-[16px] border border-[#edf0f4] bg-white p-2", collapsed && "border-transparent p-0")}>
        <Link href="/dashboard/profile" className={cn("flex items-center gap-2 rounded-[14px] transition-colors hover:bg-[#f7f8fa]", collapsed ? "justify-center p-1" : "p-1")}>
          <Avatar className="size-9">
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[#111827]">{currentDashboardUser.name}</p>
                <p className="truncate text-[10px] font-medium text-[#8a91a0]">Ops Manager</p>
              </div>
              <ChevronDown className="size-4 text-[#667085]" />
            </>
          ) : null}
        </Link>
      </div>
      {!collapsed ? (
        <Button variant="ghost" className="mt-3 h-10 justify-start rounded-[14px] px-3 text-[13px] font-semibold text-[#737b8c] hover:bg-[#fff1f2] hover:text-[#ec3042]">
          <LogOut className="size-4" /> Log out
        </Button>
      ) : null}
    </aside>
  );
}

function Topbar({ sidebarWidth }: { sidebarWidth: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = React.useState(initialQuery);

  React.useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function updateSearch(value: string) {
    setQuery(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    const next = params.toString();
    router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
  }

  return (
    <header
      className="fixed right-0 top-0 z-30 flex items-center gap-4 border-b border-[#eceff3] bg-white/95 px-6 backdrop-blur transition-[left] duration-300"
      style={{ left: sidebarWidth, height: HEADER_HEIGHT }}
    >
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8a91a0]">AutoCare Admin</p>
        <h1 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111827]">{pageTitles[pathname] ?? "Dashboard"}</h1>
      </div>
      <div className="relative ml-auto w-full max-w-[360px]">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#8a91a0]" />
        <input
          value={query}
          onChange={(event) => updateSearch(event.target.value)}
          className="h-10 w-full rounded-full bg-[#f5f6f8] pl-11 pr-4 text-[13px] font-medium text-[#111827] outline-none ring-1 ring-transparent transition placeholder:text-[#9aa0ad] focus:bg-white focus:ring-[#ec3042]"
          placeholder="Search feedback, phone or job ID"
        />
      </div>
      <button className="grid size-10 place-items-center rounded-full bg-white text-[#111827] shadow-[0_6px_18px_rgba(16,24,40,0.08)] transition hover:text-[#ec3042]" aria-label="View notifications">
        <Bell className="size-4" />
      </button>
      <Button className="h-10 rounded-full bg-[#ec3042] px-5 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(236,48,66,0.25)] hover:bg-[#d92b3b]">
        <Plus className="size-4" /> Complete Job
      </Button>
    </header>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_CLOSED : SIDEBAR_OPEN;

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#111827]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      <Topbar sidebarWidth={sidebarWidth} />
      <main
        className="min-h-screen px-6 pb-8 pt-[96px] transition-[margin-left] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {children}
      </main>
    </div>
  );
}
