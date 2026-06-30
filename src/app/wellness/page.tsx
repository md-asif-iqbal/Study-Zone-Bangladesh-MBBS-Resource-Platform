"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { HeartPulse, Phone, Save, Lightbulb } from "lucide-react";

const TIPS = [
  "Protect your sleep — consistent rest beats one extra late-night cram session before a card exam.",
  "Break study into focused blocks (e.g. 50 min study, 10 min break) instead of marathon sessions.",
  "It is normal to feel like an 'average' student after being a topper — almost everyone in medical college feels this.",
  "Talk to a senior or a friend when you feel overwhelmed. You are not alone in this.",
  "Move your body daily, even a short walk — it genuinely helps anxiety and focus.",
];

const HELPLINES = [
  { name: "Kaan Pete Roi (emotional support)", contact: "09612-119911" },
  { name: "National Mental Health Helpline", contact: "01688-709965" },
  { name: "Bangladesh Emergency", contact: "999" },
];

export default function WellnessPage() {
  const { user } = useAuth();
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setNote(localStorage.getItem(`sz_wellness_${user.uid}`) || "");
  }, [user]);

  function save() {
    if (!user) return;
    localStorage.setItem(`sz_wellness_${user.uid}`, note);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <AppShell>
      <PageHeader
        title="Wellness corner"
        subtitle="Medical school is hard. Looking after your mind matters as much as your marks."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
            <Lightbulb className="h-5 w-5 text-amber" strokeWidth={1.6} />
            Simple things that help
          </h2>
          <ul className="space-y-2">
            {TIPS.map((t) => (
              <li key={t} className="sz-card flex items-start gap-3 p-4 text-sm text-charcoal">
                <HeartPulse className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={1.6} />
                {t}
              </li>
            ))}
          </ul>

          <div className="sz-card mt-6 p-5">
            <h3 className="font-medium text-charcoal">Private note to self</h3>
            <p className="mt-0.5 text-sm text-charcoal-muted">
              A private space saved only on this device. Write what&apos;s on your mind.
            </p>
            <textarea
              className="sz-input mt-3 min-h-28 resize-y"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Today I'm feeling…"
            />
            <button onClick={save} className="sz-btn-primary mt-3">
              <Save className="h-4 w-4" strokeWidth={1.8} />
              {saved ? "Saved" : "Save note"}
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 font-serif text-lg font-semibold text-charcoal">
            <Phone className="h-5 w-5 text-teal" strokeWidth={1.6} />
            Helplines (Bangladesh)
          </h2>
          <ul className="space-y-2">
            {HELPLINES.map((h) => (
              <li key={h.name} className="sz-card p-4">
                <p className="text-sm font-medium text-charcoal">{h.name}</p>
                <a
                  href={`tel:${h.contact.replace(/[^0-9]/g, "")}`}
                  className="mt-0.5 inline-block text-sm text-teal hover:underline"
                >
                  {h.contact}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 px-1 text-xs text-charcoal-muted">
            If you are in crisis or thinking about harming yourself, please reach
            out to one of these lines or someone you trust right now.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
