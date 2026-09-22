import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="pt-5">
      <DashboardPageHeader
        eyebrow="Account"
        title="Profile"
        description="Staff identity, branch scope, and workflow permissions for the AutoCare feedback engine."
      />
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="overflow-hidden rounded-[18px] bg-white">
          <div className="h-24 bg-[linear-gradient(135deg,#ec3042_0%,#ec3042_42%,#f7f7f8_42%,#f7f7f8_100%)]" />
          <div className="-mt-10 p-6">
            <Avatar className="size-20 border-4 border-white bg-[#fff1f2]">
              <AvatarFallback className="text-2xl">AO</AvatarFallback>
            </Avatar>
            <h2 className="mt-5 text-2xl font-semibold text-[#111827]">{currentDashboardUser.name}</h2>
            <p className="mt-1 text-[14px] font-medium text-[#7b8190]">{currentDashboardUser.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>manager</Badge>
              <Badge variant="neutral">{branch}</Badge>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4 text-[14px] font-medium text-[#596071]">
              <p className="flex items-center gap-3"><Mail className="size-4 text-[#ec3042]" /> {currentDashboardUser.email}</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 text-[#ec3042]" /> {branch}</p>
              <p className="flex items-center gap-3"><ShieldCheck className="size-4 text-[#ec3042]" /> Can acknowledge alerts</p>
            </div>
          </div>
        </section>
        <section className="rounded-[18px] bg-white p-6">
          <h2 className="text-[17px] font-semibold text-[#111827]">Profile details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
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
              <Input id="profile-role" className="mt-2" defaultValue="manager" disabled />
            </div>
            <div>
              <Label htmlFor="profile-scope">Branch scope</Label>
              <Input id="profile-scope" className="mt-2" defaultValue={branch} disabled />
            </div>
          </div>
          <div className="mt-5 rounded-[14px] border border-[#eef0f3] bg-[#f9fafb] p-4">
            <p className="flex items-center gap-3 text-[14px] font-semibold text-[#111827]">
              <UserRound className="size-4 text-[#ec3042]" /> Dashboard access
            </p>
            <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#7b8190]">
              Managers can review all routed feedback, acknowledge urgent alerts, and send response drafts. Staff can complete jobs to trigger WhatsApp feedback requests.
            </p>
          </div>
          <Button className="mt-6 h-11 rounded-full bg-[#ec3042] px-6 font-semibold text-white hover:bg-[#d92b3b]">Save profile</Button>
        </section>
      </div>
    </div>
  );
}
