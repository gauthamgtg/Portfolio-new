/**
 * Hero "flowing hair / liquid silk" shader.
 *
 * A fullscreen plane renders domain-warped fractal noise in the house palette
 * (espresso → cocoa → brushed gold), animated over time and gently displaced
 * toward the cursor. The effect evokes strands of hair caught in slow light —
 * fluid, warm, and reactive without any video asset.
 *
 * Uniforms:
 *   uTime  — seconds, drives the flow
 *   uMouse — eased pointer in clip space (-1..1)
 *   uAspect— viewport aspect ratio for non-distorted noise
 *   uIntro — 0..1 reveal envelope handed in from the loader
 */

export const heroVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const heroFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uAspect;
  uniform float uIntro;

  // ---- value noise + fbm ----------------------------------------------------
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8); // rotate octaves to break grid
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-correct coordinates centred on screen
    vec2 uv = vUv;
    vec2 p = (uv - 0.5);
    p.x *= uAspect;

    float t = uTime * 0.05;

    // Pull the field gently toward the cursor for the "reactive silk" feel
    vec2 m = uMouse * 0.35;
    p += m * 0.18;

    // Domain warping — two layers of fbm feeding the next create flowing
    // strand-like filaments rather than blobby clouds.
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(
      fbm(p + 2.2 * q + vec2(1.7, 9.2) + 0.15 * t),
      fbm(p + 2.2 * q + vec2(8.3, 2.8) - 0.12 * t)
    );

    float n = fbm(p + 3.0 * r);

    // Directional "strand" banding for a hair-like grain
    float strands = 0.5 + 0.5 * sin((p.y * 7.0) + n * 6.0 + length(r) * 4.0);
    float f = clamp(n * 0.6 + 0.4 + strands * 0.12, 0.0, 1.0);

    // ---- palette ramp: espresso -> cocoa -> brass -> gold-light -----------
    vec3 espresso = vec3(0.078, 0.055, 0.043);
    vec3 cocoa    = vec3(0.231, 0.165, 0.110);
    vec3 brass    = vec3(0.553, 0.408, 0.250);
    vec3 goldLt   = vec3(0.886, 0.776, 0.560);

    vec3 col = mix(espresso, cocoa, smoothstep(0.15, 0.5, f));
    col = mix(col, brass, smoothstep(0.5, 0.78, f));
    col = mix(col, goldLt, smoothstep(0.82, 1.0, f) * 0.9);

    // Subtle specular glints riding the highest ridges
    float glint = smoothstep(0.92, 1.0, f);
    col += glint * vec3(0.25, 0.2, 0.12);

    // Warm volumetric pool near the cursor
    float glow = smoothstep(0.7, 0.0, length(p - m * 1.4));
    col += glow * vec3(0.10, 0.075, 0.04);

    // Vignette to seat the composition
    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    col *= 0.55 + 0.45 * vig;

    // Intro envelope: rise from darkness as the loader hands off
    col *= mix(0.0, 1.0, smoothstep(0.0, 1.0, uIntro));

    gl_FragColor = vec4(col, 1.0);
  }
`;
