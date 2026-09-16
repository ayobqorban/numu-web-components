import type { ReactNode } from "react";
import { classNames } from "../../utils/classes";
import styles from "./WebButton.module.css";

export interface WebButtonProps {
  href: string;
  children: ReactNode;
  target?: "_self" | "_blank";
  rel?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

function safeRel(target: WebButtonProps["target"], rel: string | undefined): string | undefined {
  if (target !== "_blank") return rel;
  const values = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  values.add("noopener");
  values.add("noreferrer");
  return [...values].join(" ");
}

export function WebButton({
  href,
  children,
  target = "_self",
  rel,
  variant = "primary",
  className,
  ariaLabel,
}: WebButtonProps) {
  return (
    <a
      aria-label={ariaLabel}
      className={classNames(styles.button, styles[variant], className)}
      data-numu-component="web-button"
      href={href}
      rel={safeRel(target, rel)}
      target={target}
    >
      {children}
    </a>
  );
}
