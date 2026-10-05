import type { ComponentPropsWithRef, ReactNode } from "react";

interface LinkProps extends ComponentPropsWithRef<"a"> {
  href: string;
  children: ReactNode;
}

/** Inline/nav text link — distinct from `<Button href>`, which is CTA-styled. */
export function Link({ className = "", children, ...props }: LinkProps) {
  return (
    <a
      className={`text-ink underline decoration-border underline-offset-4 transition-colors duration-[var(--duration-fast)] ease-out hover:text-accent hover:decoration-accent ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
