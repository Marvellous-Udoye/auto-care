"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDashboardData, type DashboardRole } from "@/components/dashboard/dashboard-data-provider";

export function TeamPage() {
  const { branch, canManage, inviteUser, removeUser, teamUsers } = useDashboardData();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<DashboardRole>("staff");
  const [message, setMessage] = React.useState<string | null>(null);
  const visibleUsers = teamUsers.filter((user) => {
    if (!query) return true;
    return [user.name, user.email, user.role].some((value) => value.toLowerCase().includes(query));
  });

  async function handleInvite() {
    await inviteUser({ name, email, role });
    setName("");
    setEmail("");
    setRole("staff");
    setMessage("Team member added.");
  }

  if (!canManage) {
    return (
      <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-10 text-center">
        <h1 className="text-2xl font-extrabold text-white">Managers only</h1>
        <p className="mt-2 text-sm font-semibold text-[#858585]">Staff can view feedback and complete jobs, but cannot manage branch users.</p>
      </section>
    );
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#858585]">Branch team</p>
          <h1 className="text-[32px] font-extrabold tracking-[-0.04em] text-white">Team & Staff</h1>
          <p className="mt-2 text-[14px] font-semibold text-[#858585]">{branch?.name}</p>
        </div>
        <Dialog
          title="Add staff member"
          description="Create a manager or staff dashboard user for this branch."
          trigger={
            <Button className="rounded-[13px] bg-[#ec3042] px-5 font-extrabold text-white hover:bg-[#d92b3b]">
              <Plus className="size-4" /> Add user
            </Button>
          }
        >
          <div className="grid gap-4">
            <div>
              <Label>Name</Label>
              <Input className="mt-2" value={name} onChange={(event) => setName(event.target.value)} placeholder="Team member name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input className="mt-2" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@autocare.com" />
            </div>
            <div>
              <Label>Role</Label>
              <Select value={role} onValueChange={(value: DashboardRole) => setRole(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogActions>
            <Button className="rounded-[13px] bg-[#ec3042] px-5 font-extrabold text-white hover:bg-[#d92b3b]" onClick={() => void handleInvite()}>Save user</Button>
          </DialogActions>
        </Dialog>
      </div>
      {message ? <Badge variant="positive" className="mb-4">{message}</Badge> : null}
      <section className="rounded-[14px] border border-[#3a3a3a] bg-[#292929] p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Branch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-extrabold text-white">{user.name}</p>
                  <p className="text-[12px] text-[#858585]">{user.email}</p>
                </TableCell>
                <TableCell><Badge variant={user.role === "manager" ? "default" : "neutral"}>{user.role}</Badge></TableCell>
                <TableCell>{branch?.name ?? user.branch_id}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" className="rounded-full text-[#858585] hover:bg-white/[0.06] hover:text-white" aria-label={`Remove ${user.name}`} onClick={() => void removeUser(user.id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  );
}
