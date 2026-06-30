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
  Search,
  ShieldCheck,
  Clock,
  FolderTree,
  HeartPulse,
  CheckCircle2,
  Building2,
} from "lucide-react";

const PROBLEMS = [
  "Notes scattered across dozens of Facebook groups and Drive links",
  "Previous year questions impossible to find before a card exam",
  "No idea which topics are high-yield for your professional exam",
  "Seniors' tips lost in old chat threads",
];

const SOLUTIONS = [
  "One organized library for your exact college and year",
  "College-specific previous questions, sorted by year",
  "High-yield topics marked, with a built-in study tracker",
  "Ask your own college's seniors — anonymously if you want",
];

const FEATURES = [
  { icon: FileText, title: "Lecture Notes", desc: "Chapter-wise notes organized by subject and topic." },
  { icon: BookOpen, title: "Previous Year Questions", desc: "Card, term and professional archives scoped to your college." },
  { icon: ListChecks, title: "MCQ Practice", desc: "Topic-tagged MCQs with instant feedback and explanations." },
  { icon: Video, title: "Video Lectures", desc: "Curated links to the best free lectures — no clutter." },
  { icon: MessageSquareQuote, title: "Viva & Card Questions", desc: "Commonly asked viva points per subject." },
  { icon: CalendarDays, title: "Exam Routine & Tracker", desc: "Your college's routine plus a topic-by-topic study tracker." },
  { icon: Search, title: "Search Everything", desc: "One search bar across notes, questions, MCQs and guides." },
  { icon: HeartPulse, title: "Wellness Corner", desc: "Tips and helplines — because your mind matters too." },
];

const STATS = [
  { value: "126+", label: "Medical colleges covered" },
  { value: "All", label: "Govt · Private · Armed Forces" },
  { value: "1 place", label: "For everything you need" },
];

const AUDIENCE = [
  "1st & 2nd year (pre-clinical & para-clinical)",
  "3rd & final professional students",
  "Interns preparing for FCPS Part 1 / BCS",
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-bone">
      {/* Header */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-white px-4 lg:px-8">
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
          For Bangladesh MBBS &amp; BDS students
        </span>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight text-charcoal md:text-4xl xl:text-5xl">
          Stop hunting for your study materials. Start studying.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-charcoal-muted lg:text-lg">
          Select your medical college and year once — and instantly get the notes,
          previous year questions, MCQs, guide books and video lectures that
          actually matter for <span className="font-medium text-charcoal">your</span> exams.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/register" className="sz-btn-primary px-6 py-3 text-base">
            Select your college — free
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
          <Link href="/login" className="sz-btn-secondary px-6 py-3 text-base">
            I already have an account
          </Link>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className="sz-card p-5">
              <p className="font-serif text-3xl font-semibold text-teal">{s.value}</p>
              <p className="mt-1 text-sm text-charcoal-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why use it — problem vs solution */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-semibold text-charcoal lg:text-3xl">
              Why students use Study Zone
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-charcoal-muted">
              Medical study materials already exist — they&apos;re just scattered and
              disorganized. Study Zone fixes that.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Problem */}
            <div className="rounded-card border border-alert/30 bg-alert/5 p-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal">
                Without Study Zone
              </h3>
              <ul className="mt-4 space-y-3">
                {PROBLEMS.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-alert" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {/* Solution */}
            <div className="rounded-card border border-teal/30 bg-teal-light/50 p-6">
              <h3 className="font-serif text-lg font-semibold text-charcoal">
                With Study Zone
              </h3>
              <ul className="mt-4 space-y-3">
                {SOLUTIONS.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-charcoal">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={1.8} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center font-serif text-2xl font-semibold text-charcoal lg:text-3xl">
          Everything in one organized place
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      {/* Who it's for */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-charcoal lg:text-3xl">
                Built for every stage of MBBS
              </h2>
              <p className="mt-2 text-charcoal-muted">
                Whatever year you&apos;re in, Study Zone organizes around your exact
                college and phase — so you always know what to study next.
              </p>
              <ul className="mt-5 space-y-3">
                {AUDIENCE.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-sm text-charcoal">
                    <Building2 className="h-4 w-4 shrink-0 text-teal" strokeWidth={1.7} />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: FolderTree, t: "Organized", d: "By college, year, subject & topic" },
                { icon: Clock, t: "Exam-ready", d: "Track progress before each card exam" },
                { icon: ShieldCheck, t: "Trustworthy", d: "Moderated, community-verified content" },
                { icon: HeartPulse, t: "Supportive", d: "Wellness tips for the hard days" },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="sz-card p-4">
                  <Icon className="h-6 w-6 text-teal" strokeWidth={1.6} />
                  <p className="mt-2 font-medium text-charcoal">{t}</p>
                  <p className="text-xs text-charcoal-muted">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center font-serif text-2xl font-semibold text-charcoal lg:text-3xl">
          Get started in three steps
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { n: "1", t: "Create an account", d: "Sign up with your email and verify it — no phone OTP needed." },
            { n: "2", t: "Pick college + year", d: "Choose your medical college and current professional year." },
            { n: "3", t: "Study, track, contribute", d: "Open your personalized dashboard, track topics, and share notes." },
          ].map((s) => (
            <div key={s.n} className="sz-card p-6 text-center">
              <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-teal font-serif text-lg font-semibold text-white">
                {s.n}
              </span>
              <h3 className="mt-3 font-medium text-charcoal">{s.t}</h3>
              <p className="mt-1 text-sm text-charcoal-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-teal">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="font-serif text-2xl font-semibold text-white lg:text-3xl">
            Your next card exam is coming. Be ready.
          </h2>
          <p className="mt-2 text-teal-light">
            Join Study Zone and get everything organized for your college and year — free.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-base font-medium text-teal-dark transition-colors hover:bg-bone"
          >
            Select your college now
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      <footer className="bg-white py-8 text-center text-sm text-charcoal-muted">
        Study Zone — a community resource hub for Bangladeshi medical students.
      </footer>
    </div>
  );
}
