import { NextRequest, NextResponse } from "next/server";
import { getResources } from "@/lib/content";

export async function GET(req: NextRequest) {
  const topicId = req.nextUrl.searchParams.get("topicId") ?? undefined;
  const collegeParam = req.nextUrl.searchParams.get("collegeId");
  const collegeId =
    collegeParam === null ? undefined : collegeParam === "" ? null : collegeParam;
  const resources = await getResources({ topicId, collegeId });
  return NextResponse.json({ resources });
}
