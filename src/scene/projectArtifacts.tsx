import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import type { Mesh } from "three";
import { getThreeColor } from "../lib/designTokensThree";
import type { ColorToken } from "../lib/designTokens";
import { edgeTransform } from "./edgeTransform";
import { useArtifactMotion } from "./useArtifactMotion";

const NODE_RADIUS = 0.42;
const EDGE_RADIUS = 0.035;

/** Crystal node material: transmissive teal glass (shared by all three artifacts). */
function NodeMaterial({ color }: { color: ColorToken }) {
  return (
    <meshPhysicalMaterial
      color={getThreeColor(color)}
      roughness={0.15}
      metalness={0}
      transmission={0.85}
      thickness={0.5}
      ior={1.5}
      clearcoat={0.4}
      clearcoatRoughness={0.2}
    />
  );
}

/** Metallic edge material: brushed dark metal (shared by all three artifacts). */
function EdgeMaterial() {
  return (
    <meshStandardMaterial color={getThreeColor("ink-secondary")} metalness={0.85} roughness={0.3} />
  );
}

/**
 * Project 01 — Quantum-Resistant Secure Communication System.
 * client (left node) —[handshake / secure session]→ server (right node).
 * Phase 6 polish: packets are a visibly distinct accent-strong crystal
 * (previously the same dark metal as the edge itself — effectively
 * invisible against it), and they travel along the connection while
 * hovered rather than sitting static, reading as an active exchange rather
 * than a decorated line. Not a generic floating lock.
 */
export function CryptoArtifact() {
  const { groupRef, hoverHandlers, hovered, reducedMotion, invalidate } = useArtifactMotion();
  const packetRefs = useRef<(Mesh | null)[]>([]);
  const packetProgress = useRef(0);

  const { left, right, edge, restPositions } = useMemo(() => {
    const left = new Vector3(-1.4, 0, 0);
    const right = new Vector3(1.4, 0, 0);
    const restT = [0.25, 0.5, 0.75];
    const restPositions = restT.map((t) => new Vector3().lerpVectors(left, right, t));
    return { left, right, edge: edgeTransform(left, right), restPositions };
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !hovered) return;
    packetProgress.current += delta * 0.35;
    packetRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = ([0.25, 0.5, 0.75][i] + packetProgress.current) % 1;
      mesh.position.lerpVectors(left, right, t);
    });
    invalidate();
  });

  return (
    <group ref={groupRef} {...hoverHandlers}>
      <mesh position={edge.position} quaternion={edge.quaternion} scale={edge.scale}>
        <cylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, 1, 8]} />
        <EdgeMaterial />
      </mesh>

      <mesh position={left}>
        <icosahedronGeometry args={[NODE_RADIUS, 0]} />
        <NodeMaterial color="accent" />
      </mesh>
      <mesh position={right}>
        <icosahedronGeometry args={[NODE_RADIUS, 0]} />
        <NodeMaterial color="accent" />
      </mesh>

      {restPositions.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            packetRefs.current[i] = el;
          }}
          position={p}
        >
          <sphereGeometry args={[0.09, 16, 16]} />
          <NodeMaterial color="accent-strong" />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Project 02 — Advanced RAG Knowledge Assistant.
 * A central query point with a document/embedding cluster around it.
 * Phase 6 polish: all nodes previously shared one identical crystal
 * material, so "retrieved" only read from the edges existing, not from
 * the nodes themselves. Now the query is a distinct deep-accent crystal,
 * retrieved chunks are the standard accent crystal, and the rest of the
 * corpus is dulled to the same inert metal as the connecting edges —
 * "activated" vs "inert" reuses the crystal/metal duality the whole
 * project already establishes, rather than inventing a third material.
 * Communicates retrieval, not a generic AI brain or chatbot orb.
 */
export function RagArtifact() {
  const { groupRef, hoverHandlers } = useArtifactMotion();

  const { query, documents, edges, retrievedSet } = useMemo(() => {
    const query = new Vector3(0, 0, 0);
    const count = 8;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const documents: Vector3[] = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      documents.push(
        new Vector3(Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY).multiplyScalar(1.3),
      );
    }
    // Only a few nodes are "retrieved" — connected to the query.
    const retrievedIndices = [0, 3, 6];
    const edges = retrievedIndices.map((i) => edgeTransform(query, documents[i]));
    return { query, documents, edges, retrievedSet: new Set(retrievedIndices) };
  }, []);

  return (
    <group ref={groupRef} {...hoverHandlers}>
      {edges.map((edge, i) => (
        <mesh key={i} position={edge.position} quaternion={edge.quaternion} scale={edge.scale}>
          <cylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, 1, 8]} />
          <EdgeMaterial />
        </mesh>
      ))}

      <mesh position={query}>
        <icosahedronGeometry args={[0.32, 0]} />
        <NodeMaterial color="accent-strong" />
      </mesh>

      {documents.map((d, i) => (
        <mesh key={i} position={d}>
          <icosahedronGeometry args={[0.22, 0]} />
          {retrievedSet.has(i) ? <NodeMaterial color="accent" /> : <EdgeMaterial />}
        </mesh>
      ))}
    </group>
  );
}

/**
 * Project 03 — Project Store.
 * A linear flow of distinct geometric stages — catalog, cart, checkout,
 * order. Phase 6 polish: each stage now reads as further along the
 * funnel via material alone — catalog stays inert metal (browsing, not
 * yet engaged), then crystal saturation deepens stage by stage
 * (accent-soft → accent → accent-strong) through cart/checkout/order —
 * a legible progression using only the two existing material recipes and
 * already-established tokens. Not a generic shopping-cart icon.
 */
export function CommerceArtifact() {
  const { groupRef, hoverHandlers } = useArtifactMotion();

  const { positions, edges } = useMemo(() => {
    const positions = [-1.3, -0.43, 0.43, 1.3].map((x) => new Vector3(x, 0, 0));
    const edges = [0, 1, 2].map((i) => edgeTransform(positions[i], positions[i + 1]));
    return { positions, edges };
  }, []);

  return (
    <group ref={groupRef} {...hoverHandlers}>
      {edges.map((edge, i) => (
        <mesh key={i} position={edge.position} quaternion={edge.quaternion} scale={edge.scale}>
          <cylinderGeometry args={[EDGE_RADIUS, EDGE_RADIUS, 1, 8]} />
          <EdgeMaterial />
        </mesh>
      ))}

      {/* catalog — inert, not yet engaged */}
      <mesh position={positions[0]}>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <EdgeMaterial />
      </mesh>
      {/* cart — engaged, pale crystal */}
      <mesh position={positions[1]}>
        <icosahedronGeometry args={[0.34, 0]} />
        <NodeMaterial color="accent-soft" />
      </mesh>
      {/* checkout — mid crystal */}
      <mesh position={positions[2]}>
        <octahedronGeometry args={[0.38, 0]} />
        <NodeMaterial color="accent" />
      </mesh>
      {/* order — completed, deep crystal */}
      <mesh position={positions[3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.12, 12, 24]} />
        <NodeMaterial color="accent-strong" />
      </mesh>
    </group>
  );
}
