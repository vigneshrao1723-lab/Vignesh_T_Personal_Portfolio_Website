import { createElement } from "react";
import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";
type HeadingSize =
  | "display-2xl"
  | "display-lg"
  | "heading-lg"
  | "heading-md"
  | "heading-sm";

const sizeClasses: Record<HeadingSize, string> = {
  "display-2xl": "text-display-2xl",
  "display-lg": "text-display-lg",
  "heading-lg": "text-heading-lg",
  "heading-md": "text-heading-md",
  "heading-sm": "text-heading-sm",
};

interface HeadingProps extends ComponentPropsWithRef<HeadingLevel> {
  as?: HeadingLevel;
  size?: HeadingSize;
  children: ReactNode;
}

export function Heading({
  as = "h2",
  size = "heading-lg",
  className = "",
  children,
  ...props
}: HeadingProps) {
  return createElement(
    as as ElementType,
    {
      className: `font-display font-medium text-ink ${sizeClasses[size]} ${className}`,
      ...props,
    },
    children,
  );
}
