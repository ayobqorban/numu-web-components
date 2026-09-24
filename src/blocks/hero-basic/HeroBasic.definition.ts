import { defineWebBlock } from "../../registry/contracts";
import { HeroBasic } from "./HeroBasic";
import { heroBasicSchema } from "./HeroBasic.schema";
import type { HeroBasicProps } from "./HeroBasic.types";

export const heroBasicDefaults = {
  eyebrow: "NUMU Web Components",
  title: "A dependable foundation for every company website",
  description: "Build once, validate every payload, and adapt the same component to every brand.",
  primaryAction: { href: "#learn-more", label: "Learn more" },
  alignment: "start",
  headingLevel: 1,
} satisfies HeroBasicProps;

export const heroBasicDefinition = defineWebBlock({
  key: "hero.basic",
  version: 1,
  category: "hero",
  status: "experimental",
  label: { ar: "واجهة رئيسية أساسية", en: "Basic hero" },
  description: {
    ar: "واجهة افتتاحية بعنوان ووصف وإجراءات وصورة اختيارية.",
    en: "Opening section with a title, description, actions, and optional image.",
  },
  propsSchema: heroBasicSchema,
  defaultProps: heroBasicDefaults,
  supportedVariants: ["start", "center"],
  placements: ["page"],
  editor: {
    groups: [
      {
        key: "content",
        label: { ar: "المحتوى", en: "Content" },
        fields: [
          { path: "eyebrow", kind: "text", label: { ar: "النص التمهيدي", en: "Eyebrow" }, max: 120 },
          { path: "title", kind: "text", label: { ar: "العنوان", en: "Title" }, required: true, max: 180 },
          {
            path: "description",
            kind: "textarea",
            label: { ar: "الوصف", en: "Description" },
            required: true,
            max: 1000,
          },
        ],
      },
      {
        key: "primaryAction",
        path: "primaryAction",
        label: { ar: "الإجراء الأساسي", en: "Primary action" },
        optional: true,
        defaultValue: { href: "#learn-more", label: "Learn more" },
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
        defaultValue: { href: "#details", label: "View details" },
        fields: [
          { path: "label", kind: "text", label: { ar: "النص", en: "Label" }, required: true, max: 120 },
          { path: "href", kind: "url", label: { ar: "الرابط", en: "Link" }, required: true, max: 2048 },
        ],
      },
      {
        key: "image",
        path: "image",
        label: { ar: "الصورة", en: "Image" },
        optional: true,
        defaultValue: {
          src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
          alt: "A modern workspace",
          width: 1200,
          height: 900,
        },
        fields: [
          { path: "src", kind: "url", label: { ar: "مصدر الصورة", en: "Image source" }, required: true, max: 2048 },
          { path: "alt", kind: "text", label: { ar: "النص البديل", en: "Alternative text" }, max: 500 },
          { path: "decorative", kind: "boolean", label: { ar: "صورة زخرفية", en: "Decorative image" } },
          { path: "width", kind: "number", label: { ar: "العرض", en: "Width" }, min: 1, max: 10000, step: 1 },
          { path: "height", kind: "number", label: { ar: "الارتفاع", en: "Height" }, min: 1, max: 10000, step: 1 },
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
  component: HeroBasic,
});
