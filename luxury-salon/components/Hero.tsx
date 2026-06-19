"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GLSL Vertex Shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDistortion;

  void main() {
    vUv = uv;
    vPosition = position;

    vec3 pos = position;

    // Heat haze / displacement effect driven by mouse
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 12.0 - uTime * 2.0) * uDistortion * (1.0 - smoothstep(0.0, 0.5, dist));

    pos.z += ripple * 0.15;
    pos.x += sin(uTime * 0.3 + uv.y * 3.0) * 0.01 * uDistortion;
    pos.y += cos(uTime * 0.2 + uv.x * 2.5) * 0.008 * uDistortion;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// GLSL Fragment Shader
const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDistortion;
  uniform sampler2D uTexture;

  vec3 deepCharcoal = vec3(0.04, 0.04, 0.04);
  vec3 brass = vec3(0.72, 0.58, 0.16);
  vec3 copper = vec3(0.77, 0.48, 0.22);
  vec3 obsidian = vec3(0.06, 0.05, 0.04);

  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  float smoothNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;

    // Smoke / atmospheric haze
    float smokeTime = uTime * 0.15;
    float smoke = smoothNoise(uv * 3.0 + vec2(smokeTime, smokeTime * 0.5));
    smoke += smoothNoise(uv * 6.0 - vec2(smokeTime * 0.7, smokeTime)) * 0.5;
    smoke += smoothNoise(uv * 12.0 + vec2(smokeTime * 0.3, -smokeTime * 0.8)) * 0.25;
    smoke *= 0.6;

    // Vignette
    float vignette = 1.0 - length(uv - 0.5) * 1.4;
    vignette = clamp(vignette, 0.0, 1.0);
    vignette = pow(vignette, 0.8);

    // Mouse glow
    float mouseDist = distance(uv, uMouse);
    float mouseGlow = smoothstep(0.4, 0.0, mouseDist) * uDistortion;

    // Light rays from top-center (like light through a barber window)
    float rayAngle = (uv.x - 0.5) * 2.0;
    float ray = pow(max(0.0, 1.0 - abs(rayAngle) * 2.0), 3.0);
    ray *= (1.0 - uv.y) * 0.4;
    ray *= vignette;

    // Horizontal light streak at 40% height
    float stripe = exp(-pow((uv.y - 0.4) * 8.0, 2.0)) * 0.15 * vignette;

    // Base moody dark with warm undertone
    vec3 col = mix(obsidian, deepCharcoal, smoke * 0.3);
    col += brass * ray * 0.4;
    col += copper * stripe;
    col += brass * mouseGlow * 0.3;

    // Subtle warm gradient from bottom
    col = mix(col, obsidian * 0.8, (1.0 - uv.y) * 0.3);

    // Film grain
    float grain = noise(uv * vec2(800.0, 600.0) + uTime * 100.0) * 0.04;
    col += grain - 0.02;

    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<{ renderer: unknown; mesh: unknown; uniforms: Record<string, { value: unknown }> } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let animationId: number;

    const initWebGL = async () => {
      try {
        const THREE = await import("three");
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: false,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 1;

        const uniforms = {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uDistortion: { value: 0 },
          uTexture: { value: null },
        };

        const geometry = new THREE.PlaneGeometry(2, 2, 64, 64);
        const material = new THREE.ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let targetMouseX = 0.5;
        let targetMouseY = 0.5;
        let currentMouseX = 0.5;
        let currentMouseY = 0.5;
        let targetDistortion = 0;
        let currentDistortion = 0;

        const onMouseMove = (e: MouseEvent) => {
          targetMouseX = e.clientX / window.innerWidth;
          targetMouseY = 1 - e.clientY / window.innerHeight;
          targetDistortion = 1;
        };
        const onMouseLeave = () => {
          targetDistortion = 0;
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseleave", onMouseLeave);

        let startTime = Date.now();

        const animate = () => {
          animationId = requestAnimationFrame(animate);
          const elapsed = (Date.now() - startTime) / 1000;

          currentMouseX += (targetMouseX - currentMouseX) * 0.05;
          currentMouseY += (targetMouseY - currentMouseY) * 0.05;
          currentDistortion += (targetDistortion - currentDistortion) * 0.03;

          uniforms.uTime.value = elapsed;
          const mouseVec = uniforms.uMouse.value as { set: (x: number, y: number) => void };
          mouseVec.set(currentMouseX, currentMouseY);
          uniforms.uDistortion.value = currentDistortion;

          renderer.render(scene, camera);
        };

        animate();

        const onResize = () => {
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        rendererRef.current = { renderer, mesh, uniforms };

        return () => {
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseleave", onMouseLeave);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
        };
      } catch (err) {
        console.warn("WebGL init failed, falling back:", err);
      }
    };

    initWebGL();

    // Headline animation
    const headline = headlineRef.current;
    const subline = sublineRef.current;
    const scrollCue = scrollCueRef.current;
    const cta = ctaRef.current;

    if (headline) {
      const spans = headline.querySelectorAll(".char-mask");
      gsap.fromTo(
        spans,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.04,
          delay: 0.2,
        }
      );
    }

    if (subline) {
      gsap.fromTo(
        subline,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.0,
        }
      );
    }

    if (cta) {
      gsap.fromTo(
        cta,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.4,
        }
      );
    }

    if (scrollCue) {
      gsap.fromTo(
        scrollCue,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 2.0,
        }
      );
      gsap.to(scrollCue.querySelector(".scroll-arrow"), {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const headlineWords = ["OBSIDIAN"];
  const subWords = ["THE ART OF THE PERFECT CUT"];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Brass horizontal rule center */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px opacity-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, var(--brass), transparent)", zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-8 flex flex-col items-center">
        {/* Pre-headline label */}
        <div className="mb-8 overflow-hidden">
          <p
            className="label-text tracking-ultra-wide"
            style={{ color: "rgba(184,149,42,0.7)" }}
          >
            MANHATTAN · EST. 2009 · MASTER BARBERS
          </p>
        </div>

        {/* Main headline */}
        <div ref={headlineRef} className="overflow-hidden mb-2">
          <h1
            className="display-text"
            style={{
              fontSize: "clamp(5rem, 18vw, 22rem)",
              color: "var(--cream)",
              lineHeight: "0.88",
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-display)",
            }}
          >
            {headlineWords[0].split("").map((char, i) => (
              <span
                key={i}
                className="char-mask inline-block"
                style={{ opacity: 0 }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Brass gleam line */}
        <div className="w-full max-w-lg h-px my-5 opacity-60" style={{ background: "linear-gradient(90deg, transparent, var(--brass), transparent)" }} />

        {/* Sub headline */}
        <div ref={sublineRef} style={{ opacity: 0 }}>
          <p
            className="label-text mb-1"
            style={{ color: "rgba(245,240,232,0.5)", letterSpacing: "0.4em" }}
          >
            {subWords[0]}
          </p>
          <p
            className="text-sm mt-3 max-w-sm mx-auto leading-relaxed"
            style={{
              color: "rgba(245,240,232,0.4)",
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            Where precision becomes ritual. Where craft earns its silence.
          </p>
        </div>

        {/* CTA Row */}
        <div ref={ctaRef} className="flex items-center gap-8 mt-10" style={{ opacity: 0 }}>
          <a
            href="#booking"
            className="magnetic-btn relative group overflow-hidden border px-8 py-4"
            style={{ borderColor: "var(--brass)" }}
            data-cursor="BOOK"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className="relative z-10 label-text transition-colors duration-400 group-hover:text-obsidian"
              style={{ color: "var(--brass)" }}
            >
              Reserve Your Chair
            </span>
            <span
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: "var(--brass)" }}
            />
          </a>

          <a
            href="#manifesto"
            className="label-text group flex items-center gap-3"
            style={{ color: "rgba(245,240,232,0.5)" }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#manifesto")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="w-8 h-px transition-all duration-400 group-hover:w-12" style={{ backgroundColor: "var(--steel)" }} />
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 10, opacity: 0 }}
      >
        <span className="label-text" style={{ color: "rgba(184,149,42,0.5)", fontSize: "0.55rem" }}>
          SCROLL TO ENTER
        </span>
        <div className="scroll-arrow w-px h-8" style={{ background: "linear-gradient(180deg, var(--brass), transparent)" }} />
      </div>

      {/* Side labels */}
      <div
        className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        style={{ zIndex: 10 }}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, var(--brass), transparent)", opacity: 0.4 }} />
        <p
          className="label-text"
          style={{
            color: "rgba(184,149,42,0.5)",
            writingMode: "vertical-rl",
            letterSpacing: "0.25em",
            fontSize: "0.55rem",
          }}
        >
          142 WEST 57TH · MANHATTAN
        </p>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, transparent, var(--brass))", opacity: 0.4 }} />
      </div>

      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4"
        style={{ zIndex: 10 }}
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, var(--brass), transparent)", opacity: 0.4 }} />
        <p
          className="label-text"
          style={{
            color: "rgba(184,149,42,0.5)",
            writingMode: "vertical-rl",
            letterSpacing: "0.25em",
            fontSize: "0.55rem",
          }}
        >
          BY APPOINTMENT · PRIVATE CHAIRS
        </p>
        <div className="w-px h-16" style={{ background: "linear-gradient(180deg, transparent, var(--brass))", opacity: 0.4 }} />
      </div>
    </section>
  );
}
