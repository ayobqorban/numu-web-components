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
  component: TextImage,
});
