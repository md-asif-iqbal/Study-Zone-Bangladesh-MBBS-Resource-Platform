import { NextRequest, NextResponse } from "next/server";
import { getTopics } from "@/lib/content";

export async function GET(req: NextRequest) {
  const subjectId = req.nextUrl.searchParams.get("subjectId");
  const topics = await getTopics(subjectId ?? undefined);
  return NextResponse.json({ topics });
}
