import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { gsap } from "../animation/gsap";
import { gsapEase } from "../lib/designTokens";
import { useAppStore } from "../store/useAppStore";
import { useHasHover } from "../hooks/useHasHover";

/**
 * Shared entrance + hover-rotation behavior for all three project
 * artifacts — the small-scale counterpart to Hero's `SceneContent`, sized
 * for `frameloop="demand"` canvases rather than an always-on one.
 *
 * Under `demand`, R3F only paints a frame when something calls
 * `invalidate()`; GSAP tweening a Three.js object's properties doesn't do
 * that by itself, so the one-time entrance tween calls `invalidate()` from
 * its own `onUpdate`, and hover-rotation calls it once per frame only
 * while `useFrame` is actually running — both stop calling it the moment
 * they're done, so a card at rest costs nothing.
 *
 * Reduced motion: no entrance tween (final scale set immediately) and
 * hover never starts rotation — matches spec's "3D motion must be reduced
 * or disabled" for Projects specifically.
 *
 * Phase 7: hover handlers are also gated on `useHasHover` (a real
 * `(hover: hover)` device, not touch) — on a touchscreen a tap fires
 * `pointerover` without a guaranteed matching `pointerout`, which would
 * otherwise leave a card spinning indefinitely.
 */
export function useArtifactMotion() {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useAppStore((state) => state.reducedMotion);
  const invalidate = useThree((state) => state.invalidate);
  const hasHover = useHasHover();

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // Fixed compositional tilt (Phase 6 polish) — a perfectly frontal,
    // camera-perpendicular artifact reads as flat/2D despite being a real
    // 3D scene. A small static pose, set once and never animated, gives
    // perspective/depth cues without violating "avoid constant camera
    // movement" — it's a pose, not motion.
    group.rotation.x = -0.18;
    group.rotation.y = 0.32;

    if (reducedMotion) {
      group.scale.setScalar(1);
      invalidate();
      return;
    }

    gsap.fromTo(
      group.scale,
      { x: 0.6, y: 0.6, z: 0.6 },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.9,
        ease: gsapEase.signal,
        onUpdate: invalidate,
      },
    );
  }, [reducedMotion, invalidate]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || reducedMotion || !hovered) return;
    group.rotation.y += delta * 0.6;
    invalidate();
  });

  const hoverHandlers = reducedMotion || !hasHover
    ? {}
    : {
        // Under frameloop="demand", useFrame simply doesn't run at all
        // until something calls invalidate() — a React state update alone
        // doesn't do that for imperative Three.js changes. Kick the loop
        // here explicitly; once running, the useFrame callback above keeps
        // it alive by calling invalidate() itself each frame, only while
        // still hovered.
        onPointerOver: () => {
          setHovered(true);
          invalidate();
        },
        onPointerOut: () => setHovered(false),
      };

  // `hovered`/`reducedMotion`/`invalidate` are exposed (not just
  // `groupRef`/`hoverHandlers`) so an artifact can add its own supplementary
  // hover-driven animation — e.g. CryptoArtifact's packet travel — without
  // duplicating hover-state tracking or the demand-mode invalidate dance.
  return { groupRef, hoverHandlers, hovered, reducedMotion, invalidate };
}
