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

/**
 * Drop-in slot for the 3D head. Put the compressed model at
 * `src/assets/head.glb` and that is the whole setup. While the file does not
 * exist this is `undefined`, the portrait slot renders the flat photo above,
 * and the 3D code (`HeadScene`) is never requested. Once it exists, the Hero
 * loads the model lazily and the head turns toward the cursor.
 *
 * Model requirements (see `HeadScene`): glTF 2.0 binary, ideally under 2 MB
 * (meshopt- or Draco-compressed, textures up to 2048 px), origin at the base
 * of the neck (that is the rotation pivot), face pointing +Z, +Y up. Real-world
 * scale does not matter: it is fitted to the frame. Optional: name the head
 * node "Head" to turn only the head and keep the shoulders still.
 */
const headModels = import.meta.glob("../assets/head.glb", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const HEAD_MODEL_URL: string | undefined = Object.values(headModels)[0];
