"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { useWebGLSupport } from "@/lib/hooks";
import { startScroll, stopScroll } from "@/lib/scroll";
import ToneImage from "./ui/ToneImage";
import type { Look } from "@/lib/content";

/**
 * Draw an art-directed gradient "photograph" to a canvas so it can feed a
 * WebGL texture (flowing strands catching light). Drawn once per look, cached.
 */
function makeToneCanvas([a, b]: [string, string]): HTMLCanvasElement {
  const w = 1000;
  const h = 1250;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;

  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const r = ctx.createRadialGradient(w * 0.32, h * 0.22, 0, w * 0.32, h * 0.22, w * 0.7);
  r.addColorStop(0, "rgba(255,247,231,0.38)");
  r.addColorStop(0.6, "rgba(255,247,231,0)");
  ctx.fillStyle = r;
  ctx.fillRect(0, 0, w, h);

  // Flowing strands.
  for (let i = 0; i < 170; i++) {
    const x = Math.random() * w;
    ctx.globalAlpha = 0.06 + Math.random() * 0.05;
    ctx.strokeStyle = i % 5 === 0 ? "rgba(255,247,231,0.8)" : "rgba(0,0,0,0.5)";
    ctx.lineWidth = Math.random() * 1.6 + 0.3;
    ctx.beginPath();
    ctx.moveTo(x, -10);
    ctx.bezierCurveTo(
      x + (Math.random() * 40 - 20),
      h * 0.4,
      x + (Math.random() * 70 - 35),
      h * 0.72,
      x + (Math.random() * 40 - 20),
      h + 10,
    );
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const sg = ctx.createLinearGradient(0, h * 0.45, 0, h);
  sg.addColorStop(0, "rgba(15,10,7,0)");
  sg.addColorStop(1, "rgba(15,10,7,0.6)");
  ctx.fillStyle = sg;
  ctx.fillRect(0, h * 0.45, w, h * 0.55);

  return c;
}

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;   // 0..1 transition
  uniform float uTime;
  uniform vec2  uRes;        // screen px
  uniform vec2  uImg;        // texture px

  float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
  }

  // background-size: cover.
  vec2 cover(vec2 uv){
    float rs = uRes.x/uRes.y;
    float ri = uImg.x/uImg.y;
    vec2 nw = rs < ri ? vec2(uImg.x*uRes.y/uImg.y, uRes.y) : vec2(uRes.x, uImg.y*uRes.x/uImg.x);
    vec2 off = (rs < ri ? vec2((nw.x-uRes.x)*0.5, 0.0) : vec2(0.0,(nw.y-uRes.y)*0.5)) / nw;
    return uv*uRes/nw + off;
  }

  void main(){
    float p = smoothstep(0.0, 1.0, uProgress);

    // Displacement + chromatic aberration peak at mid-transition.
    float env = sin(p * 3.14159265);
    float n = noise(vUv * 3.0 + uTime * 0.05);
    vec2 disp = (vec2(n, noise(vUv*3.0+10.0)) - 0.5) * 0.18 * env;
    float ca = 0.08 * env;

    vec2 uF = cover(vUv) + disp;
    vec2 uT = cover(vUv) - disp;

    // RGB split per layer.
    vec3 from = vec3(
      texture2D(uFrom, uF + vec2(ca,0.0)).r,
      texture2D(uFrom, uF).g,
      texture2D(uFrom, uF - vec2(ca,0.0)).b
    );
    vec3 to = vec3(
      texture2D(uTo, uT + vec2(ca,0.0)).r,
      texture2D(uTo, uT).g,
      texture2D(uTo, uT - vec2(ca,0.0)).b
    );

    vec3 col = mix(from, to, p);

    // Subtle film grain.
    col += (hash(vUv * uRes + fract(uTime)) - 0.5) * 0.03;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/**
 * LookbookLightbox — fullscreen viewer with a WebGL RGB-shift + displacement
 * transition between looks. Falls back to a CSS crossfade where WebGL is
 * unavailable. Locks scroll, supports Esc / arrow keys.
 */
export default function LookbookLightbox({
  looks,
  index,
  onClose,
  onNavigate,
}: {
  looks: Look[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const webgl = useWebGLSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const three = useRef<{
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    textures: Map<number, THREE.Texture>;
    raf: number;
    displayed: number;
  } | null>(null);

  const open = index !== null;
  const useGL = webgl !== false;

  // Lock scroll + keyboard controls while open.
  useEffect(() => {
    if (!open) return;
    stopScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(((index as number) + 1) % looks.length);
      if (e.key === "ArrowLeft")
        onNavigate(((index as number) - 1 + looks.length) % looks.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, looks.length, onClose, onNavigate]);

  // Build / tear down the WebGL scene with the modal.
  useEffect(() => {
    if (!open || !useGL) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const textures = new Map<number, THREE.Texture>();

    const getTexture = (i: number) => {
      if (!textures.has(i)) {
        const tex = new THREE.CanvasTexture(makeToneCanvas(looks[i].tone));
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        textures.set(i, tex);
      }
      return textures.get(i)!;
    };

    const start = index as number;
    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uFrom: { value: getTexture(start) },
        uTo: { value: getTexture(start) },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uImg: { value: new THREE.Vector2(1000, 1250) },
      },
    });

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const loop = (t: number) => {
      material.uniforms.uTime.value = t * 0.001;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    three.current = { renderer, material, textures, raf, displayed: start };
    // Entrance fade.
    gsap.fromTo(canvas, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });

    return () => {
      cancelAnimationFrame(three.current?.raf ?? raf);
      window.removeEventListener("resize", onResize);
      textures.forEach((t) => t.dispose());
      material.dispose();
      renderer.dispose();
      three.current = null;
    };
    // Rebuild only when the modal opens/closes (not on navigation).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, useGL]);

  // Animate the transition when navigating between looks.
  useEffect(() => {
    const ctx = three.current;
    if (!open || !useGL || !ctx || index === null) return;
    if (ctx.displayed === index) return;

    const getTexture = (i: number) => ctx.textures.get(i)!;
    // Lazily ensure target texture exists (build effect created start only).
    if (!ctx.textures.has(index)) {
      const tex = new THREE.CanvasTexture(makeToneCanvas(looks[index].tone));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      ctx.textures.set(index, tex);
    }

    ctx.material.uniforms.uFrom.value = getTexture(ctx.displayed);
    ctx.material.uniforms.uTo.value = getTexture(index);
    ctx.material.uniforms.uProgress.value = 0;

    const target = index;
    gsap.to(ctx.material.uniforms.uProgress, {
      value: 1,
      duration: 1.1,
      ease: "power2.inOut",
      onComplete: () => {
        if (!three.current) return;
        three.current.displayed = target;
        three.current.material.uniforms.uFrom.value = getTexture(target);
        three.current.material.uniforms.uProgress.value = 0;
      },
    });
  }, [index, open, useGL, looks]);

  if (!open) return null;
  const look = looks[index as number];

  return (
    <div className="fixed inset-0 z-[150] bg-ink text-bone">
      {useGL ? (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      ) : (
        // CSS crossfade fallback.
        <div className="absolute inset-0">
          {looks.map((l, i) => (
            <div
              key={l.index}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === index ? 1 : 0 }}
            >
              <ToneImage tone={l.tone} className="h-full w-full" />
            </div>
          ))}
        </div>
      )}

      {/* Caption + controls */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 md:p-12">
        <div className="pointer-events-auto flex items-start justify-between">
          <div>
            <p className="text-[0.6rem] uppercase tracking-widest2 text-gold-light">
              {look.subtitle}
            </p>
            <h3 className="mt-2 font-display text-3xl font-light md:text-5xl">
              {look.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            data-cursor="button"
            data-cursor-label="Close"
            aria-label="Close"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 text-lg transition-colors hover:border-gold hover:text-gold"
          >
            ✕
          </button>
        </div>

        <div className="pointer-events-auto flex items-end justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-bone/75">
            {look.caption}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs tracking-widest2 text-bone/50">
              {String((index as number) + 1).padStart(2, "0")} /{" "}
              {String(looks.length).padStart(2, "0")}
            </span>
            <button
              onClick={() =>
                onNavigate(((index as number) - 1 + looks.length) % looks.length)
              }
              data-cursor="link"
              aria-label="Previous look"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 transition-colors hover:border-gold hover:text-gold"
            >
              ←
            </button>
            <button
              onClick={() => onNavigate(((index as number) + 1) % looks.length)}
              data-cursor="link"
              aria-label="Next look"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/30 transition-colors hover:border-gold hover:text-gold"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
