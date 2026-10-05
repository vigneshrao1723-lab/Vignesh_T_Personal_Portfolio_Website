import { useEffect, useRef } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useHasHover } from "../../hooks/useHasHover";
import { cursorOffset } from "../../lib/cursorOffset";

interface CursorPortraitProps {
  src: string;
  alt: string;
  /** Intrinsic pixel size of `src` — reserves layout space, so no layout shift. */
  width: number;
  height: number;
  className?: string;
  /** Above the fold (Hero): load immediately instead of lazily. */
  eager?: boolean;
}

// Deliberately small: this is a flat photo, not a 3D model, so a larger
// angle would just read as a skewed rectangle instead of a head turning.
const MAX_YAW_DEG = 6;
const MAX_PITCH_DEG = 4;
const MAX_SHIFT_PX = 6;
// Fraction of the remaining distance covered per 60fps frame (frame-rate
// independent below) — low enough that the portrait eases toward the cursor
// and never snaps.
const SMOOTHING = 0.08;
const SETTLE_EPSILON = 0.001;

/**
 * The supplied portrait is a 2D photograph, so this does NOT pretend to be a
 * 3D head: it tilts the photo plane (CSS perspective `rotateX`/`rotateY`,
 * clamped to a few degrees) and shifts it a few pixels toward the cursor.
 * If a real 3D character asset is supplied later, this component is the one
 * place to replace.
 *
 * Cost control: one passive `pointermove` listener; the rAF loop only runs
 * while the portrait is on screen AND still easing (it stops itself once
 * settled), and writes `transform` directly instead of re-rendering React.
 *
 * Disabled entirely (static image, no listeners, no rAF) on touch devices
 * (`useHasHover` — a tap has no meaningful "cursor") and under
 * `prefers-reduced-motion`.
 */
export function CursorPortrait({
  src,
  alt,
  width,
  height,
  className = "",
  eager = false,
}: CursorPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAppStore((state) => state.reducedMotion);
  const hasHover = useHasHover();
  const enabled = hasHover && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const frame = frameRef.current;
    const plane = planeRef.current;
    if (!frame || !plane) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let visible = false;
    let lastTime = 0;

    const apply = () => {
      // rotateY(+) turns the face toward screen-right; rotateX(+) tilts it up.
      plane.style.transform =
        `rotateY(${current.x * MAX_YAW_DEG}deg) rotateX(${-current.y * MAX_PITCH_DEG}deg) ` +
        `translate3d(${current.x * MAX_SHIFT_PX}px, ${current.y * MAX_SHIFT_PX * 0.6}px, 0)`;
    };

    const tick = (time: number) => {
      const frames = Math.min((time - lastTime) / 16.7, 3);
      lastTime = time;
      const ease = 1 - Math.pow(1 - SMOOTHING, frames);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      apply();
      const settled =
        Math.abs(target.x - current.x) < SETTLE_EPSILON &&
        Math.abs(target.y - current.y) < SETTLE_EPSILON;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf || !visible) return;
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const offset = cursorOffset(frame.getBoundingClientRect(), event.clientX, event.clientY);
      target.x = offset.x;
      target.y = offset.y;
      kick();
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;
      kick();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        kick();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    observer.observe(frame);

    // Cursor left the window: `mouseout` with no relatedTarget is the
    // reliable cross-browser signal; `pointerleave` on the root is kept too.
    const handleDocumentOut = (event: MouseEvent) => {
      if (!event.relatedTarget) handlePointerLeave();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("mouseout", handleDocumentOut);

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("mouseout", handleDocumentOut);
      if (raf) cancelAnimationFrame(raf);
      plane.style.transform = "";
    };
  }, [enabled]);

  return (
    <div
      ref={frameRef}
      className={`aspect-[4/5] ${className}`}
      style={{ perspective: "900px" }}
    >
      <div
        ref={planeRef}
        className="h-full w-full overflow-hidden rounded-card border border-border bg-surface shadow-elevated"
        style={enabled ? { willChange: "transform" } : undefined}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover object-[50%_14%]"
        />
      </div>
    </div>
  );
}
