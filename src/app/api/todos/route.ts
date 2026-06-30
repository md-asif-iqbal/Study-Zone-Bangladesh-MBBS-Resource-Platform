import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";

// GET /api/todos?userId=  -> all todo items for a user (DB mode).
// In mock mode the client uses localStorage, so this returns an empty set.
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }
  if (!isDbEnabled) {
    return NextResponse.json({ todos: [], mock: true });
  }
  try {
    await connectDb();
    const { TodoItem } = await import("@/models");
    const todos = await TodoItem.find({ userId }).lean();
    return NextResponse.json({ todos });
  } catch (err) {
    return NextResponse.json({ todos: [], error: (err as Error).message });
  }
}

// POST upsert a todo item { userId, topicId, subjectId, status, notes }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { userId, topicId, subjectId, status, notes } = body;
  if (!userId || !topicId) {
    return NextResponse.json({ error: "userId and topicId required" }, { status: 400 });
  }
  if (!isDbEnabled) {
    return NextResponse.json({ stored: false, mock: true });
  }
  try {
    await connectDb();
    const { TodoItem } = await import("@/models");
    const completedAt = status === "completed" ? new Date() : null;
    const todo = await TodoItem.findOneAndUpdate(
      { userId, topicId },
      { $set: { subjectId, status, notes, completedAt } },
      { upsert: true, new: true }
    ).lean();
    return NextResponse.json({ stored: true, todo });
  } catch (err) {
    return NextResponse.json({ stored: false, error: (err as Error).message }, { status: 500 });
  }
}
