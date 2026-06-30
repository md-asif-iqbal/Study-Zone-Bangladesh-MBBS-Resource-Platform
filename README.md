# Study Zone

A Bangladesh-wide resource platform for MBBS/BDS students. Select your medical
college and professional year once, and get everything organized in one place:
lecture notes, college-specific previous year questions, guide-book listings,
curated video lectures, topic-tagged MCQ practice, viva questions, your
college's exam routine, and a per-topic study tracker.

Built by merging the v2 Full Platform Spec, the v3 Database/Todo addendum, and
pre-clinical student research into a single Next.js application.

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS — clean clinical/academic aesthetic, no gradients
- **Database:** MongoDB via Mongoose (structured content + progress)
- **Auth:** Firebase Auth — email + password with **email verification** (no phone OTP)
- **File storage:** Firebase Storage (contributed notes / previous questions)
- **Icons / fonts:** lucide-react, Source Serif 4 (headings) + Inter (body)

## Runs without credentials (preview mode)

The app ships with a bundled seed dataset (sample colleges, subjects, topics,
resources and MCQs). When `MONGODB_URI` and the `NEXT_PUBLIC_FIREBASE_*` keys are
**not** set, the app automatically runs in preview mode:

- Auth uses a local mock with a simulated email-verification step.
- Content is served from the seed data.
- Todos, community posts and wellness notes are stored in `localStorage`.

Set the environment variables to switch to real MongoDB + Firebase.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # optional — fill in for real backends
npm run dev
```

Open http://localhost:3000.

### Preview flow (no backend needed)

1. Sign up with any email + password.
2. On the verify-email screen, click **Simulate email verification**.
3. Pick a college and year.
4. Explore the dashboard, subjects, MCQ practice, contribute flow and more.

## Environment variables

See `.env.local.example`. Never commit `.env.local` (it is gitignored).

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string (content + progress) |
| `NEXT_PUBLIC_FIREBASE_*` | Firebase web config (auth + storage) |
| `SEED_SECRET` | Optional secret protecting the DB seed endpoint |

## Seeding the database

The bundled dataset (all Bangladesh government, private and armed-forces medical
colleges, the BMDC curriculum, real guide-book listings, real YouTube lecture
links, MCQs, viva questions and exam routines) can be pushed into MongoDB once
`MONGODB_URI` is configured:

```bash
# Clears the content collections and re-inserts everything (idempotent).
curl -X POST "http://localhost:3000/api/admin/seed?confirm=true" \
  -H "x-seed-secret: <SEED_SECRET if set>"
```

This maps the seed slug ids to real Mongo ObjectIds while preserving all
relationships. User accounts and todo progress are never touched.

## Project structure

```
src/
  app/            # App Router pages + API route handlers
  components/     # Shared UI (AppShell, CollegePicker, ResourceHub, ui primitives)
  lib/            # auth context, db/firebase connectors, content provider, hooks
  models/         # Mongoose models (8 collections)
  data/           # bundled seed dataset
```

## Content & legal notes

- Previous year questions and notes are community-contributed and moderated
  (`status: pending` until approved).
- Guide books are listings only (cover/description + buy/borrow link) — no
  hosted copyrighted PDFs.
- Video lectures are external links only.

## Roadmap (post-MVP)

- Wire real MongoDB + Firebase and seed the full 110+ college database.
- Web push / email notifications (Firebase Cloud Messaging).
- YouTube Data API auto-aggregation for video links (metadata only).
- Bangla/English content toggle and OSPE/practical hubs.
