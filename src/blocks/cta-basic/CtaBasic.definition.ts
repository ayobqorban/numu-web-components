import { defineWebBlock } from "../../registry/contracts";
import { CtaBasic } from "./CtaBasic";
import { ctaBasicSchema } from "./CtaBasic.schema";
import type { CtaBasicProps } from "./CtaBasic.types";

export const ctaBasicDefaults = {
  title: "Ready to build with stable contracts?",
  description: "Use the same validated component in previews and production websites.",
  primaryAction: { href: "#get-started", label: "Get started" },
  secondaryAction: { href: "#documentation", label: "Read documentation" },
  alignment: "start",
  headingLevel: 2,
} satisfies CtaBasicProps;

export const ctaBasicDefinition = defineWebBlock({
  key: "cta.basic",
  version: 1,
  category: "cta",
  status: "experimental",
  label: { ar: "دعوة إجراء أساسية", en: "Basic call to action" },
  description: {
    ar: "قسم دعوة لاتخاذ إجراء أساسي مع إجراء ثانوي اختياري.",
    en: "A call-to-action section with a required primary and optional secondary action.",
  },
  propsSchema: ctaBasicSchema,
  defaultProps: ctaBasicDefaults,
  supportedVariants: ["start", "center"],
  placements: ["page"],
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
        key: "primaryAction",
        path: "primaryAction",
        label: { ar: "الإجراء الأساسي", en: "Primary action" },
        defaultValue: { href: "#get-started", label: "Get started" },
        fields: [
          { path: "label", kind: "text", label: { ar: "النص", en: "Label" }, required: true, max: 120 },
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, required: true, max: 2048 },
        ],
      },
      {
        key: "secondaryAction",
        path: "secondaryAction",
        label: { ar: "الإجراء الثانوي", en: "Secondary action" },
        optional: true,
        defaultValue: { href: "#documentation", label: "Read documentation" },
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
            path: "alignment",
            kind: "select",
            label: { ar: "المحاذاة", en: "Alignment" },
            required: true,
            options: [
              { value: "start", label: { ar: "البداية", en: "Start" } },
              { value: "center", label: { ar: "الوسط", en: "Center" } },
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
  component: CtaBasic,
});
