import { z } from "zod";

const safeUrl = z
  .string()
  .trim()
  .min(1)
  .max(2_048)
  .refine((value) => {
    try {
      const parsed = new URL(value, "https://numu.invalid");
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }, "URL must be a safe relative, HTTP, or HTTPS URL.");

export const linkActionSchema = z
  .object({
    href: safeUrl,
    label: z.string().trim().min(1).max(120),
    target: z.enum(["_self", "_blank"]).optional(),
    rel: z.string().trim().max(200).optional(),
  })
  .strict();

export const webImageSchema = z
  .object({
    src: safeUrl,
    alt: z.string().trim().max(500).optional(),
    decorative: z.boolean().optional(),
    width: z.number().int().positive().max(10_000).optional(),
    height: z.number().int().positive().max(10_000).optional(),
  })
  .strict()
  .superRefine((image, context) => {
    if (!image.decorative && !image.alt) {
      context.addIssue({
        code: "custom",
        path: ["alt"],
        message: "A meaningful image requires alt text.",
      });
    }
  });

export const headingLevelSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export type LinkAction = z.infer<typeof linkActionSchema>;
export type WebImage = z.infer<typeof webImageSchema>;
export type HeadingLevel = z.infer<typeof headingLevelSchema>;
