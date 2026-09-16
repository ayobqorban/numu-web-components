import type { ReactNode } from "react";
import type { HeadingLevel } from "../../schemas/shared";
import { classNames } from "../../utils/classes";
import styles from "./WebHeading.module.css";

export interface WebHeadingProps {
  children: ReactNode;
  level?: HeadingLevel;
  size?: "lg" | "xl" | "2xl" | "3xl";
  className?: string;
}

export function WebHeading({ children, level = 2, size = "2xl", className }: WebHeadingProps) {
  const Heading = `h${level}` as const;
  return (
    <Heading className={classNames(styles.heading, styles[size], className)} data-numu-component="web-heading">
      {children}
    </Heading>
  );
}
