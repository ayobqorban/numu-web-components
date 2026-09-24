import { z } from "zod";
import { linkActionSchema, webImageSchema } from "../../schemas/shared";

export const layoutBrandSchema = z.object({
  name: z.string().trim().min(1).max(160),
  tagline: z.string().trim().max(240).optional(),
  href: z.string().trim().min(1).max(2048),
  logo: webImageSchema.optional(),
  variant: z.enum(["inline", "stacked"]),
}).strict();

export const layoutNavigationSchema = z.object({
  menuId: z.string().trim().min(1).max(100),
  label: z.string().trim().min(1).max(160),
  orientation: z.enum(["horizontal", "vertical"]),
  items: z.array(z.object({
    key: z.string().trim().min(1).max(100),
    label: z.string().trim().min(1).max(160),
    href: z.string().trim().min(1).max(2048),
    newWindow: z.boolean().optional(),
  }).strict()).max(50).optional(),
}).strict();

export const layoutHeadingSchema = z.object({
  text: z.string().trim().min(1).max(240),
  level: z.enum(["span", "h2", "h3", "p"]),
  alignment: z.enum(["start", "center", "end"]),
}).strict();

export const layoutImageSchema = z.object({
  image: webImageSchema,
  href: z.string().trim().max(2048).optional(),
  maxWidth: z.number().int().min(24).max(640),
}).strict();

export const layoutIconLinkSchema = z.object({
  icon: z.enum(["mail", "phone", "location", "search", "account", "cart"]),
  action: linkActionSchema,
  showLabel: z.boolean(),
  variant: z.enum(["plain", "soft", "outline"]),
}).strict();
