import { CalendarDays, ChevronDown, Home, Plus, Scissors, UserRound } from "lucide-react";

function MessageIcon() {
  return <span className="grid size-5 place-items-center rounded-md border border-white/30 text-[10px]">↗</span>;
}

function SummaryCards() {
  return (
    <div className="grid grid-cols-[1.15fr_1fr_1.15fr] gap-4">
      <section className="relative overflow-hidden rounded-[16px] bg-[#ec3042] p-5 text-white shadow-[0_12px_28px_rgba(236,48,66,0.18)]">
        <MessageIcon />
        <div className="mt-4 text-[34px] font-semibold leading-none">248 <span className="align-middle text-[13px] font-semibold">+12%</span></div>
        <p className="mt-2 text-[12px] font-medium text-white/80">Feedback replies this month</p>
        <div className="absolute -right-8 top-4 size-28 rotate-12 rounded-[26px] bg-white/10" />
      </section>
      <section className="rounded-[16px] bg-white p-5">
        <CalendarDays className="mb-4 size-5 text-[#111827]" />
        <p className="text-[12px] font-medium text-[#7b8190]">Awaiting replies</p>
        <div className="mt-2 text-[30px] font-semibold leading-none">18 <span className="text-[12px] text-[#13a56b]">+4.2%</span></div>
        <p className="mt-3 text-[11px] font-medium text-[#9aa0ad]">Post-visit openers sent</p>
      </section>
      <section className="rounded-[16px] bg-white p-5">
        <Scissors className="mb-4 size-5 text-[#111827]" />
        <p className="text-[12px] font-medium text-[#7b8190]">Positive rate</p>
        <div className="mt-2 text-[30px] font-semibold leading-none">76% <span className="text-[12px] text-[#13a56b]">+3% increase</span></div>
        <p className="mt-3 text-[11px] font-medium text-[#9aa0ad]">Across all branches</p>
      </section>
    </div>
  );
}

const flowItems = [
  ["09:00", "JOB-8492 brake repair feedback received", "border-l-[#13a56b]"],
  ["10:00", "JOB-8497 AC complaint escalated", "border-[#ec3042] bg-white"],
  ["11:00", "Website WhatsApp question needs review", "border-l-[#ffc048]"],
  ["12:00", "Oil change review ready to publish", "border-l-[#13a56b]"],
  ["13:00", "Wheel alignment repeat issue alerted", "border-l-[#ff4d68]"],
];

function TodayFeedbackFlow() {
  return (
    <section className="rounded-[16px] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold"><CalendarDays className="size-4" /> Today&apos;s Feedback Flow</h2>
        <button className="text-[11px] font-semibold">View All</button>
      </div>
      <div className="space-y-2">
        {flowItems.map(([time, title, style]) => (
          <div key={time} className="grid grid-cols-[48px_1fr] items-center gap-3 text-[12px]">
            <span className="font-medium text-[#7b8190]">{time}</span>
            <div className={`rounded-[10px] border bg-white px-3 py-2 text-[#111827] ${style}`}>
              <p className="font-semibold">{time}</p>
              <p className="font-semibold">{title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeedbackChart() {
  const values = [32, 48, 40, 24, 58, 43, 55, 47, 64, 36, 57, 70];
  const maxValue = Math.max(...values);

  return (
    <section className="rounded-[16px] bg-white p-5 pb-6">
      <h2 className="mb-5 flex items-center gap-2 text-[15px] font-semibold">
        <BarIcon /> Feedback Statistics
      </h2>
      <div className="flex h-full items-end gap-4">
        {values.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-[92px] w-5 items-end rounded-[5px] bg-[#eef0f4]">
              <span
                className="block w-full rounded-[5px] bg-[#ec3042]"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-medium text-[#7b8190]">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][index]}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}   

function BarIcon() {
  return <span className="grid size-5 place-items-center rounded-md border border-[#dfe3ea] text-[10px]">▥</span>;
}

function TreatmentGauge() {
  return (
    <section className="rounded-[16px] bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold">
          <Scissors className="size-4" /> Routing Health
        </h2>
        <button className="text-[10px] font-semibold">View All</button>
      </div>
      <div className="mx-auto grid size-[230px] place-items-center rounded-t-full border-[22px] border-b-0 border-[#e7eaf0] border-l-[#ec3042] border-t-[#ec3042]">
        <div className="text-center">
          <p className="text-[40px] font-semibold leading-none">28/32</p>
          <p className="mt-1 text-[11px] text-[#9aa0ad]">Records Routed</p>
        </div>
      </div>
    </section>
  );
}   

function StockAlert() {
  const rows = [
    ["Ready to post", "18 records", "bg-[#13a56b]", "w-[48%]"],
    ["Manager alerts", "5 urgent", "bg-[#ff4d68]", "w-[22%]"],
    ["Private queue", "14 drafts", "bg-[#16c7a8]", "w-[38%]"],
    ["Needs review", "7 low confidence", "bg-[#ec3042]", "w-[26%]"],
  ];
  return (
    <section className="rounded-[16px] bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold"><BellIcon /> Queue Load</h2>
      <div className="space-y-4">
        {rows.map(([name, label, color, width]) => (
          <div key={name}>
            <div className="mb-1 flex justify-between text-[12px] font-semibold"><span>{name}</span><span className="text-[#b7791f]">{label}</span></div>
            <div className="h-6 rounded-[7px] bg-[#eef0f4]"><div className={`h-full rounded-[7px] ${color} ${width}`} /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BellIcon() {
  return <span className="grid size-5 place-items-center rounded-md border border-[#dfe3ea] text-[10px]">⌁</span>;
}

function RecentCustomers() {
  const customers = [
    ["080***1234", "Brake repair", "BR"],
    ["081***4412", "AC repair", "AC"],
    ["081***1002", "Wheel alignment", "WA"],
  ];
  return (
    <section className="rounded-[16px] bg-white p-5">
      <h2 className="mb-4 flex items-center gap-2 text-[15px] font-semibold"><UserRound className="size-4" /> Recent Feedback</h2>
      <div className="space-y-4">
        {customers.map(([name, type, initials]) => (
          <div key={name} className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-[12px] bg-[#e9edf4] text-[13px] font-semibold">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[#9aa0ad]">Name</p>
              <p className="text-[13px] font-semibold">{name}</p>
              <p className="text-[11px] text-[#7b8190]">Service<br />{type}</p>
            </div>
            <span className="text-[12px] font-semibold text-[#ec3042]">4.9/5</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OverviewPage() {
  return (
    <div className="pt-5">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-[28px] font-semibold tracking-[-0.03em]">Overview</h1>
        <div className="flex items-center gap-3">
          <button className="flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-semibold"><Home className="size-4" /> All AutoCare Branches <ChevronDown className="size-4" /></button>
          <button className="flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-semibold"><CalendarDays className="size-4" /> Today <ChevronDown className="size-4" /></button>
        </div>
      </div>
      <SummaryCards />
      <div className="mt-5 grid grid-cols-[1.05fr_1.35fr] gap-5">
        <TodayFeedbackFlow />
        <FeedbackChart />
        <TreatmentGauge />
        <div className="grid gap-5 md:grid-cols-2">
          <StockAlert />
          <RecentCustomers />
        </div>
      </div>
    </div>
  );
}
