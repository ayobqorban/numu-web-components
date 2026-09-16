import type { z } from "zod";
import type { imageTextCardSchema } from "./ImageTextCard.schema";

export type ImageTextCardProps = z.infer<typeof imageTextCardSchema>;
