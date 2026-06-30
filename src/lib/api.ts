import type {
  College,
  ExamRoutine,
  MCQ,
  Resource,
  StudyYear,
  Subject,
  Topic,
} from "@/lib/types";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${url}`);
  return res.json();
}

export async function fetchColleges(): Promise<College[]> {
  const { colleges } = await getJson<{ colleges: College[] }>("/api/colleges");
  return colleges;
}

export async function fetchSubjects(year?: StudyYear): Promise<Subject[]> {
  const q = year ? `?year=${year}` : "";
  const { subjects } = await getJson<{ subjects: Subject[] }>(`/api/subjects${q}`);
  return subjects;
}

export async function fetchTopics(subjectId?: string): Promise<Topic[]> {
  const q = subjectId ? `?subjectId=${subjectId}` : "";
  const { topics } = await getJson<{ topics: Topic[] }>(`/api/topics${q}`);
  return topics;
}

export async function fetchResources(
  topicId?: string,
  collegeId?: string | null
): Promise<Resource[]> {
  const params = new URLSearchParams();
  if (topicId) params.set("topicId", topicId);
  if (collegeId !== undefined && collegeId !== null) params.set("collegeId", collegeId);
  const qs = params.toString();
  const { resources } = await getJson<{ resources: Resource[] }>(
    `/api/resources${qs ? `?${qs}` : ""}`
  );
  return resources;
}

export async function fetchMcqs(
  subjectId?: string,
  topicId?: string
): Promise<MCQ[]> {
  const params = new URLSearchParams();
  if (subjectId) params.set("subjectId", subjectId);
  if (topicId) params.set("topicId", topicId);
  const qs = params.toString();
  const { mcqs } = await getJson<{ mcqs: MCQ[] }>(`/api/mcqs${qs ? `?${qs}` : ""}`);
  return mcqs;
}

export async function fetchExamRoutines(
  collegeId?: string,
  year?: StudyYear
): Promise<ExamRoutine[]> {
  const params = new URLSearchParams();
  if (collegeId) params.set("collegeId", collegeId);
  if (year) params.set("year", year);
  const qs = params.toString();
  const { routines } = await getJson<{ routines: ExamRoutine[] }>(
    `/api/exam-routines${qs ? `?${qs}` : ""}`
  );
  return routines;
}

export async function submitContribution(payload: {
  topicId?: string;
  collegeId?: string | null;
  type: Resource["type"];
  title: string;
  description?: string;
  fileUrl?: string;
  externalLink?: string;
  year?: string;
}): Promise<{ status: string; mock?: boolean }> {
  const res = await fetch("/api/contribute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
