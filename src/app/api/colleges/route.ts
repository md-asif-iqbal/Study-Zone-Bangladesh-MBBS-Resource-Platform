import { NextResponse } from "next/server";
import { getColleges } from "@/lib/content";

export async function GET() {
  const colleges = await getColleges();
  return NextResponse.json({ colleges });
}
