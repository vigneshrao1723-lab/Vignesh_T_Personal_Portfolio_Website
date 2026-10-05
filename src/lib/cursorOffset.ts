export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/**
 * Where the cursor is relative to a portrait, as -1..1 on each axis
 * (x: left→right, y: up→down), measured against half the window so the full
 * range is only reached at the window edges. Aimed at roughly eye level (38 %
 * down the frame) rather than the geometric centre, so the face "looks at"
 * the cursor instead of past it. Shared by the flat-photo tilt
 * (`CursorPortrait`) and the 3D head (`HeadScene`) so both behave the same.
 */
export function cursorOffset(rect: DOMRect, clientX: number, clientY: number) {
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height * 0.38;
  return {
    x: clamp((clientX - originX) / (window.innerWidth / 2), -1, 1),
    y: clamp((clientY - originY) / (window.innerHeight / 2), -1, 1),
  };
}
