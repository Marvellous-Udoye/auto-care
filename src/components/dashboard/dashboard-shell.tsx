"use client";

import type { ElementType, ReactNode } from "react";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
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
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDashboardData } from "@/components/dashboard/dashboard-data-provider";
import { cn } from "@/lib/utils";

const SIDEBAR_OPEN = 248;
const SIDEBAR_CLOSED = 82;
const HEADER_HEIGHT = 72;
const navGroups = [
  {
    label: "MAIN",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home },
      { href: "/dashboard/job-complete", label: "Job Complete", icon: FileText },
    ],
  },
  {
    label: "FEEDBACK",
    items: [
      { href: "/dashboard/feedback", label: "Queues", icon: CalendarDays },
      { href: "/dashboard/review", label: "Needs Review", icon: ClipboardCheck },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { href: "/dashboard/team", label: "Team", icon: Users },
      { href: "/dashboard/profile", label: "Profile", icon: Settings },
    ],
  },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/job-complete": "Job Complete",
  "/dashboard/feedback": "Feedback",
  "/dashboard/review": "Needs Review",
  "/dashboard/team": "Team",
  "/dashboard/profile": "Profile",
};

function AutoCareLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <Link href="/dashboard" className={cn("flex h-10 items-center", collapsed ? "justify-center" : "gap-0")}>
      {collapsed ? (
        <span className="grid size-10 place-items-center rounded-full bg-[#ec3042] text-[18px] font-extrabold text-[#111]">o</span>
      ) : (
        <span className="text-[27px] font-extrabold tracking-[-0.02em] text-white">
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
          ? "bg-[#ec3042] text-white shadow-[0_12px_24px_rgb(236_48_66/18%)]"
          : "text-[#858585] hover:bg-white/[0.06] hover:text-white",
      )}
    >
      <Icon className="size-[18px]" strokeWidth={2} />
      {!collapsed ? <span className="min-w-0 flex-1 truncate">{label}</span> : null}
      {!collapsed && count ? <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-[#111827]">{count}</span> : null}
      {!collapsed && chip ? <span className="rounded-full bg-[#ec3042] px-2 py-0.5 text-[9px] font-semibold text-white">{chip}</span> : null}
      {collapsed && active ? <span className="absolute right-1 h-5 w-1 rounded-full bg-white" /> : null}
    </Link>
  );
}

function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { canManage, user } = useDashboardData();
  const visibleGroups = navGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.href !== "/dashboard/team" || canManage),
  }));

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#3a3a3a] bg-[#292929] px-4 py-5 transition-[width] duration-300"
      style={{ width: collapsed ? SIDEBAR_CLOSED : SIDEBAR_OPEN }}
    >
      <div className={cn("mb-7 flex items-center", collapsed ? "justify-center" : "justify-between")}>
        <AutoCareLogo collapsed={collapsed} />
        {!collapsed ? (
          <Button variant="ghost" size="icon-sm" className="rounded-full text-[#858585] hover:bg-white/[0.06] hover:text-[#ec3042]" onClick={onToggle} aria-label="Collapse sidebar">
            <Menu className="size-4" />
          </Button>
        ) : null}
      </div>
      {collapsed ? (
        <Button variant="ghost" size="icon-sm" className="mx-auto mb-5 rounded-full text-[#858585] hover:bg-white/[0.06] hover:text-[#ec3042]" onClick={onToggle} aria-label="Expand sidebar">
          <Menu className="size-4" />
        </Button>
      ) : null}
      <nav className="min-h-0 flex-1 space-y-5 overflow-hidden">
        {visibleGroups.map((group) => (
          <div key={group.label}>
            {!collapsed ? <p className="mb-2 px-3 text-[11px] font-extrabold text-[#858585]">{group.label}</p> : null}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={`${group.label}-${item.label}`} {...item} collapsed={collapsed} />
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className={cn("mt-5 rounded-[16px] border border-[#3a3a3a] bg-[#202020] p-2", collapsed && "border-transparent bg-transparent p-0")}>
        <Link href="/dashboard/profile" className={cn("flex items-center gap-2 rounded-[14px] transition-colors hover:bg-white/[0.06]", collapsed ? "justify-center p-1" : "p-1")}>
          <Avatar className="size-9">
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          {!collapsed ? (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-extrabold text-white">{user?.name ?? "AutoCare"}</p>
                <p className="truncate text-[10px] font-semibold text-[#858585]">{user?.role ?? "staff"}</p>
              </div>
              <ChevronDown className="size-4 text-[#858585]" />
            </>
          ) : null}
        </Link>
      </div>
      {!collapsed ? (
        <Button variant="ghost" className="mt-3 h-10 justify-start rounded-[14px] px-3 text-[13px] font-semibold text-[#858585] hover:bg-white/[0.06] hover:text-[#ec3042]">
          <LogOut className="size-4" /> Log out
        </Button>
      ) : null}
    </aside>
  );
}

function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { canManage, user } = useDashboardData();
  const visibleGroups = navGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.href !== "/dashboard/team" || canManage),
  }));

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(82vw,280px)] flex-col border-r border-[#3a3a3a] bg-[#292929] px-4 py-5 transition-transform duration-300 md:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-7 flex items-center justify-between">
          <AutoCareLogo collapsed={false} />
          <Button variant="ghost" size="icon-sm" className="rounded-full text-[#858585] hover:bg-white/[0.06] hover:text-[#ec3042]" onClick={onClose} aria-label="Close sidebar">
            <Menu className="size-4" />
          </Button>
        </div>
        <nav className="flex-1 space-y-5 overflow-hidden">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[11px] font-extrabold text-[#858585]">{group.label}</p>
              <div className="space-y-1" onClick={onClose}>
                {group.items.map((item) => (
                  <SidebarItem key={`${group.label}-${item.label}`} {...item} collapsed={false} />
                ))}
              </div>
            </div>
          ))}
        </nav>
        <Link href="/dashboard/profile" onClick={onClose} className="mt-5 flex items-center gap-2 rounded-[16px] border border-[#3a3a3a] bg-[#202020] p-3 transition-colors hover:bg-white/[0.06]">
          <Avatar className="size-9">
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-extrabold text-white">{user?.name ?? "AutoCare"}</p>
            <p className="truncate text-[10px] font-semibold text-[#858585]">{user?.role ?? "staff"}</p>
          </div>
        </Link>
      </aside>
    </>
  );
}

