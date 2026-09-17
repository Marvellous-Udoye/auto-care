"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/external/autocare-shared";
import { currentDashboardUser } from "@/constants/dashboard";
import { canManageTeam } from "@/lib/dashboard/access";
import { cn } from "@/lib/utils";
import { dashboardNavItems, systemNavItems } from "@/components/dashboard/dashboard-nav";

function SidebarLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-10 items-center gap-3 rounded-[10px] px-3 text-[13px] font-extrabold transition-colors",
        active ? "bg-white/[0.06] text-white" : "text-[#858585] hover:bg-white/[0.04] hover:text-white",
      )}
    >
      {active ? <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#ec3042]" /> : null}
      <Icon className={cn("size-4", active ? "text-[#ec3042]" : "text-[#858585]")} />
      {label}
    </Link>
  );
}

function DashboardSidebar() {
  const nav = dashboardNavItems.filter((item) => !item.superAdminOnly || canManageTeam(currentDashboardUser));

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[270px] border-r border-[#3a3a3a] bg-[#030303] lg:flex lg:flex-col">
      <div className="flex h-20 items-center px-6">
        <Logo />
      </div>
      <nav className="flex-1 px-4">
        <p className="px-3 pb-3 pt-4 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#777]">Feedback Intelligence</p>
        <div className="space-y-1">
          {nav.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </div>
        <Separator className="my-5" />
        <p className="px-3 pb-3 text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#777]">System</p>
        <div className="space-y-1">
          {systemNavItems.map((item) => (
            <SidebarLink key={item.href} {...item} />
          ))}
        </div>
      </nav>
    </aside>
  );
}

function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b border-[#3a3a3a] bg-[#030303]/92 px-5 backdrop-blur-md lg:px-8">
      <Button variant="ghost" size="icon" className="text-white lg:hidden" aria-label="Open dashboard menu">
        <Menu className="size-5" />
      </Button>
      <div className="relative hidden w-full max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#858585]" />
        <Input className="pl-9" placeholder="Search feedback, branches, phones..." />
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Link href="/dashboard/profile" className="flex items-center gap-3 rounded-full border border-[#3a3a3a] bg-[#111111] py-1.5 pl-2 pr-4 transition-colors hover:border-[#ec3042]">
          <Avatar>
            <AvatarFallback>AO</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-[13px] font-extrabold text-white">{currentDashboardUser.name}</p>
            <p className="text-[11px] font-semibold text-[#858585]">{currentDashboardUser.role.replace("_", " ")}</p>
          </div>
        </Link>
      </div>
    </header>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <DashboardSidebar />
      <div className="lg:pl-[270px]">
        <DashboardTopbar />
        <main className="mx-auto w-full max-w-[1440px] px-5 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
