"use client";

import { useSearchParams } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { branches, dashboardUsers } from "@/constants/dashboard";

export function TeamPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase().trim();
  const visibleUsers = dashboardUsers.filter((user) => {
    if (!query) return true;
    const branchLabel = user.branch_scope === "all" ? "all branches" : branches.find((branch) => branch.id === user.branch_scope)?.name ?? "";
    return [user.name, user.email, user.role, branchLabel].some((value) => value.toLowerCase().includes(query));
  });

  return (
    <div className="pt-5">
      <DashboardPageHeader
        eyebrow="Access"
        title="Team & Staff"
        description="Mock staff access for the feedback dashboard. The real version maps to dashboard_users with manager and staff roles."
        actions={
          <Dialog
            title="Add staff member"
            description="Prepare a dashboard user for future Supabase auth-backed invitations."
            trigger={
              <Button className="rounded-full bg-[#ec3042] px-5 font-semibold text-white hover:bg-[#d92b3b]">
                <Plus className="size-4" /> Add staff
              </Button>
            }
          >
            <div className="grid gap-4">
              <div>
                <Label>Name</Label>
                <Input className="mt-2" placeholder="Team member name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mt-2" placeholder="name@autocare.com" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Role</Label>
                  <Select defaultValue="staff">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Branch</Label>
                  <Select defaultValue={branches[0].id}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogActions>
              <Button className="rounded-full bg-[#ec3042] px-5 font-semibold text-white hover:bg-[#d92b3b]">Save user</Button>
            </DialogActions>
          </Dialog>
        }
      />
      <div className="rounded-[18px] bg-white p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Branch scope</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-semibold text-[#111827]">{user.name}</p>
                  <p className="text-[12px] text-[#7b8190]">{user.email}</p>
                </TableCell>
                <TableCell><Badge variant={user.role === "manager" ? "default" : "neutral"}>{user.role}</Badge></TableCell>
                <TableCell>{user.branch_scope === "all" ? "All branches" : branches.find((branch) => branch.id === user.branch_scope)?.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="rounded-full text-[#7b8190] hover:bg-[#f3f6fb] hover:text-[#111827]">Edit</Button>
                  <Button variant="ghost" size="icon-sm" className="rounded-full text-[#7b8190] hover:bg-[#f3f6fb] hover:text-[#111827]" aria-label={`Remove ${user.name}`}>
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