function Topbar({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  const { branch } = useDashboardData();
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
      className="fixed left-0 right-0 top-0 z-30 flex items-center gap-3 border-b border-[#3a3a3a] bg-[#292929]/95 px-4 backdrop-blur transition-[left] duration-300 md:left-[var(--dashboard-sidebar-offset)] md:gap-4 md:px-6"
      style={{ height: HEADER_HEIGHT }}
    >
      <Button variant="ghost" size="icon-sm" className="rounded-full text-[#858585] hover:bg-white/[0.06] hover:text-[#ec3042] md:hidden" onClick={onOpenMobileSidebar} aria-label="Open sidebar">
        <Menu className="size-4" />
      </Button>
      <div className="min-w-0">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#858585]">{branch?.name ?? "AutoCare Admin"}</p>
        <h1 className="truncate text-[18px] font-extrabold tracking-[-0.03em] text-white md:text-[20px]">{pageTitles[pathname] ?? "Dashboard"}</h1>
      </div>
      <div className="relative ml-auto hidden w-full max-w-[360px] sm:block">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#858585]" />
        <input
          value={query}
          onChange={(event) => updateSearch(event.target.value)}
          className="h-10 w-full rounded-full bg-[#202020] pl-11 pr-4 text-[13px] font-semibold text-white outline-none ring-1 ring-[#3a3a3a] transition placeholder:text-[#777] focus:ring-[#ec3042]"
          placeholder="Search feedback, phone or job ID"
        />
      </div>
      <Link href="/dashboard/feedback" className="hidden size-10 place-items-center rounded-full border border-[#3a3a3a] bg-[#202020] text-white transition hover:text-[#ec3042] sm:grid" aria-label="View manager alerts">
        <Bell className="size-4" />
      </Link>
      <Button asChild className="h-10 rounded-full bg-[#ec3042] px-4 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(236,48,66,0.25)] hover:bg-[#d92b3b] md:px-5">
        <Link href="/dashboard/job-complete"><Plus className="size-4" /> Complete Job</Link>
      </Button>
    </header>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const { configMissing, error, loading, refresh } = useDashboardData();
  const sidebarWidth = collapsed ? SIDEBAR_CLOSED : SIDEBAR_OPEN;

  return (
    <div
      className="min-h-screen bg-[#202020] text-[#f8f8f8] [--dashboard-sidebar-offset:0px]"
      style={{ "--dashboard-sidebar-offset": `${sidebarWidth}px` } as React.CSSProperties}
    >
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} />
      </div>
      <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
      <Topbar onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
      <main
        className="min-h-screen px-4 pb-8 pt-[96px] transition-[margin-left] duration-300 md:ml-[var(--dashboard-sidebar-offset)] md:px-6"
      >
        {configMissing ? (
          <DashboardState title="Supabase is not configured" description="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY" />
        ) : loading ? (
          <DashboardState title="Loading dashboard" description="Fetching data." />
        ) : error ? (
          <DashboardState title="Dashboard data unavailable" description={error} action={<Button onClick={() => void refresh()} className="mt-5 rounded-full bg-[#ec3042] px-5 text-white hover:bg-[#d92b3b]">Retry</Button>} />
        ) : (
          children
        )}
      </main>
    </div>
  );
}

function DashboardState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <section className="grid min-h-[calc(100vh-128px)] place-items-center">
      <div className="max-w-md rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-8 text-center">
        <h2 className="text-2xl font-extrabold text-white">{title}</h2>
        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#858585]">{description}</p>
        {action}
      </div>
    </section>
  );
}
