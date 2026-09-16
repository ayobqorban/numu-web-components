import type { z } from "zod";
import type { ctaBasicSchema } from "./CtaBasic.schema";

export type CtaBasicProps = z.infer<typeof ctaBasicSchema>;
