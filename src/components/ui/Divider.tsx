import type { ComponentPropsWithRef } from "react";

export function Divider({ className = "", ...props }: ComponentPropsWithRef<"hr">) {
  return <hr className={`border-t border-border ${className}`} {...props} />;
}
