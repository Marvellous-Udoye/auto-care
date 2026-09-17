import {
  Building2,
  ClipboardList,
  Gauge,
  MessageSquareWarning,
  ShieldCheck,
  Users,
} from "lucide-react";

export const dashboardNavItems = [
  { href: "/dashboard", label: "Overview", icon: Gauge },
  { href: "/dashboard/feedback", label: "Feedback Queue", icon: ClipboardList },
  { href: "/dashboard/review", label: "Needs Review", icon: MessageSquareWarning },
  { href: "/dashboard/branches", label: "Branches", icon: Building2 },
  { href: "/dashboard/team", label: "Team", icon: Users, superAdminOnly: true },
];

export const systemNavItems = [{ href: "/", label: "Public Website", icon: ShieldCheck }];
