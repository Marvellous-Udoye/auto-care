import { NextResponse } from "next/server";

import { createSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import type { DashboardRole, FeedbackStatus, Sentiment } from "@/components/dashboard/dashboard-data-provider";

type DashboardAction =
  | { type: "acknowledge_alert"; alertId: string }
  | { type: "complete_job"; branchId?: string; jobId: string; phone: string }
  | { type: "invite_user"; email: string; name: string; role: DashboardRole }
  | { type: "mark_draft_sent"; feedbackId: string }
  | { type: "remove_user"; userId: string }
  | { type: "route_review"; feedbackId: string; sentiment: Sentiment; severity: 1 | 2 | 3 | 4 | 5 }
  | { type: "update_draft"; draftText: string; feedbackId: string };

function routeFor(sentiment: Sentiment, severity: number): FeedbackStatus {
  if (sentiment === "positive") return "ready_to_post";
  return severity >= 4 ? "manager_alert" : "private_queue";
}

function dashboardError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function getDashboardScope() {
  const client = createSupabaseServerClient();
  const configuredEmail = process.env.DASHBOARD_USER_EMAIL ?? process.env.NEXT_PUBLIC_DASHBOARD_USER_EMAIL;
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

  const { data: branchRows, error: branchesError } = await client
    .from("branches")
    .select("id,name,city,manager_email,created_at")
    .order("created_at", { ascending: true });

  if (branchesError) throw branchesError;

  const user = userRows?.[0] ?? null;
  const branches = branchRows ?? [];
  const branch = user
    ? branches.find((item) => item.id === user.branch_id) ?? null
    : branches[0] ?? null;

  return {
    branch,
    branchId: user?.branch_id ?? branch?.id ?? null,
    branches: branch ? [branch] : [],
    client,
    user,
  };
}

export async function GET() {
  if (!hasSupabaseServerConfig) {
    return dashboardError("Supabase is not configured on the server.", 500);
  }

  try {
    const { branch, branchId, branches, client, user } = await getDashboardScope();

    if (!user || !branchId) {
      return NextResponse.json({
        alerts: [],
        branch,
        branches,
        drafts: [],
        feedback: [],
        teamUsers: [],
        user,
      });
    }

    const { data: feedbackData, error: feedbackError } = await client
      .from("feedback")
      .select("id,branch_id,job_id,phone,channel,raw_text,sentiment,severity,confidence,is_repeat_negative,status,created_at,updated_at")
      .eq("branch_id", branchId)
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
      .eq("branch_id", branchId)
      .order("triggered_at", { ascending: false });
    if (alertError) throw alertError;

    const { data: usersData, error: usersError } = await client
      .from("dashboard_users")
      .select("id,name,email,role,branch_id,created_at")
      .eq("branch_id", branchId)
      .order("created_at", { ascending: true });
    if (usersError) throw usersError;

    return NextResponse.json({
      alerts: alertData ?? [],
      branch,
      branches,
      drafts: draftData ?? [],
      feedback: feedbackData ?? [],
      teamUsers: usersData ?? [],
      user,
    });
  } catch (error) {
    return dashboardError(error instanceof Error ? error.message : "Unable to load dashboard data.", 500);
  }
}

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig) {
    return dashboardError("Supabase is not configured on the server.", 500);
  }

  try {
    const action = (await request.json()) as DashboardAction;
    const { branchId, branch, client, user } = await getDashboardScope();
    const activeBranchId = branchId ?? branch?.id ?? null;
    const canManage = user?.role === "manager";

    if (action.type === "complete_job") {
      const jobBranchId = action.branchId || activeBranchId;
      if (!jobBranchId) return dashboardError("Create a branch in Supabase before completing jobs.");

      const webhookUrl = process.env.N8N_JOB_COMPLETE_WEBHOOK_URL ?? process.env.NEXT_PUBLIC_N8N_JOB_COMPLETE_WEBHOOK_URL;
      if (!webhookUrl) return dashboardError("N8N_JOB_COMPLETE_WEBHOOK_URL is not configured.", 500);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branch_id: jobBranchId,
          job_id: action.jobId,
          phone: action.phone,
        }),
      });

      if (!response.ok) return dashboardError("Could not notify the automation webhook.", 502);
      return NextResponse.json({ ok: true });
    }

    if (!user || !activeBranchId) return dashboardError("No dashboard user is configured.", 403);

    if (action.type === "invite_user") {
      if (!canManage) return dashboardError("Only managers can manage team members.", 403);
      const { error } = await client.from("dashboard_users").insert({
        branch_id: activeBranchId,
        email: action.email,
        name: action.name,
        role: action.role,
      });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action.type === "acknowledge_alert") {
      if (!canManage) return dashboardError("Only managers can acknowledge alerts.", 403);
      const { error } = await client
        .from("alerts")
        .update({
          acknowledged: true,
          acknowledged_by: user.email,
          acknowledged_at: new Date().toISOString(),
        })
        .eq("id", action.alertId)
        .eq("branch_id", activeBranchId);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action.type === "mark_draft_sent") {
      if (!canManage) return dashboardError("Only managers can mark drafts as sent.", 403);
      const { error } = await client
        .from("drafts")
        .update({ sent: true, sent_at: new Date().toISOString() })
        .eq("feedback_id", action.feedbackId);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action.type === "remove_user") {
      if (!canManage) return dashboardError("Only managers can remove users.", 403);
      const { error } = await client
        .from("dashboard_users")
        .delete()
        .eq("id", action.userId)
        .eq("branch_id", activeBranchId);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action.type === "route_review") {
      if (!canManage) return dashboardError("Only managers can route reviewed feedback.", 403);
      const { error } = await client
        .from("feedback")
        .update({
          sentiment: action.sentiment,
          severity: action.severity,
          status: routeFor(action.sentiment, action.severity),
          updated_at: new Date().toISOString(),
        })
        .eq("id", action.feedbackId)
        .eq("branch_id", activeBranchId);
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    if (action.type === "update_draft") {
      if (!canManage) return dashboardError("Only managers can edit drafts.", 403);
      const { data: existingDraft, error: draftLookupError } = await client
        .from("drafts")
        .select("id")
        .eq("feedback_id", action.feedbackId)
        .maybeSingle();
      if (draftLookupError) throw draftLookupError;

      const result = existingDraft
        ? await client.from("drafts").update({ draft_text: action.draftText }).eq("id", existingDraft.id)
        : await client.from("drafts").insert({ feedback_id: action.feedbackId, draft_text: action.draftText });
      if (result.error) throw result.error;
      return NextResponse.json({ ok: true });
    }

    return dashboardError("Unsupported dashboard action.");
  } catch (error) {
    return dashboardError(error instanceof Error ? error.message : "Unable to complete dashboard action.", 500);
  }
}
