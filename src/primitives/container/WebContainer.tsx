import type { ReactNode } from "react";
import { classNames } from "../../utils/classes";
import styles from "./WebContainer.module.css";

export interface WebContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow";
}

export function WebContainer({ children, className, size = "default" }: WebContainerProps) {
  return (
    <div
      className={classNames(styles.container, size === "narrow" && styles.narrow, className)}
      data-numu-component="web-container"
    >
      {children}
    </div>
  );
}
