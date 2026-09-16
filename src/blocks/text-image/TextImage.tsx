import { WebButton, WebContainer, WebHeading, WebSection } from "../../primitives";
import { classNames } from "../../utils/classes";
import type { TextImageProps } from "./TextImage.types";
import styles from "./TextImage.module.css";

export function TextImage({ heading, description, image, imagePosition, action, headingLevel }: TextImageProps) {
  return (
    <WebSection>
      <WebContainer>
        <div
          className={classNames(styles.layout, imagePosition === "start" && styles.imageFirst)}
          data-numu-block="content.text-image"
        >
          <div className={styles.content}>
            <WebHeading level={headingLevel} size="2xl">
              {heading}
            </WebHeading>
            <p className={styles.description}>{description}</p>
            {action ? (
              <WebButton href={action.href} rel={action.rel} target={action.target}>
                {action.label}
              </WebButton>
            ) : null}
          </div>
          <div className={styles.media}>
            <img
              alt={image.decorative ? "" : image.alt}
              className={styles.image}
              height={image.height}
              loading="lazy"
              src={image.src}
              width={image.width}
            />
          </div>
        </div>
      </WebContainer>
    </WebSection>
  );
}
