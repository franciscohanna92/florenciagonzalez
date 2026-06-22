import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type BaseButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = BaseButtonProps & {
  href: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-accent-strong bg-accent-strong text-surface shadow-sm hover:bg-foreground hover:border-foreground",
  secondary:
    "border-border bg-surface text-foreground hover:border-accent hover:bg-accent-soft/50",
  ghost:
    "border-transparent bg-transparent text-foreground hover:border-border hover:bg-surface/70",
};

const getButtonClasses = (variant: ButtonVariant, className?: string) =>
  cn(
    "inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-3 text-sm font-medium leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-strong",
    variantClasses[variant],
    className,
  );

function isLinkButtonProps(
  props: LinkButtonProps | NativeButtonProps,
): props is LinkButtonProps {
  return typeof props.href === "string";
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  if (isLinkButtonProps(props)) {
    const {
      children,
      className,
      href,
      variant = "primary",
      ...anchorProps
    } = props;
    const classes = getButtonClasses(variant, className);
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a className={classes} href={href} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classes} href={href} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const {
    children,
    className,
    type = "button",
    variant = "primary",
    ...buttonProps
  } = props;
  const classes = getButtonClasses(variant, className);

  return (
    <button className={classes} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
