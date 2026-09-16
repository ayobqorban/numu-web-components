import { WebButton, WebContainer, WebHeading, WebSection } from "../../primitives";
import { classNames } from "../../utils/classes";
import type { HeroBasicProps } from "./HeroBasic.types";
import styles from "./HeroBasic.module.css";

export function HeroBasic({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  image,
  alignment,
  headingLevel,
}: HeroBasicProps) {
  return (
    <WebSection className={styles.section} spacing="lg">
      <WebContainer>
        <div
          className={classNames(styles.layout, image && styles.withImage, alignment === "center" && styles.center)}
          data-numu-block="hero.basic"
        >
          <div className={styles.content}>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <WebHeading level={headingLevel} size="3xl">
              {title}
            </WebHeading>
            <p className={styles.description}>{description}</p>
            {primaryAction || secondaryAction ? (
              <div className={styles.actions}>
                {primaryAction ? (
                  <WebButton href={primaryAction.href} rel={primaryAction.rel} target={primaryAction.target}>
                    {primaryAction.label}
                  </WebButton>
                ) : null}
                {secondaryAction ? (
                  <WebButton
                    href={secondaryAction.href}
                    rel={secondaryAction.rel}
                    target={secondaryAction.target}
                    variant="secondary"
                  >
                    {secondaryAction.label}
                  </WebButton>
                ) : null}
              </div>
            ) : null}
          </div>
          {image ? (
            <div className={styles.media}>
              <img
                alt={image.decorative ? "" : image.alt}
                className={styles.image}
                height={image.height}
                src={image.src}
                width={image.width}
              />
            </div>
          ) : null}
        </div>
      </WebContainer>
    </WebSection>
  );
}
