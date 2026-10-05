import type { ComponentPropsWithRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "subtle";

export type ButtonProps = { variant?: ButtonVariant; children: ReactNode } & (
  | ({ href: string } & Omit<ComponentPropsWithRef<"a">, "children">)
  | ({ href?: undefined } & Omit<ComponentPropsWithRef<"button">, "children">)
);

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-card hover:shadow-elevated hover:-translate-y-0.5 active:translate-y-0 active:bg-accent-strong active:shadow-card",
  secondary:
    "bg-transparent text-ink border border-border hover:border-accent hover:text-accent active:bg-accent-soft active:border-accent-strong active:text-accent-strong",
  subtle:
    "bg-transparent text-accent hover:bg-accent-soft active:text-accent-strong",
};

// Icon-button variant is deliberately not built yet — no current consumer
// (no icon library is installed; none has ever been needed). Add it, with
// whatever icon dependency that actually requires, when a real call site
// needs one, per spec §10's "only what later sections genuinely require."
const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-control px-6 py-3 text-body-sm font-medium font-body transition duration-[var(--duration-fast)] ease-out disabled:pointer-events-none disabled:opacity-50";

/** CTA control. Renders a real `<a>` when `href` is given (navigation), otherwise a `<button>`. */
export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (props.href !== undefined) {
    return (
      <a className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
