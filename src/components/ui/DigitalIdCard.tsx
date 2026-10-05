import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useHasHover } from "../../hooks/useHasHover";
import { PROFILE } from "../../content/profile";

interface HangingMotion {
  angle: number;
  angleVelocity: number;
  dropOffset: number;
  dropVelocity: number;
}

interface ActivePointer {
  id: number;
  startX: number;
  startY: number;
  startAngle: number;
  startDropOffset: number;
  lastTime: number;
  lastAngle: number;
  lastDropOffset: number;
  moved: boolean;
}

const BASE_LANYARD_DROP = 48;
const REST_MOTION: HangingMotion = { angle: 0, angleVelocity: 0, dropOffset: 0, dropVelocity: 0 };
const cardStyle = { "--lanyard-drop": `${BASE_LANYARD_DROP}px` } as CSSProperties;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function getMotionLimits() {
  const width = typeof window === "undefined" ? 1280 : window.innerWidth;
  if (width < 640) return { maxAngle: 0.08, maxLift: -7, maxDrop: 12, hoverAngle: 0.012 };
  if (width < 1024) return { maxAngle: 0.125, maxLift: -10, maxDrop: 18, hoverAngle: 0.02 };
  return { maxAngle: 0.18, maxLift: -12, maxDrop: 24, hoverAngle: 0.03 };
}

