import Link from "next/link";
import { Stethoscope } from "lucide-react";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh place-items-center bg-bone px-4 py-10">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-teal text-white">
            <Stethoscope className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <span className="font-serif text-xl font-semibold text-charcoal">
            Study Zone
          </span>
        </Link>
        <div className="sz-card p-6 lg:p-8">
          <h1 className="font-serif text-2xl font-semibold text-charcoal">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-charcoal-muted">{subtitle}</p>
          )}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
