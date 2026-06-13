"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet px-5 py-2.5 text-sm font-semibold text-ink shadow-lg transition-opacity hover:opacity-90"
    >
      <Printer size={16} />
      Save as PDF
    </button>
  );
}
