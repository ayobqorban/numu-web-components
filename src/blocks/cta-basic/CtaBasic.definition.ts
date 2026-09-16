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
  component: CtaBasic,
});
