import type { ComponentPropsWithRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
