import { branches, currentDashboardUser } from "@/constants/dashboard";
import { canUseBranch } from "@/lib/dashboard/access";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";

export function FilterBar() {
  const scopedBranches = branches.filter((branch) => canUseBranch(currentDashboardUser, branch.id));
  const locked = currentDashboardUser.branch_scope !== "all";

  return (
    <div className="mb-6 grid gap-4 rounded-[14px] border border-[#3a3a3a] bg-[#111111] p-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <div>
        <Label>Branch</Label>
        <Select disabled={locked} defaultValue={locked ? String(currentDashboardUser.branch_scope) : "all"}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select branch" />
          </SelectTrigger>
          <SelectContent>
            {!locked ? <SelectItem value="all">All branches</SelectItem> : null}
            {scopedBranches.map((branch) => (
              <SelectItem key={branch.id} value={branch.id}>
                {branch.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Date range</Label>
        <DateRangePicker />
      </div>
      <p className="text-[12px] font-semibold leading-relaxed text-[#858585]">
        {locked ? "Scoped roles are locked to their assigned branch." : "Super admins can review all branches or drill down."}
      </p>
    </div>
  );
}
