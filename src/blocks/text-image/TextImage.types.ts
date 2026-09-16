import type { z } from "zod";
import type { textImageSchema } from "./TextImage.schema";

export type TextImageProps = z.infer<typeof textImageSchema>;
