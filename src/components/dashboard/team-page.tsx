import { Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogActions } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { branches, currentDashboardUser, dashboardUsers } from "@/constants/dashboard";
import { canManageTeam } from "@/lib/dashboard/access";

export function TeamPage() {
  if (!canManageTeam(currentDashboardUser)) {
    return null;
  }

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Super admin"
        title="Team & Roles"
        description="Mock permission management for dashboard users. Real auth and invitations can wire into this surface later."
        actions={
          <Dialog
            title="Add dashboard user"
            description="Create the UI shape for future auth-backed invitations."
            trigger={
              <Button className="rounded-[12px] bg-[#ec3042] font-extrabold text-white hover:bg-[#ec3042]/90">
                <Plus className="size-4" /> Add user
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
                  <Select defaultValue="viewer">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="marketer">Marketer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Branch scope</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choose scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All branches</SelectItem>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogActions>
              <Button className="rounded-[12px] bg-[#ec3042] font-extrabold text-white hover:bg-[#ec3042]/90">Save user</Button>
            </DialogActions>
          </Dialog>
        }
      />
      <div className="rounded-[14px] border border-[#3a3a3a] bg-[#030303] p-3">
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
            {dashboardUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-extrabold text-white">{user.name}</p>
                  <p className="text-[12px] text-[#858585]">{user.email}</p>
                </TableCell>
                <TableCell><Badge variant={user.role === "viewer" ? "neutral" : "default"}>{user.role.replace("_", " ")}</Badge></TableCell>
                <TableCell>{user.branch_scope === "all" ? "All branches" : branches.find((branch) => branch.id === user.branch_scope)?.name}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="text-[#858585] hover:text-white">Edit</Button>
                  <Button variant="ghost" size="icon-sm" className="text-[#ec3042]" aria-label={`Remove ${user.name}`}>
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
