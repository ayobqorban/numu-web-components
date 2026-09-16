import type { ReactNode } from "react";
import { classNames } from "../../utils/classes";
import styles from "./WebSection.module.css";

export interface WebSectionProps {
  children: ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
  surface?: "background" | "surface" | "primary";
  ariaLabel?: string;
}

export function WebSection({
  children,
  className,
  spacing = "md",
  surface = "background",
  ariaLabel,
}: WebSectionProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={classNames(styles.section, styles[spacing], styles[surface], className)}
      data-numu-component="web-section"
    >
      {children}
    </section>
  );
}
