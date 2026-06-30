"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, EmptyState } from "@/components/ui";
import { useAuth } from "@/lib/AuthContext";
import { fetchColleges } from "@/lib/api";
import { MessagesSquare, Send } from "lucide-react";

interface Post {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  anonymous?: boolean;
}

export default function CommunityPage() {
  return (
    <AppShell>
      <CommunityInner />
    </AppShell>
  );
}

function CommunityInner() {
  const { user } = useAuth();
  const [collegeName, setCollegeName] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const storageKey = useMemo(
    () => (user?.collegeId ? `sz_community_${user.collegeId}` : null),
    [user?.collegeId]
  );

  useEffect(() => {
    if (!user) return;
    fetchColleges().then((colleges) =>
      setCollegeName(colleges.find((c) => c.id === user.collegeId)?.name ?? "")
    );
  }, [user]);

  useEffect(() => {
    if (!storageKey) return;
    try {
      setPosts(JSON.parse(localStorage.getItem(storageKey) || "[]"));
    } catch {
      setPosts([]);
    }
  }, [storageKey]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !storageKey || !user) return;
    const post: Post = {
      id: `p_${Date.now()}`,
      author: anonymous ? "Anonymous" : user.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      anonymous,
    };
    const next = [post, ...posts];
    setPosts(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setText("");
  }

  return (
    <div>
      <PageHeader
        title="Community Q&A"
        subtitle={`Ask and answer questions with students from ${collegeName || "your college"}.`}
      />

      <form onSubmit={submit} className="sz-card mb-6 p-4">
        <textarea
          className="sz-input min-h-20 resize-y"
          placeholder="Ask your college-specific question (e.g. which faculty takes the anatomy viva this term?)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <label className="tap-target flex cursor-pointer select-none items-center gap-2 text-sm text-charcoal">
            <input
              type="checkbox"
              className="h-4 w-4 accent-teal"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>
          <button type="submit" className="sz-btn-primary" disabled={!text.trim()}>
            <Send className="h-4 w-4" strokeWidth={1.8} />
            Post question
          </button>
        </div>
      </form>

      {posts.length === 0 ? (
        <EmptyState
          title="No questions yet"
          hint="Be the first to start a discussion for your college."
        />
      ) : (
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.id} className="sz-card p-4">
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full text-sm font-medium ${
                    p.anonymous
                      ? "bg-bone-dark text-charcoal-muted"
                      : "bg-teal-light text-teal-dark"
                  }`}
                >
                  {p.anonymous ? "?" : p.author.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-charcoal">
                    {p.author}
                    {p.anonymous && (
                      <span className="sz-badge bg-bone-dark text-charcoal-muted">
                        Anonymous
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-charcoal-muted">
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-start gap-2 text-sm text-charcoal">
                <MessagesSquare className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-muted" strokeWidth={1.6} />
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
