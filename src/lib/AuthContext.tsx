"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  updateProfile as fbUpdateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth, isFirebaseEnabled } from "@/lib/firebase";
import type { StudyYear, UserProfile } from "@/lib/types";

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  mockMode: boolean;
  register: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<void>;
  refreshVerification: () => Promise<boolean>;
  setOnboarding: (collegeId: string, year: StudyYear) => void;
  /** Mock-mode only: simulate clicking the verification email link. */
  simulateVerify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ---- localStorage helpers (profile/onboarding live here in both modes) ----
const SESSION_KEY = "sz_session_uid";
const MOCK_USERS_KEY = "sz_mock_users";

interface MockUserRecord {
  uid: string;
  email: string;
  password: string;
  name: string;
  verified: boolean;
}

function readMockUsers(): MockUserRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeMockUsers(users: MockUserRecord[]) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
}

function profileKey(uid: string) {
  return `sz_profile_${uid}`;
}

interface StoredProfile {
  collegeId: string | null;
  currentYear: StudyYear | null;
}

function readProfile(uid: string): StoredProfile {
  if (typeof window === "undefined") return { collegeId: null, currentYear: null };
  try {
    return (
      JSON.parse(localStorage.getItem(profileKey(uid)) || "null") || {
        collegeId: null,
        currentYear: null,
      }
    );
  } catch {
    return { collegeId: null, currentYear: null };
  }
}

function writeProfile(uid: string, p: StoredProfile) {
  localStorage.setItem(profileKey(uid), JSON.stringify(p));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const buildProfile = useCallback(
    (base: Omit<UserProfile, "collegeId" | "currentYear" | "role">): UserProfile => {
      const stored = readProfile(base.uid);
      return {
        ...base,
        collegeId: stored.collegeId,
        currentYear: stored.currentYear,
        role: "student",
      };
    },
    []
  );

  // ---- Bootstrap: subscribe to Firebase or restore mock session ----
  useEffect(() => {
    if (isFirebaseEnabled && auth) {
      const unsub = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          setUser(
            buildProfile({
              uid: fbUser.uid,
              email: fbUser.email || "",
              emailVerified: fbUser.emailVerified,
              name: fbUser.displayName || fbUser.email?.split("@")[0] || "Student",
            })
          );
          // Best-effort sync to MongoDB-backed API (no-op without DB env).
          void syncUser(fbUser.uid, fbUser.email || "", fbUser.emailVerified);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsub();
    }

    // Mock mode
    const uid =
      typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
    if (uid) {
      const rec = readMockUsers().find((u) => u.uid === uid);
      if (rec) {
        setUser(
          buildProfile({
            uid: rec.uid,
            email: rec.email,
            emailVerified: rec.verified,
            name: rec.name,
          })
        );
      }
    }
    setLoading(false);
  }, [buildProfile]);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      if (isFirebaseEnabled && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await fbUpdateProfile(cred.user, { displayName: name });
        await sendEmailVerification(cred.user);
        return;
      }
      // Mock mode
      const users = readMockUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("An account with this email already exists.");
      }
      const uid = `mock_${Date.now()}`;
      users.push({ uid, email, password, name, verified: false });
      writeMockUsers(users);
      localStorage.setItem(SESSION_KEY, uid);
      setUser(
        buildProfile({ uid, email, emailVerified: false, name })
      );
    },
    [buildProfile]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      if (isFirebaseEnabled && auth) {
        await signInWithEmailAndPassword(auth, email, password);
        return;
      }
      const users = readMockUsers();
      const rec = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (!rec || rec.password !== password) {
        throw new Error("Invalid email or password.");
      }
      localStorage.setItem(SESSION_KEY, rec.uid);
      setUser(
        buildProfile({
          uid: rec.uid,
          email: rec.email,
          emailVerified: rec.verified,
          name: rec.name,
        })
      );
    },
    [buildProfile]
  );

  const logout = useCallback(async () => {
    if (isFirebaseEnabled && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem(SESSION_KEY);
      setUser(null);
    }
  }, []);

  const resendVerification = useCallback(async () => {
    if (isFirebaseEnabled && auth?.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
    // Mock mode: nothing to send; user uses simulateVerify().
  }, []);

  const refreshVerification = useCallback(async (): Promise<boolean> => {
    if (isFirebaseEnabled && auth?.currentUser) {
      await auth.currentUser.reload();
      const verified = auth.currentUser.emailVerified;
      setUser((prev) => (prev ? { ...prev, emailVerified: verified } : prev));
      return verified;
    }
    if (user) {
      const rec = readMockUsers().find((u) => u.uid === user.uid);
      return rec?.verified ?? false;
    }
    return false;
  }, [user]);

  const simulateVerify = useCallback(async () => {
    if (!user) return;
    const users = readMockUsers();
    const idx = users.findIndex((u) => u.uid === user.uid);
    if (idx >= 0) {
      users[idx].verified = true;
      writeMockUsers(users);
      setUser((prev) => (prev ? { ...prev, emailVerified: true } : prev));
    }
  }, [user]);

  const setOnboarding = useCallback(
    (collegeId: string, year: StudyYear) => {
      if (!user) return;
      writeProfile(user.uid, { collegeId, currentYear: year });
      setUser((prev) => (prev ? { ...prev, collegeId, currentYear: year } : prev));
      void syncUser(user.uid, user.email, user.emailVerified, collegeId, year);
    },
    [user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      mockMode: !isFirebaseEnabled,
      register,
      login,
      logout,
      resendVerification,
      refreshVerification,
      setOnboarding,
      simulateVerify,
    }),
    [
      user,
      loading,
      register,
      login,
      logout,
      resendVerification,
      refreshVerification,
      setOnboarding,
      simulateVerify,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Best-effort sync to the MongoDB-backed API. Silently ignored without DB.
async function syncUser(
  firebaseUid: string,
  email: string,
  emailVerified: boolean,
  collegeId?: string,
  currentYear?: StudyYear
) {
  try {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebaseUid, email, emailVerified, collegeId, currentYear }),
    });
  } catch {
    // no-op
  }
}
