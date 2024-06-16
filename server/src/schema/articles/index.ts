import { z } from "zod";
import { CreatableSchema } from "../utils/Creatable";

export const ArticleSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    description: z.string().nullable(),
  })
  .merge(CreatableSchema);
export type ArticleSchema = z.infer<typeof ArticleSchema>;

export const ArticleContentSchema = z.object({
  id: z.number(),
  content: z.string(),
});
export type ArticleContentSchema = z.infer<typeof ArticleContentSchema>;