/** A suspended portfolio identity card with a fixed pivot and damped pointer physics. */
export function DigitalIdCard() {
  const [dragging, setDragging] = useState(false);
  const motionRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef(0);
  const pointerRef = useRef<ActivePointer | null>(null);
  const motion = useRef<HangingMotion>({ ...REST_MOTION });
  const reducedMotion = useAppStore((state) => state.reducedMotion);
  const hasHover = useHasHover();

  const applyMotion = useCallback(() => {
    const node = motionRef.current;
    if (!node) return;
    const value = motion.current;
    node.style.transform = `rotateZ(${value.angle}rad)`;
    node.style.setProperty("--lanyard-drop", `${BASE_LANYARD_DROP + value.dropOffset}px`);
  }, []);

  const stopPhysics = useCallback(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = 0;
  }, []);

  const rest = useCallback(() => {
    motion.current = { ...REST_MOTION };
    applyMotion();
  }, [applyMotion]);

  const settle = useCallback(() => {
    stopPhysics();
    if (reducedMotion) {
      rest();
      return;
    }

    let previousTime = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - previousTime) / 1000, 0.032);
      previousTime = now;
      const value = motion.current;
      const limits = getMotionLimits();

      // Gravity pulls the pendulum toward vertical; damping removes release energy.
      value.angleVelocity += (-14 * value.angle - 3.2 * value.angleVelocity) * elapsed;
      value.angle += value.angleVelocity * elapsed;
      value.dropVelocity += (-23 * value.dropOffset - 7 * value.dropVelocity) * elapsed;
      value.dropOffset += value.dropVelocity * elapsed;

      if (Math.abs(value.angle) > limits.maxAngle) {
        value.angle = clamp(value.angle, -limits.maxAngle, limits.maxAngle);
        value.angleVelocity *= -0.18;
      }
      if (value.dropOffset < limits.maxLift || value.dropOffset > limits.maxDrop) {
        value.dropOffset = clamp(value.dropOffset, limits.maxLift, limits.maxDrop);
        value.dropVelocity *= -0.16;
      }
      applyMotion();

      if (
        Math.abs(value.angle) < 0.0015 &&
        Math.abs(value.angleVelocity) < 0.008 &&
        Math.abs(value.dropOffset) < 0.15 &&
        Math.abs(value.dropVelocity) < 0.4
      ) {
        rest();
        animationFrameRef.current = 0;
        return;
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [applyMotion, reducedMotion, rest, stopPhysics]);

  useEffect(() => {
    if (reducedMotion) {
      stopPhysics();
      rest();
      return;
    }

    const limits = getMotionLimits();
    motion.current = {
      angle: -limits.maxAngle * 0.36,
      angleVelocity: limits.maxAngle * 2.1,
      dropOffset: -Math.min(8, Math.abs(limits.maxLift)),
      dropVelocity: 5,
    };
    applyMotion();
    settle();
    return stopPhysics;
  }, [applyMotion, reducedMotion, rest, settle, stopPhysics]);

  useEffect(() => () => stopPhysics(), [stopPhysics]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest("a, button")) return;
    stopPhysics();
    const value = motion.current;
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startAngle: value.angle,
      startDropOffset: value.dropOffset,
      lastTime: performance.now(),
      lastAngle: value.angle,
      lastDropOffset: value.dropOffset,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const activePointer = pointerRef.current;
    if (activePointer?.id === event.pointerId) {
      const dx = event.clientX - activePointer.startX;
      const dy = event.clientY - activePointer.startY;
      if (!activePointer.moved && Math.abs(dx) + Math.abs(dy) > 6) {
        activePointer.moved = true;
        setDragging(true);
      }
      if (activePointer.moved) event.preventDefault();

      const limits = getMotionLimits();
      const nextAngle = clamp(activePointer.startAngle - dx / 280, -limits.maxAngle, limits.maxAngle);
      const nextDropOffset = clamp(activePointer.startDropOffset + dy * 0.15, limits.maxLift, limits.maxDrop);
      const now = performance.now();
      const elapsed = Math.max((now - activePointer.lastTime) / 1000, 0.008);

      motion.current.angleVelocity = clamp((nextAngle - activePointer.lastAngle) / elapsed, -1.2, 1.2);
      motion.current.dropVelocity = clamp((nextDropOffset - activePointer.lastDropOffset) / elapsed, -64, 64);
      motion.current.angle = nextAngle;
      motion.current.dropOffset = nextDropOffset;
      activePointer.lastTime = now;
      activePointer.lastAngle = nextAngle;
      activePointer.lastDropOffset = nextDropOffset;
      applyMotion();
      return;
    }

    if (!hasHover || reducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerPosition = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
    const limits = getMotionLimits();
    const targetAngle = clamp(-pointerPosition * limits.hoverAngle * 2, -limits.hoverAngle, limits.hoverAngle);
    motion.current.angle += (targetAngle - motion.current.angle) * 0.14;
    motion.current.angleVelocity = 0;
    applyMotion();
  };

  const finishPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const activePointer = pointerRef.current;
    if (!activePointer || activePointer.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointerRef.current = null;
    setDragging(false);
    settle();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const limits = getMotionLimits();
    let handled = true;
    if (event.key === "ArrowLeft") motion.current.angle += 0.035;
    else if (event.key === "ArrowRight") motion.current.angle -= 0.035;
    else if (event.key === "ArrowUp") motion.current.dropOffset -= 4;
    else if (event.key === "ArrowDown") motion.current.dropOffset += 4;
    else handled = false;
    if (!handled) return;

    event.preventDefault();
    stopPhysics();
    motion.current.angle = clamp(motion.current.angle, -limits.maxAngle, limits.maxAngle);
    motion.current.dropOffset = clamp(motion.current.dropOffset, limits.maxLift, limits.maxDrop);
    motion.current.angleVelocity = 0;
    motion.current.dropVelocity = 0;
    applyMotion();
    settle();
  };

  return (
    <div className="w-full pt-8 sm:pt-10">
      <div className="relative aspect-[.63] w-full select-none [perspective:1200px]">
        <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 flex-col items-center" aria-hidden="true">
          <span className="size-3 rounded-full border-2 border-accent bg-canvas shadow-card" />
          <span className="h-3 w-px bg-accent/80" />
        </div>

        <div
          ref={motionRef}
          style={cardStyle}
          className={`absolute inset-x-0 top-0 origin-top will-change-transform ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <div aria-hidden="true" className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent/80 [height:var(--lanyard-drop)]" />
          <div
            tabIndex={0}
            role="group"
            aria-roledescription="Interactive hanging identity card"
            aria-label="Professional identity card for Vignesh T"
            aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointer}
            onPointerCancel={finishPointer}
            onPointerLeave={() => {
              if (!pointerRef.current && !reducedMotion) settle();
            }}
            onKeyDown={handleKeyDown}
            className="animate-id-card-arrive relative aspect-[.7] w-full touch-none rounded-card border border-border bg-surface p-5 text-ink shadow-elevated outline-none [margin-top:var(--lanyard-drop)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-6"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-card bg-accent" aria-hidden="true" />
            <div className="flex h-full flex-col pt-1">
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-[0.61rem] font-medium uppercase tracking-[0.16em] text-ink-muted">Digital identity</p>
                <span className="rounded-pill border border-accent/30 bg-accent-soft px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-accent-strong">Technical systems</span>
              </div>

              <div className="mt-5 flex items-end gap-4 sm:mt-6">
                <img src={PROFILE.portrait.src} alt={PROFILE.portrait.alt} width={PROFILE.portrait.width} height={PROFILE.portrait.height} fetchPriority="high" draggable={false} className="h-31 w-23 shrink-0 rounded-control border border-border object-cover object-[50%_14%] shadow-card sm:h-36 sm:w-26" />
                <div className="min-w-0 pb-0.5">
                  <p className="font-display text-[2.05rem] font-medium leading-none tracking-[-0.04em] sm:text-[2.4rem]">Vignesh T</p>
                  <p className="mt-2 text-[0.76rem] font-medium leading-5 text-accent-strong">Computer Science &amp; Systems Engineering</p>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <p className="font-mono text-[0.61rem] uppercase tracking-[0.14em] text-ink-muted">Focus</p>
                <p className="mt-2 text-[0.8rem] font-medium leading-5 text-ink-secondary">Networking / Applied Cryptography / AI Engineering</p>
              </div>

              <div className="mt-4">
                <p className="font-mono text-[0.61rem] uppercase tracking-[0.14em] text-ink-muted">Technical stack</p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {["Python", "Linux", "SQL", "Full-stack systems"].map((skill) => (
                    <span key={skill} className="rounded-pill border border-border bg-canvas px-2.5 py-1 font-mono text-[0.63rem] text-ink-secondary">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4 font-mono text-[0.61rem] uppercase tracking-[0.12em] text-ink-muted">
                <span>{PROFILE.location}</span>
                <a
                  href={PROFILE.resume}
                  download
                  className="text-accent underline underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-accent-strong"
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
