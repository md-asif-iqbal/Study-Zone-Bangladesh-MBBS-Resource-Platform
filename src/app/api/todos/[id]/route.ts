import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";

// PATCH /api/todos/:id  -> update the status/notes of a single topic todo.
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const { status, notes } = body;

  if (!isDbEnabled) {
    return NextResponse.json({ stored: false, mock: true });
  }
  try {
    await connectDb();
    const { TodoItem } = await import("@/models");
    const update: Record<string, unknown> = {};
    if (status !== undefined) {
      update.status = status;
      update.completedAt = status === "completed" ? new Date() : null;
    }
    if (notes !== undefined) update.notes = notes;
    const todo = await TodoItem.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
    return NextResponse.json({ stored: true, todo });
  } catch (err) {
    return NextResponse.json({ stored: false, error: (err as Error).message }, { status: 500 });
  }
}
