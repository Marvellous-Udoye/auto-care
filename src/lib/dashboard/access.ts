import type { DashboardUser, FeedbackRecord } from "@/constants/dashboard";

export function canUseBranch(user: DashboardUser, branchId: string) {
  return user.branch_scope === "all" || user.branch_scope === branchId;
}

export function canWrite(user: DashboardUser) {
  return user.role !== "viewer";
}

export function canManageTeam(user: DashboardUser) {
  return user.role === "super_admin";
}

export function visibleFeedbackForUser(user: DashboardUser, feedback: FeedbackRecord[]) {
  if (user.branch_scope === "all") return feedback;
  return feedback.filter((record) => record.branch_id === user.branch_scope);
}
