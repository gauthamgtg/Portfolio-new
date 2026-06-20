/**
 * heroShaders.ts — GLSL for the hero "flowing silk / hair" field.
 *
 * The effect is fully procedural (no image texture required), so it loads
 * instantly and degrades gracefully. A domain-warped fractal-noise flow field
 * generates long vertical strands; an anisotropic sheen term reads as silk;
 * the cursor pulls the flow and blooms a soft volumetric light with a touch of
 * chromatic aberration. Film grain and a warm vignette finish the frame.
 *
 * Rendered on a [2,2] plane whose vertex shader writes clip-space directly, so
 * the camera is irrelevant and the quad always fills the viewport.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Bypass the camera: position is already in -1..1 (a 2x2 plane).
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  varying vec2 vUv;

  uniform float uTime;        // seconds
  uniform vec2  uResolution;  // viewport px
  uniform vec2  uMouse;       // 0..1, y-up, JS-smoothed
  uniform float uIntro;       // 0..1 loader -> hero hand-off
  uniform float uScroll;      // 0..1 progress through the first viewport

  // ---- Brand palette (linear-ish sRGB constants) -----------------
  const vec3 BONE      = vec3(0.953, 0.925, 0.878);
  const vec3 CHAMPAGNE = vec3(0.910, 0.831, 0.722);
  const vec3 GOLD      = vec3(0.749, 0.616, 0.322);
  const vec3 COCOA     = vec3(0.290, 0.208, 0.165);
  const vec3 ESPRESSO  = vec3(0.115, 0.072, 0.052);

  // ---- Hash / value-noise / fbm ----------------------------------
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // Smooth value noise.
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Fractal Brownian motion — rotated per octave to avoid axis artefacts.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);

    // Work in aspect-corrected space so strands keep their proportions.
    vec2 p = vec2(uv.x * aspect, uv.y);
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);

    float t = uTime * 0.05; // slow, expensive-looking drift

    // 1) Large-scale domain warp -> flowing, volumetric structure.
    vec2 warp;
    warp.x = fbm(p * vec2(1.2, 0.55) + vec2(0.0, t));
    warp.y = fbm(p * vec2(1.2, 0.55) + vec2(7.3, t * 0.8));

    // 2) The cursor gently pulls the flow toward itself.
    vec2 toM = m - p;
    float md = length(toM);
    float pull = smoothstep(0.65, 0.0, md) * 0.10;
    vec2 fp = p + warp * 0.28 + toM * pull;

    // 3) Fine vertical strands (high frequency across x = many strands).
    float phase = fp.x * 120.0 + fbm(fp * 2.0) * 7.0 + t * 2.0;
    float strands = sin(phase) * 0.5 + 0.5;

    // 4) Silk sheen: sharpen strands into specular filaments.
    float sheen = pow(strands, 7.0);

    // 5) Macro luminance field -> where the light pools.
    float lum = smoothstep(0.2, 0.95, fbm(fp * vec2(1.6, 0.9) + 3.0));

    // 6) Vertical gradient: champagne crown -> espresso roots.
    float vGrad = smoothstep(-0.1, 1.1, uv.y);

    // 7) Compose the base color.
    vec3 col = mix(ESPRESSO, COCOA, vGrad);
    col = mix(col, CHAMPAGNE, lum * vGrad);
    col = mix(col, BONE, pow(lum, 2.0) * 0.5 * vGrad);

    // 8) Gold filaments.
    col += GOLD * sheen * (0.25 + 0.6 * lum);

    // 9) Volumetric bloom following the cursor.
    float glow = smoothstep(0.55, 0.0, md);
    col += GOLD * glow * 0.18;
    col = mix(col, BONE, glow * 0.06);

    // 10) Chromatic aberration near the cursor (per-channel sheen offset).
    float ca = glow * 1.2;
    float sheenR = pow(sin(phase + ca) * 0.5 + 0.5, 7.0);
    float sheenB = pow(sin(phase - ca) * 0.5 + 0.5, 7.0);
    col.r += GOLD.r * sheenR * glow * 0.16;
    col.b += GOLD.b * sheenB * glow * 0.16;

    // 11) Fine film grain.
    float g = hash(uv * uResolution.xy * 0.5 + fract(t) * 50.0);
    col += (g - 0.5) * 0.04;

    // 12) Warm vignette.
    col *= smoothstep(1.25, 0.35, length(uv - 0.5));

    // 13) Intro hand-off: rise from black + desaturated -> full color.
    col *= clamp(uIntro, 0.0, 1.0);
    float grey = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(grey), col, mix(0.35, 1.0, uIntro));

    // 14) Recede as the visitor scrolls into the page.
    col *= 1.0 - 0.55 * uScroll;

    gl_FragColor = vec4(col, 1.0);
  }
`;
