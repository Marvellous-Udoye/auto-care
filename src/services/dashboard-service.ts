import {
  alerts,
  branches,
  currentDashboardUser,
  dashboardUsers,
  draftResponses,
  feedbackRecords,
  sentimentTrend,
  type FeedbackStatus,
} from "@/constants/dashboard";
import { visibleFeedbackForUser } from "@/lib/dashboard/access";

export function getDashboardContext() {
  const feedback = visibleFeedbackForUser(currentDashboardUser, feedbackRecords);

  return {
    alerts,
    branches,
    currentUser: currentDashboardUser,
    drafts: draftResponses,
    feedback,
    trend: sentimentTrend,
    users: dashboardUsers,
  };
}

export function getSummaryMetrics(branchId: string = "all") {
  const scoped = branchId === "all" ? feedbackRecords : feedbackRecords.filter((item) => item.branch_id === branchId);
  const positive = scoped.filter((item) => item.sentiment === "positive").length;
  const negative = scoped.filter((item) => item.sentiment === "negative").length;

  return {
    totalToday: scoped.filter((item) => item.created_at.startsWith("2026-09-17")).length,
    totalWeek: scoped.length,
    positivePercent: scoped.length ? Math.round((positive / scoped.length) * 100) : 0,
    negativePercent: scoped.length ? Math.round((negative / scoped.length) * 100) : 0,
    openAlerts: scoped.filter((item) => item.status === "manager_alert").length,
    pendingDrafts: draftResponses.filter((draft) => !draft.sent).length,
  };
}

export function getFeedbackByStatus(status: FeedbackStatus) {
  return feedbackRecords.filter((item) => item.status === status);
}
