import type { z } from "zod";
import type { layoutBrandSchema, layoutHeadingSchema, layoutIconLinkSchema, layoutImageSchema, layoutNavigationSchema } from "./LayoutElements.schema";

export type LayoutBrandProps = z.infer<typeof layoutBrandSchema>;
export type LayoutNavigationProps = z.infer<typeof layoutNavigationSchema>;
export type LayoutHeadingProps = z.infer<typeof layoutHeadingSchema>;
export type LayoutImageProps = z.infer<typeof layoutImageSchema>;
export type LayoutIconLinkProps = z.infer<typeof layoutIconLinkSchema>;
