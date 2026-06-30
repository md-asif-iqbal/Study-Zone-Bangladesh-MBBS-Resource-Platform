import { NextRequest, NextResponse } from "next/server";
import { getSubjects } from "@/lib/content";
import type { StudyYear } from "@/lib/types";

export async function GET(req: NextRequest) {
  const year = req.nextUrl.searchParams.get("year") as StudyYear | null;
  const subjects = await getSubjects(year ?? undefined);
  return NextResponse.json({ subjects });
}
