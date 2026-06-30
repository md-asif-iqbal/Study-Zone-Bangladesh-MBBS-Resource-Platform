import { NextRequest, NextResponse } from "next/server";
import { connectDb, isDbEnabled } from "@/lib/mongodb";
import { COLLEGES } from "@/data/colleges";
import { SUBJECTS, TOPICS } from "@/data/curriculum";
import { RESOURCES, MCQS, EXAM_ROUTINES } from "@/data/resources";

/**
 * Seed the MongoDB database from the bundled dataset, mapping the human-readable
 * slug ids used in the seed files to real Mongo ObjectIds while preserving all
 * relationships (subject -> topic -> resource/mcq, college -> resource/routine).
 *
 * Idempotent: it clears the content collections (NOT users/todos) and re-inserts.
 *
 * Usage: POST /api/admin/seed?confirm=true
 *   - Requires MONGODB_URI to be configured.
 *   - If SEED_SECRET is set, pass it as the `x-seed-secret` header.
 */
export async function POST(req: NextRequest) {
  if (!isDbEnabled) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "MONGODB_URI is not configured. The app serves the same dataset from seed in preview mode.",
      },
      { status: 400 }
    );
  }

  if (req.nextUrl.searchParams.get("confirm") !== "true") {
    return NextResponse.json(
      { ok: false, error: "Add ?confirm=true to confirm. This clears content collections." },
      { status: 400 }
    );
  }

  const secret = process.env.SEED_SECRET;
  if (secret && req.headers.get("x-seed-secret") !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDb();
    const { College, Subject, Topic, Resource, MCQ, ExamRoutine } = await import(
      "@/models"
    );

    // Clear content collections (preserve users + todos)
    await Promise.all([
      College.deleteMany({}),
      Subject.deleteMany({}),
      Topic.deleteMany({}),
      Resource.deleteMany({}),
      MCQ.deleteMany({}),
      ExamRoutine.deleteMany({}),
    ]);

    // Colleges
    const collegeMap = new Map<string, unknown>();
    for (const c of COLLEGES) {
      const doc = await College.create({
        name: c.name,
        type: c.type,
        location: c.location,
        affiliatedUniversity: c.affiliatedUniversity,
      });
      collegeMap.set(c.id, doc._id);
    }

    // Subjects
    const subjectMap = new Map<string, unknown>();
    for (const s of SUBJECTS) {
      const doc = await Subject.create({ name: s.name, year: s.year, icon: s.icon });
      subjectMap.set(s.id, doc._id);
    }

    // Topics
    const topicMap = new Map<string, unknown>();
    for (const t of TOPICS) {
      const doc = await Topic.create({
        subjectId: subjectMap.get(t.subjectId),
        name: t.name,
        order: t.order,
        highYield: Boolean(t.highYield),
      });
      topicMap.set(t.id, doc._id);
    }

    // Resources
    let resourceCount = 0;
    for (const r of RESOURCES) {
      const topicId = topicMap.get(r.topicId);
      if (!topicId) continue;
      await Resource.create({
        topicId,
        collegeId: r.collegeId ? collegeMap.get(r.collegeId) ?? null : null,
        type: r.type,
        title: r.title,
        description: r.description,
        fileUrl: r.fileUrl,
        externalLink: r.externalLink,
        uploaderName: r.uploaderName,
        status: r.status,
        year: r.year,
      });
      resourceCount++;
    }

    // MCQs
    let mcqCount = 0;
    for (const m of MCQS) {
      const topicId = topicMap.get(m.topicId);
      if (!topicId) continue;
      await MCQ.create({
        topicId,
        subjectId: subjectMap.get(m.subjectId),
        question: m.question,
        options: m.options,
        correctIndex: m.correctIndex,
        explanation: m.explanation,
      });
      mcqCount++;
    }

    // Exam routines
    let routineCount = 0;
    for (const e of EXAM_ROUTINES) {
      const collegeId = collegeMap.get(e.collegeId);
      if (!collegeId) continue;
      await ExamRoutine.create({
        collegeId,
        year: e.year,
        examName: e.examName,
        date: new Date(e.date),
      });
      routineCount++;
    }

    return NextResponse.json({
      ok: true,
      seeded: {
        colleges: collegeMap.size,
        subjects: subjectMap.size,
        topics: topicMap.size,
        resources: resourceCount,
        mcqs: mcqCount,
        examRoutines: routineCount,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
