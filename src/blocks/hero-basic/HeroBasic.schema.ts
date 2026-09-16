import { z } from "zod";
import { headingLevelSchema, linkActionSchema, webImageSchema } from "../../schemas/shared";

export const heroBasicSchema = z
  .object({
    eyebrow: z.string().trim().min(1).max(120).optional(),
    title: z.string().trim().min(1).max(180),
    description: z.string().trim().min(1).max(1_000),
    primaryAction: linkActionSchema.optional(),
    secondaryAction: linkActionSchema.optional(),
    image: webImageSchema.optional(),
    alignment: z.enum(["start", "center"]),
    headingLevel: headingLevelSchema,
  })
  .strict();
