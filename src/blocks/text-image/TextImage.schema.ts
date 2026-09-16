import { z } from "zod";
import { headingLevelSchema, linkActionSchema, webImageSchema } from "../../schemas/shared";

export const textImageSchema = z
  .object({
    heading: z.string().trim().min(1).max(180),
    description: z.string().trim().min(1).max(1_200),
    image: webImageSchema,
    imagePosition: z.enum(["start", "end"]),
    action: linkActionSchema.optional(),
    headingLevel: headingLevelSchema,
  })
  .strict();
