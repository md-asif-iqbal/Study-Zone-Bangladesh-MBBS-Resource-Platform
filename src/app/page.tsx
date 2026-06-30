import Link from "next/link";
import {
  Stethoscope,
  FileText,
  ListChecks,
  CalendarDays,
  BookOpen,
  Video,
  MessageSquareQuote,
  ArrowRight,
} from "lucide-react";

const FEATURES = [
  { icon: FileText, title: "Lecture Notes", desc: "Chapter-wise notes organized by subject and topic." },
  { icon: BookOpen, title: "Previous Year Questions", desc: "Card, term and professional exam archives scoped to your college." },
  { icon: ListChecks, title: "MCQ Practice", desc: "Topic-tagged MCQs with instant feedback and explanations." },
  { icon: Video, title: "Video Lectures", desc: "Curated links to the best free lectures — no clutter." },
  { icon: MessageSquareQuote, title: "Viva & Card Questions", desc: "Commonly asked viva points per subject." },
  { icon: CalendarDays, title: "Exam Routine & Tracker", desc: "Your college's routine plus a topic-by-topic study tracker." },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-bone">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-teal text-white">
            <Stethoscope className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-lg font-semibold text-charcoal">
            Study Zone
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="sz-btn-secondary">
            Log in
          </Link>
          <Link href="/register" className="sz-btn-primary">
            Sign up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 py-14 text-center lg:py-20">
        <span className="sz-badge bg-teal-light text-teal-dark">
          For Bangladesh MBBS & BDS students
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl xl:text-5xl">
          Select your college and year once. Everything you need is already
          organized.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-charcoal-muted">
          Notes, previous year questions, guide books, MCQs, video lectures and
          viva questions — for your exact college and professional year. No more
          digging through scattered Facebook groups and Drive links.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="sz-btn-primary px-6 py-3 text-base">
            Select your college
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link href="/login" className="sz-btn-secondary px-6 py-3 text-base">
            I already have an account
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="sz-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-light text-teal-dark">
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-3 font-serif text-lg font-semibold text-charcoal">
                {title}
              </h3>
              <p className="mt-1 text-sm text-charcoal-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <h2 className="text-center font-serif text-2xl font-semibold text-charcoal">
            How it works
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { n: "1", t: "Create an account", d: "Sign up with your email and verify it — no phone OTP needed." },
              { n: "2", t: "Pick college + year", d: "Choose your medical college and current professional year." },
              { n: "3", t: "Study, track, contribute", d: "Open your personalized dashboard, track topics, and share notes." },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-teal font-serif text-base font-semibold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 font-medium text-charcoal">{s.t}</h3>
                <p className="mt-1 text-sm text-charcoal-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-line bg-white py-8 text-center text-sm text-charcoal-muted">
        Study Zone — a community resource hub for Bangladeshi medical students.
      </footer>
    </div>
  );
}
