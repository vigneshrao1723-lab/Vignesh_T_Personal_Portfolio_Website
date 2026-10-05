import { createElement } from "react";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

type TextElement = "p" | "span";
type TextTone = "primary" | "secondary" | "muted";
type TextSize = "body-lg" | "body" | "body-sm" | "caption";

const toneClasses: Record<TextTone, string> = {
  primary: "text-ink",
  secondary: "text-ink-secondary",
  muted: "text-ink-muted",
};

const sizeClasses: Record<TextSize, string> = {
  "body-lg": "text-body-lg",
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "font-mono text-caption uppercase tracking-[0.15em]",
};

interface TextProps extends ComponentPropsWithRef<"p"> {
  as?: TextElement;
  tone?: TextTone;
  size?: TextSize;
  children: ReactNode;
}

export function Text({
  as = "p",
  tone = "primary",
  size = "body",
  className = "",
  children,
  ...props
}: TextProps) {
  return createElement(
    as as ElementType,
    {
      className: `${sizeClasses[size]} ${toneClasses[tone]} ${className}`,
      ...props,
    },
    children,
  );
}
