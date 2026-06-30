export type CollegeType = "government" | "private" | "armed_forces";

export type StudyYear = "1st" | "2nd" | "3rd" | "4th" | "internship";

export type ResourceType =
  | "note"
  | "previous_question"
  | "guide_listing"
  | "video_link"
  | "viva_question";

export type ResourceStatus = "pending" | "approved" | "rejected";

export type TodoStatus = "not_started" | "in_progress" | "completed";

export type UserRole = "student" | "contributor" | "moderator";

export interface College {
  id: string;
  name: string;
  type: CollegeType;
  location: string;
  affiliatedUniversity: string;
}

export interface Subject {
  id: string;
  name: string;
  year: StudyYear;
  icon?: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  highYield?: boolean;
}

export interface Resource {
  id: string;
  topicId: string;
  collegeId: string | null; // null = shared nationally
  type: ResourceType;
  title: string;
  description?: string;
  fileUrl?: string;
  externalLink?: string;
  uploadedBy?: string;
  uploaderName?: string;
  status: ResourceStatus;
  year?: string; // exam year for previous_question
  createdAt?: string;
}

export interface MCQ {
  id: string;
  topicId: string;
  subjectId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ExamRoutine {
  id: string;
  collegeId: string;
  year: StudyYear;
  examName: string;
  date: string; // ISO date
}

export interface UserProfile {
  uid: string;
  email: string;
  emailVerified: boolean;
  name: string;
  collegeId: string | null;
  currentYear: StudyYear | null;
  role: UserRole;
}

export interface TodoItem {
  id: string;
  userId: string;
  topicId: string;
  subjectId: string;
  status: TodoStatus;
  completedAt?: string | null;
  notes?: string;
}
