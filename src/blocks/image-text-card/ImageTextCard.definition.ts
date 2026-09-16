import { defineWebBlock } from "../../registry/contracts";
import { ImageTextCard } from "./ImageTextCard";
import { imageTextCardSchema } from "./ImageTextCard.schema";
import type { ImageTextCardProps } from "./ImageTextCard.types";

export const imageTextCardDefaults = {
  image: {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    alt: "A bright collaborative workspace",
    width: 1200,
    height: 750,
  },
  title: "A flexible content card",
  description: "The same component adapts to company content, direction, and semantic theme tokens.",
  action: { href: "#details", label: "View details" },
  variant: "elevated",
  headingLevel: 3,
} satisfies ImageTextCardProps;

export const imageTextCardDefinition = defineWebBlock({
  key: "card.image-text",
  version: 1,
  category: "card",
  status: "experimental",
  label: { ar: "بطاقة صورة ونص", en: "Image and text card" },
  description: {
    ar: "بطاقة تحتوي على صورة وعنوان ووصف وإجراء اختياري.",
    en: "A card with an image, title, description, and optional action.",
  },
  propsSchema: imageTextCardSchema,
  defaultProps: imageTextCardDefaults,
  supportedVariants: ["elevated", "outlined", "flat"],
  component: ImageTextCard,
});
