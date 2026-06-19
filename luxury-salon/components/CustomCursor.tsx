"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      rafId = requestAnimationFrame(animateFollower);
    };

    const onMouseEnterLink = (e: Event) => {
      const target = e.target as HTMLElement;
      cursor.classList.add("is-hovering");
      follower.classList.add("is-hovering");
      const label = target.dataset.cursorLabel;
      if (label && labelRef.current) {
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = "1";
      }
    };

    const onMouseLeaveLink = () => {
      cursor.classList.remove("is-hovering");
      follower.classList.remove("is-hovering");
      if (labelRef.current) {
        labelRef.current.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animateFollower);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor">
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[7px] tracking-widest uppercase text-brass opacity-0 transition-opacity duration-300 font-body"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
}
