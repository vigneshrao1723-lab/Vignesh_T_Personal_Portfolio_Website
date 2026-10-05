import { Color } from "three";
import { getColorToken, type ColorToken } from "./designTokens";

/**
 * Three.js-specific token bridge — split out of `designTokens.ts` so
 * importing the plain CSS-token helpers never pulls `three` into a bundle
 * that doesn't need it. Only import this from code that's already inside
 * the lazy-loaded 3D scene (src/scene/**).
 */
export function getThreeColor(token: ColorToken): Color {
  return new Color(getColorToken(token));
}
