import { NextRequest, NextResponse } from "next/server";
import { getExamRoutines } from "@/lib/content";
import type { StudyYear } from "@/lib/types";

export async function GET(req: NextRequest) {
  const collegeId = req.nextUrl.searchParams.get("collegeId") ?? undefined;
  const year = (req.nextUrl.searchParams.get("year") as StudyYear | null) ?? undefined;
  const routines = await getExamRoutines({ collegeId, year });
  return NextResponse.json({ routines });
}
