import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal, useStore } from "@react-three/fiber";
import { HalfFloatType, Scene, WebGLCubeRenderTarget } from "three";
import type { CubeCamera as CubeCameraImpl } from "three";
import { Lightformer } from "@react-three/drei";
import { getThreeColor } from "../lib/designTokensThree";

const RESOLUTION = 256;

/**
 * Procedural studio lighting environment, shared by Hero and every project
 * artifact (spec §8 Phase 6, requirement C — one shared visual language, not
 * a separate material system per scene).
 *
 * This is NOT an HDRI fetch: it bakes a cubemap once, at runtime, from a
 * small offscreen rig of emissive rectangles (`Lightformer`) — no network
 * request, no new asset.
 *
 * Why this exists: `meshStandardMaterial` at high `metalness` (the lattice
 * edges, 0.85) reads as almost pure black without any environment for it to
 * reflect — there is no light bouncing off nothing. Two plain directional
 * lights (the pre-Phase-6 setup) can't fix that; only an environment map
 * gives metal something to mirror. `meshPhysicalMaterial` transmission (the
 * crystal nodes) also reads more convincingly as glass with real reflections
 * to catch at its surface, not just refraction through it.
 *
 * Phase 8 (Performance) rewrite: this used to be drei's own `<Environment>`
 * wrapping the same `<Lightformer>` rig. Real, measured bundle bottleneck,
 * not a guess: `Environment.js` statically imports `useEnvironment.js`,
 * which unconditionally imports `RGBELoader`, `EXRLoader` (HDR/EXR image
 * decoders), `HDRJPGLoader`/`GainMapLoader` (from a separate
 * `@monogrid/gainmap-js` package), and their `fflate` decompression
 * dependency — the code path `<Environment>` needs to support loading an
 * HDRI from `files`/`preset`. We never pass either prop (only `children`),
 * so that code path never runs, but standard tree-shaking can't remove it:
 * `Environment`'s internal branching (`files || preset ? <EnvironmentCube/>
 * : ...`) depends on runtime props, not a statically-known value, so the
 * bundler can't prove the branch is dead. Confirmed by grepping the actual
 * built chunk before this change: `RGBELoader`, `EXRLoader`,
 * `HDRJPGLoader`, `gainmap`, and `GroundProjectedEnv` were all present in
 * ~965 kB shared chunk despite none of them ever executing for us.
 *
 * This file now reimplements just the piece we actually use — bake a
 * cubemap once from a portaled offscreen scene via a `CubeCamera` — by
 * hand, using the same mechanism drei's own `EnvironmentPortal` uses
 * internally (`createPortal` into a virtual `Scene`, a `CubeCamera` render
 * once on mount). Still imports drei's `Lightformer` (a small, self-
 * contained component — only `three`/`@react-three/fiber`, confirmed via
 * its own source — not `Environment`), so the actual light rig markup is
 * unchanged. Visual output is intended to be identical; verify via
 * screenshot, not assumed.
 */
export function StudioEnvironment() {
  const store = useStore();
  const cameraRef = useRef<CubeCameraImpl>(null);
  const [virtualScene] = useState(() => new Scene());

  const fbo = useMemo(() => {
    const target = new WebGLCubeRenderTarget(RESOLUTION);
    target.texture.type = HalfFloatType;
    return target;
  }, []);

  useEffect(() => {
    return () => fbo.dispose();
  }, [fbo]);

  // Bake once on mount, like the original `frames={1}` default — no
  // per-frame subscription needed at all (the original kept a no-op
  // `useFrame` around after its first bake; we just don't add one).
  useLayoutEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;
    // Imperative store access (not a reactive `useThree` selector) — this
    // mutates `gl`/`scene`, which the lint rule that caught the Hero
    // camera-z fix in Phase 7 also disallows on a hook's direct return
    // value; `useStore().getState()` is the same escape hatch used there.
    const { gl, scene } = store.getState();
    const autoClear = gl.autoClear;
    gl.autoClear = true;
    camera.update(gl, virtualScene);
    gl.autoClear = autoClear;
    scene.environment = fbo.texture;
    return () => {
      scene.environment = null;
    };
  }, [store, virtualScene, fbo]);

  return createPortal(
    <>
      <Lightformer
        form="rect"
        color="white"
        intensity={2.4}
        position={[3, 4, 4]}
        scale={[6, 6, 1]}
        target={[0, 0, 0]}
      />
      <Lightformer
        form="rect"
        color="white"
        intensity={0.5}
        position={[-4, -2, 3]}
        scale={[5, 5, 1]}
        target={[0, 0, 0]}
      />
      <Lightformer
        form="rect"
        color={getThreeColor("accent")}
        intensity={1.3}
        position={[-3, 1.5, -4]}
        scale={[5, 5, 1]}
        target={[0, 0, 0]}
      />
      <cubeCamera ref={cameraRef} args={[0.1, 1000, fbo]} />
    </>,
    virtualScene,
  );
}
