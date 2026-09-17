import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { branches, currentDashboardUser } from "@/constants/dashboard";

export function ProfilePage() {
  const branch =
    currentDashboardUser.branch_scope === "all"
      ? "All branches"
      : branches.find((item) => item.id === currentDashboardUser.branch_scope)?.name ?? "Assigned branch";

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Account"
        title="Profile"
        description="Manage the visible staff details and dashboard access context for the current AutoCare account."
      />
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="overflow-hidden">
          <div className="h-24 border-b border-[#3a3a3a] bg-[linear-gradient(135deg,#ec3042_0%,#ec3042_35%,#030303_35%,#030303_100%)]" />
          <CardContent className="-mt-10 p-6">
            <Avatar className="size-20 border-4 border-[#111111] bg-[#030303]">
              <AvatarFallback className="text-2xl">AO</AvatarFallback>
            </Avatar>
            <h2 className="mt-5 text-2xl font-extrabold text-white">{currentDashboardUser.name}</h2>
            <p className="mt-1 text-[14px] font-semibold text-[#858585]">{currentDashboardUser.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{currentDashboardUser.role.replace("_", " ")}</Badge>
              <Badge variant="neutral">{branch}</Badge>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4 text-[14px] font-semibold text-[#858585]">
              <p className="flex items-center gap-3"><Mail className="size-4 text-[#ec3042]" /> {currentDashboardUser.email}</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 text-[#ec3042]" /> {branch}</p>
              <p className="flex items-center gap-3"><ShieldCheck className="size-4 text-[#ec3042]" /> Permission profile</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="profile-name">Name</Label>
              <Input id="profile-name" className="mt-2" defaultValue={currentDashboardUser.name} />
            </div>
            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" className="mt-2" defaultValue={currentDashboardUser.email} />
            </div>
            <div>
              <Label htmlFor="profile-role">Role</Label>
              <Input id="profile-role" className="mt-2" defaultValue={currentDashboardUser.role.replace("_", " ")} disabled />
            </div>
            <div>
              <Label htmlFor="profile-scope">Branch scope</Label>
              <Input id="profile-scope" className="mt-2" defaultValue={branch} disabled />
            </div>
            <div className="md:col-span-2 rounded-[14px] border border-[#3a3a3a] bg-[#030303] p-4">
              <p className="flex items-center gap-3 text-[14px] font-extrabold text-white">
                <UserRound className="size-4 text-[#ec3042]" /> Dashboard access
              </p>
              <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#858585]">
                This profile can view all branches and manage team roles. Viewer accounts keep edit, send, and acknowledge actions disabled.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
