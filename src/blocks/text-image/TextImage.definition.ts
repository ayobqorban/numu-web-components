import { defineWebBlock } from "../../registry/contracts";
import { TextImage } from "./TextImage";
import { textImageSchema } from "./TextImage.schema";
import type { TextImageProps } from "./TextImage.types";

export const textImageDefaults = {
  heading: "Content that works in both directions",
  description: "Logical layout properties keep the section predictable in Arabic and English without separate source code.",
  image: {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    alt: "A team planning around a table",
    width: 1200,
    height: 900,
  },
  imagePosition: "end",
  action: { href: "#approach", label: "Our approach" },
  headingLevel: 2,
} satisfies TextImageProps;

export const textImageDefinition = defineWebBlock({
  key: "content.text-image",
  version: 1,
  category: "content",
  status: "experimental",
  label: { ar: "نص مع صورة", en: "Text with image" },
  description: {
    ar: "قسم محتوى بعمود نصي وصورة يمكن وضعها في البداية أوالنهاية.",
    en: "A content section with text and an image positioned at the logical start or end.",
  },
  propsSchema: textImageSchema,
  defaultProps: textImageDefaults,
  supportedVariants: ["start", "end"],
  editor: {
    groups: [
      {
        key: "content",
        label: { ar: "المحتوى", en: "Content" },
        fields: [
          { path: "heading", kind: "text", label: { ar: "العنوان", en: "Heading" }, required: true, max: 180 },
          {
            path: "description",
            kind: "textarea",
            label: { ar: "الوصف", en: "Description" },
            required: true,
            max: 1200,
          },
        ],
      },
      {
        key: "image",
        path: "image",
        label: { ar: "الصورة", en: "Image" },
        defaultValue: textImageDefaults.image,
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
        defaultValue: { href: "#approach", label: "Our approach" },
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
            path: "imagePosition",
            kind: "select",
            label: { ar: "موضع الصورة", en: "Image position" },
            required: true,
            options: [
              { value: "start", label: { ar: "البداية", en: "Start" } },
              { value: "end", label: { ar: "النهاية", en: "End" } },
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
  component: TextImage,
});
