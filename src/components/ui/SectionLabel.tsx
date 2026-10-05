import type { ReactNode } from "react";

interface SectionLabelProps {
  /** e.g. "00", "01" — spec §3's numbered-section structural motif. */
  index: string;
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ index, children, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-caption uppercase tracking-[0.2em] text-ink-muted ${className}`}
    >
      <span className="text-accent">{index}</span>
      <span>{children}</span>
    </p>
  );
}
