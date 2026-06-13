"use client";

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & Framer Motion.
        </p>
        <p className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-neon-mint" />
          Designed & engineered with data in mind
        </p>
      </div>
    </footer>
  );
}
