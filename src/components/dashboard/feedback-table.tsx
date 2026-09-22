import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SentimentBadge, SeverityBadge, StatusBadge } from "@/components/dashboard/status-badge";
import type { FeedbackRecord } from "@/constants/dashboard";

export function FeedbackTable({ records }: { records: FeedbackRecord[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Branch</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead className="text-right">Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record.id}>
            <TableCell>
              <p className="font-medium text-[#111827]">{record.branch_name}</p>
              <span className="font-mono text-xs tracking-[0.08em] text-[#7b8190]">{record.job_id ?? "WEB"}</span>
            </TableCell>
            <TableCell><SentimentBadge sentiment={record.sentiment} /></TableCell>
            <TableCell><SeverityBadge record={record} /></TableCell>
            <TableCell><StatusBadge status={record.status} /></TableCell>
            <TableCell>{new Date(record.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</TableCell>
            <TableCell className="text-right">
              <Link href="/dashboard/feedback" className="inline-flex items-center gap-1 font-medium text-[#ec3042]">
                Open <ArrowUpRight className="size-4" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
