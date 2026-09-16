import { WebButton, WebContainer, WebHeading, WebSection } from "../../primitives";
import { classNames } from "../../utils/classes";
import type { CtaBasicProps } from "./CtaBasic.types";
import styles from "./CtaBasic.module.css";

export function CtaBasic({
  title,
  description,
  primaryAction,
  secondaryAction,
  alignment,
  headingLevel,
}: CtaBasicProps) {
  return (
    <WebSection className={styles.section} spacing="md" surface="primary">
      <WebContainer>
        <div className={classNames(styles.layout, alignment === "center" && styles.center)} data-numu-block="cta.basic">
          <div className={styles.content}>
            <WebHeading level={headingLevel} size="2xl">
              {title}
            </WebHeading>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.actions}>
            <WebButton
              href={primaryAction.href}
              rel={primaryAction.rel}
              target={primaryAction.target}
              variant="secondary"
            >
              {primaryAction.label}
            </WebButton>
            {secondaryAction ? (
              <WebButton
                href={secondaryAction.href}
                rel={secondaryAction.rel}
                target={secondaryAction.target}
                variant="ghost"
              >
                {secondaryAction.label}
              </WebButton>
            ) : null}
          </div>
        </div>
      </WebContainer>
    </WebSection>
  );
}
