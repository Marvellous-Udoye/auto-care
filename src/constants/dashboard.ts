export type FeedbackChannel = "post_visit" | "website";
export type Sentiment = "positive" | "negative";
export type FeedbackStatus = "ready_to_post" | "private_queue" | "manager_alert" | "needs_review";
export type DashboardRole = "manager" | "staff";

export type Branch = {
  id: string;
  name: string;
  city: string;
};

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  role: DashboardRole;
  branch_scope: string | "all";
};

export type FeedbackRecord = {
  id: string;
  branch_id: string;
  branch_name: string;
  job_id: string | null;
  channel: FeedbackChannel;
  phone: string;
  raw_text: string;
  sentiment: Sentiment;
  severity: 1 | 2 | 3 | 4 | 5;
  confidence: number;
  is_repeat_negative: boolean;
  status: FeedbackStatus;
  created_at: string;
};

export type DraftResponse = {
  feedback_id: string;
  draft_text: string;
  sent: boolean;
  sent_at: string | null;
};

export type Alert = {
  feedback_id: string;
  branch_id: string;
  triggered_at: string;
  acknowledged: boolean;
  acknowledged_by: string | null;
};

export const currentDashboardUser: DashboardUser = {
  id: "usr_001",
  name: "Ada Okafor",
  email: "ada@autocare.com",
  role: "manager",
  branch_scope: "all",
};

export const branches: Branch[] = [
  { id: "br_lagos_main", name: "AutoCare Lagos Main", city: "Lagos" },
  { id: "br_ikeja", name: "AutoCare Ikeja", city: "Lagos" },
  { id: "br_abuja", name: "AutoCare Abuja", city: "Abuja" },
  { id: "br_port_harcourt", name: "AutoCare Port Harcourt", city: "Port Harcourt" },
];

export const feedbackRecords: FeedbackRecord[] = [
  {
    id: "fb_1001",
    branch_id: "br_lagos_main",
    branch_name: "AutoCare Lagos Main",
    job_id: "JOB-8492",
    channel: "post_visit",
    phone: "080***1234",
    raw_text: "The team fixed my brake issue quickly and explained everything before I paid. Very professional service.",
    sentiment: "positive",
    severity: 1,
    confidence: 0.94,
    is_repeat_negative: false,
    status: "ready_to_post",
    created_at: "2026-09-17T08:42:00.000Z",
  },
  {
    id: "fb_1002",
    branch_id: "br_ikeja",
    branch_name: "AutoCare Ikeja",
    job_id: "JOB-8497",
    channel: "post_visit",
    phone: "081***4412",
    raw_text: "My AC still blows warm air after the repair and nobody called me back yesterday.",
    sentiment: "negative",
    severity: 4,
    confidence: 0.91,
    is_repeat_negative: true,
    status: "manager_alert",
    created_at: "2026-09-17T09:18:00.000Z",
  },
  {
    id: "fb_1003",
    branch_id: "br_abuja",
    branch_name: "AutoCare Abuja",
    job_id: null,
    channel: "website",
    phone: "070***9081",
    raw_text: "I want to know if your diagnostics covers hybrid cars before I book.",
    sentiment: "positive",
    severity: 2,
    confidence: 0.58,
    is_repeat_negative: false,
    status: "needs_review",
    created_at: "2026-09-16T15:03:00.000Z",
  },
  {
    id: "fb_1004",
    branch_id: "br_port_harcourt",
    branch_name: "AutoCare Port Harcourt",
    job_id: "JOB-8410",
    channel: "post_visit",
    phone: "090***7720",
    raw_text: "The oil change was smooth and the pickup process was faster than expected.",
    sentiment: "positive",
    severity: 1,
    confidence: 0.97,
    is_repeat_negative: false,
    status: "ready_to_post",
    created_at: "2026-09-16T11:40:00.000Z",
  },
  {
    id: "fb_1005",
    branch_id: "br_lagos_main",
    branch_name: "AutoCare Lagos Main",
    job_id: "JOB-8399",
    channel: "post_visit",
    phone: "080***6208",
    raw_text: "The repair worked, but the front desk delay was frustrating and I waited almost an hour.",
    sentiment: "negative",
    severity: 2,
    confidence: 0.83,
    is_repeat_negative: false,
    status: "private_queue",
    created_at: "2026-09-15T16:24:00.000Z",
  },
  {
    id: "fb_1006",
    branch_id: "br_ikeja",
    branch_name: "AutoCare Ikeja",
    job_id: "JOB-8333",
    channel: "post_visit",
    phone: "091***3308",
    raw_text: "Engine diagnostic was detailed. The technician showed me the faulty sensor and gave a clear estimate.",
    sentiment: "positive",
    severity: 1,
    confidence: 0.95,
    is_repeat_negative: false,
    status: "ready_to_post",
    created_at: "2026-09-14T10:21:00.000Z",
  },
  {
    id: "fb_1007",
    branch_id: "br_abuja",
    branch_name: "AutoCare Abuja",
    job_id: "JOB-8318",
    channel: "post_visit",
    phone: "081***1002",
    raw_text: "This is the second time the same wheel alignment issue returned within a week.",
    sentiment: "negative",
    severity: 5,
    confidence: 0.96,
    is_repeat_negative: true,
    status: "manager_alert",
    created_at: "2026-09-14T08:17:00.000Z",
  },
];

