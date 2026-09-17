import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;

  return NextResponse.json({
    mode: "mock",
    path,
    message: "AutoCare dashboard proxy placeholder. Supabase, WhatsApp, and AI scoring adapters will attach here.",
  });
}
