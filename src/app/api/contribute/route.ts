import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";

/**
 * Record a contributed resource (metadata only here; the file itself is
 * uploaded to Firebase Storage client-side and its URL passed in fileUrl).
 * New resources always start as status: "pending" awaiting moderation.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { topicId, collegeId, type, title, description, fileUrl, externalLink, year } =
    body;

  if (!type || !title) {
    return NextResponse.json(
      { error: "type and title are required" },
      { status: 400 }
    );
  }

  if (!isDbEnabled) {
    // Mock mode: accept the submission so the UX works end to end.
    return NextResponse.json({ stored: false, mock: true, status: "pending" });
  }

  try {
    await connectDb();
    const { Resource } = await import("@/models");
    const doc = await Resource.create({
      topicId,
      collegeId: collegeId || null,
      type,
      title,
      description,
      fileUrl,
      externalLink,
      year,
      status: "pending",
    });
    return NextResponse.json({ stored: true, id: String(doc._id), status: "pending" });
  } catch (err) {
    return NextResponse.json(
      { stored: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
