import { z } from "zod";

export const CreatableSchema = z.object({
  createdUserId: z.number().nullable(),
  createdTime: z.date(),
  lastModifiedTime: z.date().nullable(),
});
export type CreatableSchema = z.infer<typeof CreatableSchema>;
