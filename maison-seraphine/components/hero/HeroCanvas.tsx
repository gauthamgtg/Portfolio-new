"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./heroShaders";
import { clamp, lerp } from "@/lib/utils";

/**
 * The full-viewport silk field. Lives on a 2x2 clip-space plane (see the
 * vertex shader) and updates a handful of uniforms per frame. The cursor is
 * smoothed in JS for buttery, weighty motion; the intro value ramps in when
 * the loader hands off.
 */
function SilkField({ intro }: { intro: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const pointer = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const introVal = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntro: { value: 0 },
      uScroll: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.tx = e.clientX / window.innerWidth;
      pointer.current.ty = 1 - e.clientY / window.innerHeight; // y-up
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;

    // Inertial cursor smoothing.
    pointer.current.x = lerp(pointer.current.x, pointer.current.tx, 0.06);
    pointer.current.y = lerp(pointer.current.y, pointer.current.ty, 0.06);

    // Intro ramp toward 1 once the loader is done.
    introVal.current = lerp(introVal.current, intro ? 1 : 0, 0.035);

    const scroll =
      typeof window !== "undefined"
        ? clamp(window.scrollY / window.innerHeight, 0, 1)
        : 0;

    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uMouse.value.set(pointer.current.x, pointer.current.y);
    mat.uniforms.uIntro.value = introVal.current;
    mat.uniforms.uScroll.value = scroll;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * HeroCanvas — lazy, GPU-friendly R3F canvas.
 * `active` pauses the render loop entirely (frameloop="never") once the hero
 * scrolls out of view, so we never burn GPU cycles off-screen.
 */
export default function HeroCanvas({
  intro,
  active,
}: {
  intro: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#140d08"]} />
      <SilkField intro={intro} />
    </Canvas>
  );
}
