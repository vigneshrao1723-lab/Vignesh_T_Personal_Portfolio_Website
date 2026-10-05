import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { getThreeColor } from "../lib/designTokensThree";
import { useIsMobileViewport } from "../hooks/useIsMobileViewport";
import { StudioEnvironment } from "./StudioEnvironment";

interface ProjectSceneProps {
  children: ReactNode;
}

/**
 * Shared Canvas scaffold for the three project artifacts (spec §8 Phase 5).
 * One lazy-loaded module (see `Projects.tsx`) hosts this plus all three
 * artifact geometries, so `three`/`@react-three/fiber` are imported once
 * for all three cards, not three times.
 *
 * `frameloop="demand"` unconditionally (not gated on reduced-motion the
 * way Hero's `frameloop` is) — deliberately, for performance: once these
 * three canvases mount, the page has Hero's own always-on canvas plus up
 * to three more running simultaneously if all cards are in view at once.
 * Demand mode means each artifact only renders when actually invalidated
 * (its own one-time entrance tween, or while a viewer's pointer is over
 * its card) rather than looping continuously at rest — a card sitting
 * unwatched costs nothing per frame. See each artifact component for how
 * `invalidate()` is called explicitly to paint the frames that do matter.
 */
export function ProjectScene({ children }: ProjectSceneProps) {
  const isMobile = useIsMobileViewport();

  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      frameloop="demand"
      camera={{ position: [0, 0, 6], fov: 32 }}
      fallback={<div aria-hidden="true" />}
    >
      <color attach="background" args={[getThreeColor("canvas")]} />
      <StudioEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} />
      <directionalLight position={[-3, -1, -2]} intensity={0.25} />
      {children}
    </Canvas>
  );
}
