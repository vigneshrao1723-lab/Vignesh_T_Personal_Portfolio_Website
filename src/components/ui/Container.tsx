import type { ComponentPropsWithRef, ReactNode } from "react";

interface ContainerProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
}

export function Container({
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-gutter ${className}`} {...props}>
      {children}
    </div>
  );
}
