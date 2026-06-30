"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ListChecks,
  CalendarDays,
  Upload,
  Search,
  GraduationCap,
  Building2,
  MessagesSquare,
  HeartPulse,
  User as UserIcon,
  Menu,
  X,
  LogOut,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/mcq", label: "MCQ Practice", icon: ListChecks },
  { href: "/exam-routine", label: "Exam Routine", icon: CalendarDays },
  { href: "/contribute", label: "Contribute", icon: Upload },
  { href: "/search", label: "Search", icon: Search },
  { href: "/fcps-bcs", label: "FCPS / BCS Prep", icon: GraduationCap },
  { href: "/internship-guide", label: "Internship Guide", icon: Building2 },
  { href: "/community", label: "Community Q&A", icon: MessagesSquare },
  { href: "/wellness", label: "Wellness", icon: HeartPulse },
  { href: "/profile", label: "Profile", icon: UserIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Auth + onboarding guard
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (!user.emailVerified) {
      router.replace("/verify-email");
    } else if (!user.collegeId || !user.currentYear) {
      router.replace("/onboarding");
    }
  }, [user, loading, router]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (loading || !user || !user.emailVerified || !user.collegeId) {
    return (
      <div className="grid min-h-dvh place-items-center bg-bone">
        <div className="flex items-center gap-3 text-charcoal-muted">
          <Stethoscope className="h-5 w-5 animate-pulse text-teal" strokeWidth={1.6} />
          <span>Loading Study Zone…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-bone">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-white px-3 lg:px-6">
        <div className="flex items-center gap-2">
          <button
            className="tap-target -ml-1 inline-grid place-items-center rounded-md p-2 text-charcoal hover:bg-bone-dark lg:hidden"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-teal text-white">
              <Stethoscope className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <span className="font-serif text-lg font-semibold text-charcoal">
              Study Zone
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-charcoal-muted md:inline">
            {user.name}
          </span>
          <button
            onClick={() => logout()}
            className="tap-target inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm text-charcoal hover:bg-bone-dark"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.6} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1700px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-line bg-white p-3 lg:block">
          <SidebarNav pathname={pathname} />
        </aside>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-charcoal/40"
              onClick={() => setDrawerOpen(false)}
            />
            <aside className="absolute left-0 top-0 h-dvh w-72 max-w-[85%] overflow-y-auto bg-white p-3 shadow-card-hover">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="font-serif text-base font-semibold">Menu</span>
                <button
                  className="tap-target inline-grid place-items-center rounded-md p-2 hover:bg-bone-dark"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </div>
              <SidebarNav pathname={pathname} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`tap-target flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-teal-light font-medium text-teal-dark"
                : "text-charcoal hover:bg-bone-dark"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
