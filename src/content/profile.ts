import portrait from "../assets/portrait.jpg";

/**
 * The personal portrait shown in About (rendered by `CursorPortrait`).
 *
 * To swap in the final 3D character/photo: put the image in `src/assets/`,
 * import it above, and change `src` (and `width`/`height` to its real pixel
 * size, so layout space is reserved and nothing shifts). A transparent
 * PNG/WebP works as-is; no component needs to change. If the new asset is a
 * real 3D model instead of an image, `CursorPortrait` is the one component
 * to replace — nothing else reads this object.
 */
export const PORTRAIT = {
  src: portrait,
  alt: "Portrait of Vignesh T",
  width: 1044,
  height: 1507,
};
