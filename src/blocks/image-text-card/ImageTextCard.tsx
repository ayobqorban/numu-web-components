import { WebButton, WebHeading } from "../../primitives";
import { classNames } from "../../utils/classes";
import type { ImageTextCardProps } from "./ImageTextCard.types";
import styles from "./ImageTextCard.module.css";

export function ImageTextCard({ image, title, description, action, variant, headingLevel }: ImageTextCardProps) {
  return (
    <article className={classNames(styles.card, styles[variant])} data-numu-block="card.image-text">
      <img
        alt={image.decorative ? "" : image.alt}
        className={styles.image}
        height={image.height}
        loading="lazy"
        src={image.src}
        width={image.width}
      />
      <div className={styles.content}>
        <WebHeading level={headingLevel} size="xl">
          {title}
        </WebHeading>
        <p className={styles.description}>{description}</p>
        {action ? (
          <WebButton href={action.href} rel={action.rel} target={action.target} variant="ghost">
            {action.label}
          </WebButton>
        ) : null}
      </div>
    </article>
  );
}
