"use client";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Gradient blobs */}
      <div className="absolute -left-32 top-[-10%] h-[40rem] w-[40rem] rounded-full bg-neon-violet/20 blur-[120px] animate-blob-slow" />
      <div className="absolute right-[-10%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-neon-cyan/20 blur-[120px] animate-blob-med" />
      <div className="absolute bottom-[-10%] left-[30%] h-[36rem] w-[36rem] rounded-full bg-neon-fuchsia/10 blur-[130px] animate-blob-slow" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#070710_92%)]" />
    </div>
  );
}
