import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";

// GET /api/todos/summary?userId=&subjectId=  -> aggregated completion stats.
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const subjectId = req.nextUrl.searchParams.get("subjectId") ?? undefined;
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  if (!isDbEnabled) {
    return NextResponse.json({ summary: [], mock: true });
  }
  try {
    await connectDb();
    const { TodoItem } = await import("@/models");
    const match: Record<string, unknown> = { userId };
    if (subjectId) match.subjectId = subjectId;
    const summary = await TodoItem.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$subjectId",
          total: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
        },
      },
    ]);
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json({ summary: [], error: (err as Error).message });
  }
}
