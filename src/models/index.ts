import mongoose, { Schema, model, models } from "mongoose";

/**
 * Mongoose models per the v3 Database addendum. Using `models.X || model(...)`
 * guards against redefinition during Next.js hot reload.
 */

const CollegeSchema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["government", "private", "armed_forces"],
      required: true,
    },
    location: String,
    affiliatedUniversity: String,
  },
  { timestamps: true }
);

const SubjectSchema = new Schema({
  name: { type: String, required: true },
  year: {
    type: String,
    enum: ["1st", "2nd", "3rd", "4th", "internship"],
    required: true,
  },
  icon: String,
});

const TopicSchema = new Schema({
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
  name: { type: String, required: true },
  order: Number,
  highYield: { type: Boolean, default: false },
});

const ResourceSchema = new Schema(
  {
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    collegeId: { type: Schema.Types.ObjectId, ref: "College", default: null },
    type: {
      type: String,
      enum: [
        "note",
        "previous_question",
        "guide_listing",
        "video_link",
        "viva_question",
      ],
      required: true,
    },
    title: String,
    description: String,
    fileUrl: String,
    externalLink: String,
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    uploaderName: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    year: String,
  },
  { timestamps: true }
);

const MCQSchema = new Schema({
  topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject" },
  question: String,
  options: [String],
  correctIndex: Number,
  explanation: String,
});

const ExamRoutineSchema = new Schema({
  collegeId: { type: Schema.Types.ObjectId, ref: "College", required: true },
  year: String,
  examName: String,
  date: Date,
});

const UserSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: String,
    emailVerified: { type: Boolean, default: false },
    name: String,
    collegeId: { type: Schema.Types.ObjectId, ref: "College" },
    currentYear: String,
    role: {
      type: String,
      enum: ["student", "contributor", "moderator"],
      default: "student",
    },
  },
  { timestamps: true }
);

const TodoItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    topicId: { type: Schema.Types.ObjectId, ref: "Topic", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    status: {
      type: String,
      enum: ["not_started", "in_progress", "completed"],
      default: "not_started",
    },
    completedAt: Date,
    notes: String,
  },
  { timestamps: true }
);

export const College = models.College || model("College", CollegeSchema);
export const Subject = models.Subject || model("Subject", SubjectSchema);
export const Topic = models.Topic || model("Topic", TopicSchema);
export const Resource = models.Resource || model("Resource", ResourceSchema);
export const MCQ = models.MCQ || model("MCQ", MCQSchema);
export const ExamRoutine =
  models.ExamRoutine || model("ExamRoutine", ExamRoutineSchema);
export const User = models.User || model("User", UserSchema);
export const TodoItem = models.TodoItem || model("TodoItem", TodoItemSchema);

export { mongoose };
