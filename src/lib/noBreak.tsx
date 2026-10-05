import type { ReactNode } from "react";

// Technical identifiers that must never wrap mid-token ("ML-" / "KEM-768").
const TOKENS = /(ML-KEM-768|ML-DSA-65|RSA-2048|AES-256-GCM|AES-256)/g;

/** Wraps known hyphenated technical identifiers in a no-wrap span. */
export function noBreak(text: string): ReactNode[] {
  return text.split(TOKENS).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
