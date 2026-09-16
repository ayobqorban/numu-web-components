import type { z } from "zod";
import type { heroBasicSchema } from "./HeroBasic.schema";

export type HeroBasicProps = z.infer<typeof heroBasicSchema>;
