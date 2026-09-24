"use client";

import * as React from "react";

export type FeedbackChannel = "post_visit" | "website";
export type Sentiment = "positive" | "negative";
export type FeedbackStatus = "awaiting_reply" | "needs_review" | "ready_to_post" | "private_queue" | "manager_alert";
export type DashboardRole = "manager" | "staff";

export type Branch = {
  id: string;
  name: string;
  city: string | null;
  manager_email: string | null;
  created_at: string | null;
};

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  role: DashboardRole;
  branch_id: string;
  created_at: string | null;
};

export type FeedbackRecord = {
  id: string;
  branch_id: string | null;
  job_id: string | null;
  phone: string;
  channel: FeedbackChannel;
  raw_text: string | null;
  sentiment: Sentiment | null;
  severity: 1 | 2 | 3 | 4 | 5 | null;
  confidence: number | null;
  is_repeat_negative: boolean;
  status: FeedbackStatus;
  created_at: string | null;
  updated_at: string | null;
};

export type DraftResponse = {
  id: string;
  feedback_id: string | null;
  draft_text: string | null;
  sent: boolean;
  sent_at: string | null;
  created_at: string | null;
};

export type AlertRecord = {
  id: string;
  feedback_id: string | null;
  branch_id: string | null;
  triggered_at: string | null;
  acknowledged: boolean;
  acknowledged_by: string | null;
  acknowledged_at: string | null;
};

type DashboardContextValue = {
  alerts: AlertRecord[];
  branch: Branch | null;
  branches: Branch[];
  canManage: boolean;
  configMissing: boolean;
  createJobComplete: (input: { branchId?: string; jobId: string; phone: string }) => Promise<void>;
  drafts: DraftResponse[];
  error: string | null;
  feedback: FeedbackRecord[];
  inviteUser: (input: { name: string; email: string; role: DashboardRole }) => Promise<void>;
  loading: boolean;
  markAlertAcknowledged: (alertId: string) => Promise<void>;
  markDraftSent: (feedbackId: string) => Promise<void>;
  refresh: () => Promise<void>;
  removeUser: (userId: string) => Promise<void>;
  routeReview: (feedbackId: string, input: { sentiment: Sentiment; severity: 1 | 2 | 3 | 4 | 5 }) => Promise<void>;
  teamUsers: DashboardUser[];
  updateDraft: (feedbackId: string, draftText: string) => Promise<void>;
  user: DashboardUser | null;
};

const DashboardDataContext = React.createContext<DashboardContextValue | null>(null);
const DASHBOARD_API = "/api/dashboard";

type DashboardPayload = {
  alerts: AlertRecord[];
  branch: Branch | null;
  branches: Branch[];
  drafts: DraftResponse[];
  feedback: FeedbackRecord[];
  teamUsers: DashboardUser[];
  user: DashboardUser | null;
};

async function readDashboardPayload() {
  const response = await fetch(DASHBOARD_API, {
    cache: "no-store",
    credentials: "same-origin",
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error ?? "Unable to load dashboard data.");
  return payload as DashboardPayload;
}

async function sendDashboardAction(body: Record<string, unknown>) {
  const response = await fetch(DASHBOARD_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error ?? "Unable to complete dashboard action.");
}

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = React.useState<AlertRecord[]>([]);
  const [branch, setBranch] = React.useState<Branch | null>(null);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [drafts, setDrafts] = React.useState<DraftResponse[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [feedback, setFeedback] = React.useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [teamUsers, setTeamUsers] = React.useState<DashboardUser[]>([]);
  const [user, setUser] = React.useState<DashboardUser | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await readDashboardPayload();
      setUser(payload.user);
      setBranch(payload.branch);
      setBranches(payload.branches);
      setFeedback(payload.feedback);
      setDrafts(payload.drafts);
      setAlerts(payload.alerts);
      setTeamUsers(payload.teamUsers);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void load();
  }, [load]);

  const value = React.useMemo<DashboardContextValue>(() => {
    const canManage = user?.role === "manager";

    return {
      alerts,
      branch,
      branches,
      canManage,
      configMissing: false,
      async createJobComplete(input) {
        const branchId = input.branchId || user?.branch_id || branch?.id;
        if (!branchId) throw new Error("Create a branch in Supabase before completing jobs.");
        await sendDashboardAction({
          branchId,
          jobId: input.jobId,
          phone: input.phone,
          type: "complete_job",
        });
        await load();
      },
      drafts,
      error,
      feedback,
      async inviteUser(input) {
        if (!user || !canManage) throw new Error("Only managers can manage team members.");
        await sendDashboardAction({
          email: input.email,
          name: input.name,
          role: input.role,
          type: "invite_user",
        });
        await load();
      },
      loading,
      async markAlertAcknowledged(alertId) {
        if (!user || !canManage) throw new Error("Only managers can acknowledge alerts.");
        await sendDashboardAction({ alertId, type: "acknowledge_alert" });
        await load();
      },
      async markDraftSent(feedbackId) {
        if (!canManage) throw new Error("Only managers can mark drafts as sent.");
        await sendDashboardAction({ feedbackId, type: "mark_draft_sent" });
        await load();
      },
      refresh: load,
      async removeUser(userId) {
        if (!user || !canManage) throw new Error("Only managers can remove users.");
        await sendDashboardAction({ type: "remove_user", userId });
        await load();
      },
      async routeReview(feedbackId, input) {
        if (!user || !canManage) throw new Error("Only managers can route reviewed feedback.");
        await sendDashboardAction({
          feedbackId,
          sentiment: input.sentiment,
          severity: input.severity,
          type: "route_review",
        });
        await load();
      },
      teamUsers,
      async updateDraft(feedbackId, draftText) {
        if (!canManage) throw new Error("Only managers can edit drafts.");
        await sendDashboardAction({ draftText, feedbackId, type: "update_draft" });
        await load();
      },
      user,
    };
  }, [alerts, branch, branches, drafts, error, feedback, load, loading, teamUsers, user]);

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = React.useContext(DashboardDataContext);
  if (!context) throw new Error("useDashboardData must be used inside DashboardDataProvider.");
  return context;
}
