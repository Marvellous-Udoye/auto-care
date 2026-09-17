"use client";

import * as React from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { feedbackRecords } from "@/constants/dashboard";

export function ReviewPage() {
  const reviewItems = feedbackRecords.filter((record) => record.status === "needs_review");

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Human review"
        title="Needs Review Queue"
        description="Low-confidence messages stay here until a teammate manually confirms sentiment and severity."
      />
      <div className="grid gap-4">
        {reviewItems.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.branch_name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <p className="rounded-[12px] border border-[#3a3a3a] bg-[#202020] p-4 text-[14px] font-semibold leading-relaxed text-[#d8d8d8]">{record.raw_text}</p>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <Label>Sentiment</Label>
                  <Select defaultValue={record.sentiment}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Sentiment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Severity</Label>
                  <Select defaultValue={String(record.severity)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <SelectItem key={item} value={String(item)}>Severity {item}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="self-end rounded-[12px] bg-[#ec3042] font-extrabold text-white hover:bg-[#ec3042]/90">
                  <Save className="size-4" /> Save override
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
