import { z } from "zod";

export const UserSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  thumbnailImage: z.string().nullable(),
});
export type UserSummarySchema = z.infer<typeof UserSummarySchema>;
