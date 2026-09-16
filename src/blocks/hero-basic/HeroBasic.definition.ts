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
  component: HeroBasic,
});
