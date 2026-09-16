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
  editor: {
    groups: [
      {
        key: "content",
        label: { ar: "المحتوى", en: "Content" },
        fields: [
          { path: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, required: true, max: 180 },
          {
            path: "description",
            kind: "textarea",
            label: { ar: "الوصف", en: "Description" },
            required: true,
            max: 800,
          },
        ],
      },
      {
        key: "image",
        path: "image",
        label: { ar: "الصورة", en: "Image" },
        defaultValue: imageTextCardDefaults.image,
        fields: [
          { path: "src", kind: "url", label: { ar: "مصدر الصورة", en: "Image source" }, required: true, max: 2048 },
          { path: "alt", kind: "text", label: { ar: "النص البديل", en: "Alternative text" }, max: 500 },
          { path: "decorative", kind: "boolean", label: { ar: "صورة زخرفية", en: "Decorative image" } },
          { path: "width", kind: "number", label: { ar: "العرض", en: "Width" }, min: 1, max: 10000, step: 1 },
          { path: "height", kind: "number", label: { ar: "الارتفاع", en: "Height" }, min: 1, max: 10000, step: 1 },
        ],
      },
      {
        key: "action",
        path: "action",
        label: { ar: "الإجراء", en: "Action" },
        optional: true,
        defaultValue: { href: "#details", label: "View details" },
        fields: [
          { path: "label", kind: "text", label: { ar: "النص", en: "Label" }, required: true, max: 120 },
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, required: true, max: 2048 },
        ],
      },
      {
        key: "presentation",
        label: { ar: "العرض", en: "Presentation" },
        fields: [
          {
            path: "variant",
            kind: "select",
            label: { ar: "النمط", en: "Variant" },
            required: true,
            options: [
              { value: "elevated", label: { ar: "بارز", en: "Elevated" } },
              { value: "outlined", label: { ar: "محدد", en: "Outlined" } },
              { value: "flat", label: { ar: "مسطح", en: "Flat" } },
            ],
          },
          {
            path: "headingLevel",
            kind: "select",
            label: { ar: "مستوى العنوان", en: "Heading level" },
            required: true,
            options: [1, 2, 3, 4, 5, 6].map((value) => ({
              value,
              label: { ar: `H${value}`, en: `H${value}` },
            })),
          },
        ],
      },
    ],
  },
  component: ImageTextCard,
});
