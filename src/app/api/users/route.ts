import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";

/**
 * Upsert a user document linked by firebaseUid. When no DB is configured this
 * is a no-op that returns { stored: false } so the client can rely on local
 * storage instead.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { firebaseUid, email, emailVerified, collegeId, currentYear, name } = body;

  if (!firebaseUid) {
    return NextResponse.json({ error: "firebaseUid required" }, { status: 400 });
  }

  if (!isDbEnabled) {
    return NextResponse.json({ stored: false, mock: true });
  }

  try {
    await connectDb();
    const { User } = await import("@/models");
    const update: Record<string, unknown> = { email, emailVerified };
    if (name !== undefined) update.name = name;
    if (collegeId !== undefined) update.collegeId = collegeId || null;
    if (currentYear !== undefined) update.currentYear = currentYear;

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { $set: update, $setOnInsert: { firebaseUid, role: "student" } },
      { upsert: true, new: true }
    ).lean();

    return NextResponse.json({ stored: true, user });
  } catch (err) {
    return NextResponse.json(
      { stored: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
