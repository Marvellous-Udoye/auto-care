"use client";

import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useDashboardData } from "@/components/dashboard/dashboard-data-provider";

export function ProfilePage() {
  const { branch, user } = useDashboardData();

  return (
    <div>
      <div className="mb-5">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Account</p>
        <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Profile</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="overflow-hidden rounded-[14px] border border-[#3a3a3a] bg-[#292929]">
          <div className="h-24 bg-[linear-gradient(135deg,#ec3042_0%,#ec3042_42%,#202020_42%,#202020_100%)]" />
          <div className="-mt-10 p-6">
            <Avatar className="size-20 border-4 border-[#292929] bg-[#202020]">
              <AvatarFallback className="text-2xl">AC</AvatarFallback>
            </Avatar>
            <h2 className="mt-5 text-2xl font-extrabold text-white">{user?.name}</h2>
            <p className="mt-1 text-[14px] font-semibold text-[#858585]">{user?.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{user?.role}</Badge>
              <Badge variant="neutral">{branch?.name}</Badge>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4 text-[14px] font-semibold text-[#858585]">
              <p className="flex items-center gap-3"><Mail className="size-4 text-[#ec3042]" /> {user?.email}</p>
              <p className="flex items-center gap-3"><MapPin className="size-4 text-[#ec3042]" /> {branch?.city ?? "Assigned branch"}</p>
              <p className="flex items-center gap-3"><ShieldCheck className="size-4 text-[#ec3042]" /> {user?.role === "manager" ? "Can manage queues and staff" : "Can complete jobs and view queues"}</p>
            </div>
          </div>
        </section>
        <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-6">
          <h2 className="text-[17px] font-extrabold text-white">Profile details</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="profile-name">Name</Label>
              <Input id="profile-name" className="mt-2" defaultValue={user?.name} readOnly />
            </div>
            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" className="mt-2" defaultValue={user?.email} readOnly />
            </div>
            <div>
              <Label htmlFor="profile-role">Role</Label>
              <Input id="profile-role" className="mt-2" defaultValue={user?.role} readOnly />
            </div>
            <div>
              <Label htmlFor="profile-scope">Branch</Label>
              <Input id="profile-scope" className="mt-2" defaultValue={branch?.name} readOnly />
            </div>
          </div>
          <div className="mt-5 rounded-[12px] bg-[#202020] p-4">
            <p className="flex items-center gap-3 text-[14px] font-extrabold text-white">
              <UserRound className="size-4 text-[#ec3042]" /> Dashboard access
            </p>
            <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#858585]">
              Access is scoped to this branch. Managers can act on drafts, review routing, acknowledge alerts, and manage branch staff. Staff can complete jobs and view feedback.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