export const draftResponses: DraftResponse[] = [
  {
    feedback_id: "fb_1001",
    draft_text: "Thank you for trusting AutoCare with your brake repair. We are glad the team explained the work clearly and got you back on the road quickly.",
    sent: false,
    sent_at: null,
  },
  {
    feedback_id: "fb_1002",
    draft_text: "We are sorry your AC issue was not resolved and that our follow-up fell short. A branch manager will contact you today to review the repair and make this right.",
    sent: false,
    sent_at: null,
  },
  {
    feedback_id: "fb_1004",
    draft_text: "We appreciate the kind words. Thank you for choosing AutoCare for your oil change and pickup service.",
    sent: true,
    sent_at: "2026-09-16T13:12:00.000Z",
  },
  {
    feedback_id: "fb_1005",
    draft_text: "Thank you for the honest feedback. We are glad the repair worked and will review the front desk delay with the branch team.",
    sent: false,
    sent_at: null,
  },
  {
    feedback_id: "fb_1006",
    draft_text: "Thank you for choosing AutoCare. We are happy the diagnostic process was clear and helpful.",
    sent: false,
    sent_at: null,
  },
  {
    feedback_id: "fb_1007",
    draft_text: "We are sorry the same alignment issue returned. This has been escalated to management for immediate inspection and resolution.",
    sent: false,
    sent_at: null,
  },
];

export const alerts: Alert[] = [
  {
    feedback_id: "fb_1002",
    branch_id: "br_ikeja",
    triggered_at: "2026-09-17T09:19:00.000Z",
    acknowledged: false,
    acknowledged_by: null,
  },
  {
    feedback_id: "fb_1007",
    branch_id: "br_abuja",
    triggered_at: "2026-09-14T08:20:00.000Z",
    acknowledged: true,
    acknowledged_by: "Nora Bello",
  },
];

export const dashboardUsers: DashboardUser[] = [
  currentDashboardUser,
  {
    id: "usr_002",
    name: "Nora Bello",
    email: "nora@autocare.com",
    role: "manager",
    branch_scope: "br_abuja",
  },
  {
    id: "usr_003",
    name: "Femi Cole",
    email: "femi@autocare.com",
    role: "staff",
    branch_scope: "all",
  },
  {
    id: "usr_004",
    name: "Tara Williams",
    email: "tara@autocare.com",
    role: "staff",
    branch_scope: "br_lagos_main",
  },
];

export const sentimentTrend = [
  { label: "Mon", positive: 18, negative: 4 },
  { label: "Tue", positive: 22, negative: 6 },
  { label: "Wed", positive: 19, negative: 5 },
  { label: "Thu", positive: 26, negative: 3 },
  { label: "Fri", positive: 21, negative: 7 },
  { label: "Sat", positive: 15, negative: 2 },
  { label: "Sun", positive: 12, negative: 1 },
];
