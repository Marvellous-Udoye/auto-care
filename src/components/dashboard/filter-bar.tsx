import { branches, currentDashboardUser } from "@/constants/dashboard";
import { canUseBranch } from "@/lib/dashboard/access";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";

export function FilterBar() {
  const scopedBranches = branches.filter((branch) => canUseBranch(currentDashboardUser, branch.id));
  const locked = currentDashboardUser.branch_scope !== "all";

  return (
    <div className="mb-5 grid gap-4 rounded-[18px] bg-white p-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
      <div>
        <Label className="mb-2 block">Branch</Label>
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
        <Label className="mb-2 block">Date range</Label>
        <DateRangePicker />
      </div>
      <p className="rounded-[14px] bg-[#f7f8fa] px-4 py-3 text-sm font-medium leading-relaxed text-[#7b8190]">
        {locked ? "Staff are locked to their assigned branch." : "Managers can review all branches or drill down."}
      </p>
    </div>
  );
}
