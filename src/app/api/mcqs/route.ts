import { NextRequest, NextResponse } from "next/server";
import { getMcqs } from "@/lib/content";

export async function GET(req: NextRequest) {
  const subjectId = req.nextUrl.searchParams.get("subjectId") ?? undefined;
  const topicId = req.nextUrl.searchParams.get("topicId") ?? undefined;
  const mcqs = await getMcqs({ subjectId, topicId });
  return NextResponse.json({ mcqs });
}
