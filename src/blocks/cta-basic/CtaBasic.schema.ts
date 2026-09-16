import { z } from "zod";
import { headingLevelSchema, linkActionSchema } from "../../schemas/shared";

export const ctaBasicSchema = z
  .object({
    title: z.string().trim().min(1).max(180),
    description: z.string().trim().min(1).max(800),
    primaryAction: linkActionSchema,
    secondaryAction: linkActionSchema.optional(),
    alignment: z.enum(["start", "center"]),
    headingLevel: headingLevelSchema,
  })
  .strict();
