import { Component, lazy, Suspense, useRef } from "react";
import type { ReactNode } from "react";
import { CursorPortrait } from "./CursorPortrait";
import { useAppStore } from "../../store/useAppStore";
import { useHasHover } from "../../hooks/useHasHover";
import { HEAD_MODEL_URL, PORTRAIT } from "../../content/profile";

const HeadScene = lazy(() => import("../../scene/HeadScene"));

/** If the model fails to load or render, show the photo instead of an empty box. */
class ModelBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The Hero's portrait. With no `src/assets/head.glb` this is exactly the flat
 * photo with its small cursor tilt, and no 3D code is ever downloaded. With a
 * model it is the lazily-loaded 3D head that turns toward the cursor; the photo
 * shows while the model loads and if it fails. The box has a fixed aspect
 * ratio either way, so nothing shifts when the model arrives. Cursor tracking
 * is off on touch devices and under `prefers-reduced-motion` (static pose).
 */
export function PortraitSlot() {
  const frameRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAppStore((state) => state.reducedMotion);
  const hasHover = useHasHover();
  const photo = <CursorPortrait {...PORTRAIT} eager />;

  if (!HEAD_MODEL_URL) return photo;

  return (
    <div
      ref={frameRef}
      className="aspect-[4/5] overflow-hidden rounded-card border border-border bg-surface shadow-elevated"
      role="img"
      aria-label={PORTRAIT.alt}
    >
      <ModelBoundary fallback={photo}>
        <Suspense fallback={photo}>
          <HeadScene url={HEAD_MODEL_URL} tracking={hasHover && !reducedMotion} frame={frameRef} />
        </Suspense>
      </ModelBoundary>
    </div>
  );
}
