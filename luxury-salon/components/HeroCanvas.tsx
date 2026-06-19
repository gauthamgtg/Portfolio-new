"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { heroFragment, heroVertex } from "@/lib/shaders/heroFlow";

/**
 * Fullscreen flowing-silk plane. The plane is scaled to exactly fill the
 * camera frustum and feeds time + an eased cursor into the GLSL flow shader.
 */
function FlowPlane({ active }: { active: boolean }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, pointer } = useThree();
  const eased = useRef(new THREE.Vector2(0, 0));
  const intro = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
      uIntro: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value += delta;
    u.uAspect.value = viewport.width / viewport.height;

    // Ease the pointer for that heavy, liquid follow
    eased.current.x += (pointer.x - eased.current.x) * 0.04;
    eased.current.y += (pointer.y - eased.current.y) * 0.04;
    u.uMouse.value.copy(eased.current);

    // Reveal envelope ramps in once the scene is active
    intro.current += ((active ? 1 : 0) - intro.current) * Math.min(1, delta * 1.2);
    u.uIntro.value = intro.current;
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={heroVertex}
        fragmentShader={heroFragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function HeroCanvas({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
      frameloop="always"
    >
      <FlowPlane active={active} />
    </Canvas>
  );
}
