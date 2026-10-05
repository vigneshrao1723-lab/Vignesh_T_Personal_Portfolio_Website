import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Box3, MathUtils, Vector3 } from "three";
import type { Group, Object3D } from "three";
import { getThreeColor } from "../lib/designTokensThree";
import { cursorOffset } from "../lib/cursorOffset";
import { useIsMobileViewport } from "../hooks/useIsMobileViewport";
import { StudioEnvironment } from "./StudioEnvironment";

// Deliberately small: a head that swings far looks like a toy. About 17° left/
// right and 10° up/down at the window edges; most of the time the cursor is
// nearer the middle and the movement is smaller still.
const MAX_YAW = 0.3;
const MAX_PITCH = 0.18;
// Higher = snappier. ~4 settles in well under a second with no overshoot.
const DAMPING = 4;
const SETTLE = 0.0005;

interface HeadSceneProps {
  url: string;
  /** Cursor tracking on/off (off for touch and reduced motion → static pose). */
  tracking: boolean;
  /** The element the cursor position is measured against. */
  frame: RefObject<HTMLElement | null>;
}

function Head({ url, tracking, frame }: HeadSceneProps) {
  const { scene } = useGLTF(url);
  const invalidate = useThree((state) => state.invalidate);
  const turnRef = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const turnNode = useRef<Object3D | null>(null);

  // Fit the model to the frame by scaling only, never re-centring it: the
  // origin is the neck pivot, so moving the geometry would move the pivot.
  const { scale, centerY } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const fitted = size.y > 0 ? 2.4 / size.y : 1;
    return { scale: fitted, centerY: center.y * fitted };
  }, [scene]);

  // Turn just a node called "Head" if the model has one; otherwise the whole model.
  useEffect(() => {
    let found: Object3D | undefined;
    scene.traverse((node) => {
      if (!found && /^head$/i.test(node.name)) found = node;
    });
    turnNode.current = found ?? turnRef.current;
  }, [scene]);

  useEffect(() => {
    if (!tracking) return;
    const onMove = (event: PointerEvent) => {
      const el = frame.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Off screen: don't wake the renderer for a head nobody can see.
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = cursorOffset(rect, event.clientX, event.clientY);
      target.current.x = offset.x;
      target.current.y = offset.y;
      invalidate();
    };
    const toNeutral = () => {
      target.current.x = 0;
      target.current.y = 0;
      invalidate();
    };
    // Cursor left the window: `mouseout` with no relatedTarget.
    const onOut = (event: MouseEvent) => {
      if (!event.relatedTarget) toNeutral();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", toNeutral);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", toNeutral);
      document.removeEventListener("mouseout", onOut);
    };
  }, [tracking, frame, invalidate]);

  useFrame((_, delta) => {
    const node = turnNode.current;
    if (!node) return;
    // +Y rotation turns +Z toward screen-right; +X rotation tips it downward,
    // so a cursor to the right of / below the eyes gives positive values.
    const goalY = target.current.x * MAX_YAW;
    const goalX = target.current.y * MAX_PITCH;
    node.rotation.y = MathUtils.damp(node.rotation.y, goalY, DAMPING, delta);
    node.rotation.x = MathUtils.damp(node.rotation.x, goalX, DAMPING, delta);
    if (Math.abs(node.rotation.y - goalY) > SETTLE || Math.abs(node.rotation.x - goalX) > SETTLE) {
      invalidate();
    }
  });

  return (
    <group position={[0, -centerY, 0]}>
      <group ref={turnRef}>
        <primitive object={scene} scale={scale} />
      </group>
    </group>
  );
}

/**
 * The 3D head for the Hero portrait slot. Same lighting recipe and
 * `frameloop="demand"` as the project scenes: it renders when something
 * changes (load, or cursor movement while easing) and is idle otherwise, so a
 * resting head costs no frames. Only ever imported lazily, and only when
 * `HEAD_MODEL_URL` exists (see `PortraitSlot`).
 */
export default function HeadScene(props: HeadSceneProps) {
  const isMobile = useIsMobileViewport();

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      frameloop="demand"
      camera={{ position: [0, 0, 6.5], fov: 28 }}
      fallback={<div aria-hidden="true" />}
    >
      <color attach="background" args={[getThreeColor("surface")]} />
      <StudioEnvironment />
      <ambientLight intensity={0.6} />
      <directionalLight position={[2.5, 3.5, 3]} intensity={1.0} />
      <directionalLight position={[-3, 0.5, -2]} intensity={0.3} />
      <Head {...props} />
    </Canvas>
  );
}
