import { z } from "zod";
import { headingLevelSchema, linkActionSchema, webImageSchema } from "../../schemas/shared";

export const imageTextCardSchema = z
  .object({
    image: webImageSchema,
    title: z.string().trim().min(1).max(180),
    description: z.string().trim().min(1).max(800),
    action: linkActionSchema.optional(),
    variant: z.enum(["elevated", "outlined", "flat"]),
    headingLevel: headingLevelSchema,
  })
  .strict();
