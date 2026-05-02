"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-xl font-bold text-foreground">Something went wrong</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        We couldn&apos;t load this page. You can try again or go back home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
