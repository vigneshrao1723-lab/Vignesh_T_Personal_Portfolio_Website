import { Quaternion, Vector3 } from "three";

const UP = new Vector3(0, 1, 0);

/**
 * Position/quaternion/scale for a unit cylinder (height 1, along Y) so it
 * spans exactly between two points (quaternion from the Y axis to the edge
 * direction, scaled to the edge length). All three project artifacts use it
 * for individual connector meshes; their edge counts are small enough that
 * InstancedMesh isn't warranted.
 */
export function edgeTransform(a: Vector3, b: Vector3) {
  const direction = new Vector3().subVectors(b, a);
  const length = direction.length();
  const midpoint = new Vector3().addVectors(a, b).multiplyScalar(0.5);
  const quaternion = new Quaternion().setFromUnitVectors(UP, direction.clone().normalize());
  return {
    position: midpoint.toArray() as [number, number, number],
    quaternion,
    scale: [1, length, 1] as [number, number, number],
  };
}
