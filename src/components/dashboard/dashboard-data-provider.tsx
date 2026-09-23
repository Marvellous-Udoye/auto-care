"use client";

import * as React from "react";

import { hasSupabaseConfig, supabase } from "@/lib/supabase/client";

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
  canManage: boolean;
  configMissing: boolean;
  createJobComplete: (input: { jobId: string; phone: string }) => Promise<void>;
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

function assertSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

function routeFor(sentiment: Sentiment, severity: number): FeedbackStatus {
  if (sentiment === "positive") return "ready_to_post";
  return severity >= 4 ? "manager_alert" : "private_queue";
}

export function DashboardDataProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = React.useState<AlertRecord[]>([]);
  const [branch, setBranch] = React.useState<Branch | null>(null);
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
      const client = assertSupabase();
      const configuredEmail = process.env.NEXT_PUBLIC_DASHBOARD_USER_EMAIL;
      let userQuery = client
        .from("dashboard_users")
        .select("id,name,email,role,branch_id,created_at")
        .order("created_at", { ascending: true })
        .limit(1);

      if (configuredEmail) {
        userQuery = client
          .from("dashboard_users")
          .select("id,name,email,role,branch_id,created_at")
          .eq("email", configuredEmail)
          .limit(1);
      }

      const { data: userRows, error: userError } = await userQuery;
      if (userError) throw userError;
      const activeUser = userRows?.[0] as DashboardUser | undefined;
      if (!activeUser) throw new Error("No dashboard user found for this environment.");

      const { data: branchData, error: branchError } = await client
        .from("branches")
        .select("id,name,city,manager_email,created_at")
        .eq("id", activeUser.branch_id)
        .single();
      if (branchError) throw branchError;

      const { data: feedbackData, error: feedbackError } = await client
        .from("feedback")
        .select("id,branch_id,job_id,phone,channel,raw_text,sentiment,severity,confidence,is_repeat_negative,status,created_at,updated_at")
        .eq("branch_id", activeUser.branch_id)
        .order("created_at", { ascending: false });
      if (feedbackError) throw feedbackError;

      const feedbackIds = (feedbackData ?? []).map((item) => item.id);
      const draftsQuery = client
        .from("drafts")
        .select("id,feedback_id,draft_text,sent,sent_at,created_at")
        .order("created_at", { ascending: false });
      const { data: draftData, error: draftError } = feedbackIds.length
        ? await draftsQuery.in("feedback_id", feedbackIds)
        : { data: [], error: null };
      if (draftError) throw draftError;

      const { data: alertData, error: alertError } = await client
        .from("alerts")
        .select("id,feedback_id,branch_id,triggered_at,acknowledged,acknowledged_by,acknowledged_at")
        .eq("branch_id", activeUser.branch_id)
        .order("triggered_at", { ascending: false });
      if (alertError) throw alertError;

      const { data: usersData, error: usersError } = await client
        .from("dashboard_users")
        .select("id,name,email,role,branch_id,created_at")
        .eq("branch_id", activeUser.branch_id)
        .order("created_at", { ascending: true });
      if (usersError) throw usersError;

      setUser(activeUser);
      setBranch(branchData as Branch);
      setFeedback((feedbackData ?? []) as FeedbackRecord[]);
      setDrafts((draftData ?? []) as DraftResponse[]);
      setAlerts((alertData ?? []) as AlertRecord[]);
      setTeamUsers((usersData ?? []) as DashboardUser[]);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (!hasSupabaseConfig) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    void load();
  }, [load]);

  const value = React.useMemo<DashboardContextValue>(() => {
    const canManage = user?.role === "manager";

    return {
      alerts,
      branch,
      canManage,
      configMissing: !hasSupabaseConfig,
      async createJobComplete(input) {
        if (!user) throw new Error("No dashboard user is loaded.");
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_JOB_COMPLETE_WEBHOOK_URL;
        if (!webhookUrl) throw new Error("NEXT_PUBLIC_N8N_JOB_COMPLETE_WEBHOOK_URL is not configured.");

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch_id: user.branch_id,
            job_id: input.jobId,
            phone: input.phone,
          }),
        });

        if (!response.ok) throw new Error("Could not notify the automation webhook.");
        await load();
      },
      drafts,
      error,
      feedback,
      async inviteUser(input) {
        if (!user || !canManage) throw new Error("Only managers can manage team members.");
        const client = assertSupabase();
        const { error: insertError } = await client.from("dashboard_users").insert({
          branch_id: user.branch_id,
          email: input.email,
          name: input.name,
          role: input.role,
        });
        if (insertError) throw insertError;
        await load();
      },
      loading,
      async markAlertAcknowledged(alertId) {
        if (!user || !canManage) throw new Error("Only managers can acknowledge alerts.");
        const client = assertSupabase();
        const { error: updateError } = await client
          .from("alerts")
          .update({
            acknowledged: true,
            acknowledged_by: user.email,
            acknowledged_at: new Date().toISOString(),
          })
          .eq("id", alertId)
          .eq("branch_id", user.branch_id);
        if (updateError) throw updateError;
        await load();
      },
      async markDraftSent(feedbackId) {
        if (!canManage) throw new Error("Only managers can mark drafts as sent.");
        const client = assertSupabase();
        const { error: updateError } = await client
          .from("drafts")
          .update({ sent: true, sent_at: new Date().toISOString() })
          .eq("feedback_id", feedbackId);
        if (updateError) throw updateError;
        await load();
      },
      refresh: load,
      async removeUser(userId) {
        if (!user || !canManage) throw new Error("Only managers can remove users.");
        const client = assertSupabase();
        const { error: deleteError } = await client
          .from("dashboard_users")
          .delete()
          .eq("id", userId)
          .eq("branch_id", user.branch_id);
        if (deleteError) throw deleteError;
        await load();
      },
      async routeReview(feedbackId, input) {
        if (!user || !canManage) throw new Error("Only managers can route reviewed feedback.");
        const client = assertSupabase();
        const { error: updateError } = await client
          .from("feedback")
          .update({
            sentiment: input.sentiment,
            severity: input.severity,
            status: routeFor(input.sentiment, input.severity),
            updated_at: new Date().toISOString(),
          })
          .eq("id", feedbackId)
          .eq("branch_id", user.branch_id);
        if (updateError) throw updateError;
        await load();
      },
      teamUsers,
      async updateDraft(feedbackId, draftText) {
        if (!canManage) throw new Error("Only managers can edit drafts.");
        const client = assertSupabase();
        const existingDraft = drafts.find((draft) => draft.feedback_id === feedbackId);
        const result = existingDraft
          ? await client.from("drafts").update({ draft_text: draftText }).eq("id", existingDraft.id)
          : await client.from("drafts").insert({ feedback_id: feedbackId, draft_text: draftText });
        if (result.error) throw result.error;
        await load();
      },
      user,
    };
  }, [alerts, branch, drafts, error, feedback, load, loading, teamUsers, user]);

  return <DashboardDataContext.Provider value={value}>{children}</DashboardDataContext.Provider>;
}

export function useDashboardData() {
  const context = React.useContext(DashboardDataContext);
  if (!context) throw new Error("useDashboardData must be used inside DashboardDataProvider.");
  return context;
}
