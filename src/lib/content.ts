import { connectDb, isDbEnabled } from "@/lib/mongodb";
import { COLLEGES } from "@/data/colleges";
import { SUBJECTS, TOPICS } from "@/data/curriculum";
import { RESOURCES, MCQS, EXAM_ROUTINES } from "@/data/resources";
import type {
  College,
  ExamRoutine,
  MCQ,
  Resource,
  StudyYear,
  Subject,
  Topic,
} from "@/lib/types";

/**
 * Content provider. Returns data from MongoDB when MONGODB_URI is configured,
 * otherwise serves the bundled seed dataset so the full app is previewable.
 *
 * The DB branch is intentionally defensive: any connection/query error falls
 * back to seed data rather than crashing a page.
 */

async function withDb<T>(seed: T, dbFn: () => Promise<T>): Promise<T> {
  if (!isDbEnabled) return seed;
  try {
    const conn = await connectDb();
    if (!conn) return seed;
    return await dbFn();
  } catch {
    return seed;
  }
}

export async function getColleges(): Promise<College[]> {
  return withDb(COLLEGES, async () => {
    const { College: M } = await import("@/models");
    const docs = await M.find().lean();
    return docs.map((d: Record<string, unknown>) => ({
      id: String(d._id),
      name: d.name as string,
      type: d.type as College["type"],
      location: (d.location as string) ?? "",
      affiliatedUniversity: (d.affiliatedUniversity as string) ?? "",
    }));
  });
}

export async function getSubjects(year?: StudyYear): Promise<Subject[]> {
  const all = await withDb(SUBJECTS, async () => {
    const { Subject: M } = await import("@/models");
    const docs = await M.find().lean();
    return docs.map((d: Record<string, unknown>) => ({
      id: String(d._id),
      name: d.name as string,
      year: d.year as StudyYear,
      icon: d.icon as string | undefined,
    }));
  });
  return year ? all.filter((s) => s.year === year) : all;
}

export async function getTopics(subjectId?: string): Promise<Topic[]> {
  const all = await withDb(TOPICS, async () => {
    const { Topic: M } = await import("@/models");
    const docs = await M.find().sort({ order: 1 }).lean();
    return docs.map((d: Record<string, unknown>) => ({
      id: String(d._id),
      subjectId: String(d.subjectId),
      name: d.name as string,
      order: (d.order as number) ?? 0,
      highYield: Boolean(d.highYield),
    }));
  });
  return subjectId ? all.filter((t) => t.subjectId === subjectId) : all;
}

export async function getResources(filters?: {
  topicId?: string;
  collegeId?: string | null;
}): Promise<Resource[]> {
  const all = await withDb(RESOURCES, async () => {
    const { Resource: M } = await import("@/models");
    const docs = await M.find({ status: "approved" }).lean();
    return docs.map(mapResource);
  });

  let list = all.filter((r) => r.status === "approved");
  if (filters?.topicId) list = list.filter((r) => r.topicId === filters.topicId);
  if (filters?.collegeId !== undefined) {
    // For previous_question scope to the user college OR national (null).
    list = list.filter(
      (r) => r.collegeId === null || r.collegeId === filters.collegeId
    );
  }
  return list;
}

export async function getMcqs(filters?: {
  subjectId?: string;
  topicId?: string;
}): Promise<MCQ[]> {
  const all = await withDb(MCQS, async () => {
    const { MCQ: M } = await import("@/models");
    const docs = await M.find().lean();
    return docs.map((d: Record<string, unknown>) => ({
      id: String(d._id),
      topicId: String(d.topicId),
      subjectId: String(d.subjectId ?? ""),
      question: d.question as string,
      options: (d.options as string[]) ?? [],
      correctIndex: (d.correctIndex as number) ?? 0,
      explanation: (d.explanation as string) ?? "",
    }));
  });

  let list = all;
  if (filters?.subjectId) list = list.filter((m) => m.subjectId === filters.subjectId);
  if (filters?.topicId) list = list.filter((m) => m.topicId === filters.topicId);
  return list;
}

export async function getExamRoutines(filters?: {
  collegeId?: string;
  year?: StudyYear;
}): Promise<ExamRoutine[]> {
  const all = await withDb(EXAM_ROUTINES, async () => {
    const { ExamRoutine: M } = await import("@/models");
    const docs = await M.find().sort({ date: 1 }).lean();
    return docs.map((d: Record<string, unknown>) => ({
      id: String(d._id),
      collegeId: String(d.collegeId),
      year: d.year as StudyYear,
      examName: d.examName as string,
      date: new Date(d.date as string).toISOString().slice(0, 10),
    }));
  });

  let list = all;
  if (filters?.collegeId) list = list.filter((e) => e.collegeId === filters.collegeId);
  if (filters?.year) list = list.filter((e) => e.year === filters.year);
  return list;
}

function mapResource(d: Record<string, unknown>): Resource {
  return {
    id: String(d._id),
    topicId: String(d.topicId),
    collegeId: d.collegeId ? String(d.collegeId) : null,
    type: d.type as Resource["type"],
    title: (d.title as string) ?? "",
    description: d.description as string | undefined,
    fileUrl: d.fileUrl as string | undefined,
    externalLink: d.externalLink as string | undefined,
    uploaderName: d.uploaderName as string | undefined,
    status: d.status as Resource["status"],
    year: d.year as string | undefined,
    createdAt: d.createdAt
      ? new Date(d.createdAt as string).toISOString().slice(0, 10)
      : undefined,
  };
}
