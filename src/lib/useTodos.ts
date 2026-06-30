"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import type { TodoStatus } from "@/lib/types";

/**
 * Per-user topic progress, persisted in localStorage so the feature works in
 * preview without a database. When a DB is configured the same updates are
 * mirrored to /api/todos on a best-effort basis.
 */

export interface TodoMap {
  // topicId -> { status, notes }
  [topicId: string]: { status: TodoStatus; notes?: string };
}

const STATUS_CYCLE: TodoStatus[] = ["not_started", "in_progress", "completed"];

function storageKey(uid: string) {
  return `sz_todos_${uid}`;
}

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState<TodoMap>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      setTodos({});
      setReady(true);
      return;
    }
    try {
      const raw = localStorage.getItem(storageKey(user.uid));
      setTodos(raw ? JSON.parse(raw) : {});
    } catch {
      setTodos({});
    }
    setReady(true);
  }, [user]);

  const persist = useCallback(
    (next: TodoMap) => {
      if (!user) return;
      setTodos(next);
      localStorage.setItem(storageKey(user.uid), JSON.stringify(next));
    },
    [user]
  );

  const setStatus = useCallback(
    (topicId: string, subjectId: string, status: TodoStatus) => {
      if (!user) return;
      const next = {
        ...todos,
        [topicId]: { ...todos[topicId], status },
      };
      persist(next);
      void fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid, topicId, subjectId, status }),
      }).catch(() => {});
    },
    [todos, persist, user]
  );

  const cycleStatus = useCallback(
    (topicId: string, subjectId: string) => {
      const current = todos[topicId]?.status ?? "not_started";
      const idx = STATUS_CYCLE.indexOf(current);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      setStatus(topicId, subjectId, next);
    },
    [todos, setStatus]
  );

  const setNote = useCallback(
    (topicId: string, notes: string) => {
      if (!user) return;
      const next = {
        ...todos,
        [topicId]: {
          status: todos[topicId]?.status ?? "not_started",
          notes,
        },
      };
      persist(next);
    },
    [todos, persist, user]
  );

  const statusOf = useCallback(
    (topicId: string): TodoStatus => todos[topicId]?.status ?? "not_started",
    [todos]
  );

  return { todos, ready, statusOf, setStatus, cycleStatus, setNote };
}
