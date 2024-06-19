import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  bio: z.string().nullable(),
  thumbnailImage: z.string().nullable(),
});
export type UserSchema = z.infer<typeof UserSchema>;

export const UserSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  thumbnailImage: z.string().nullable(),
});
export type UserSummarySchema = z.infer<typeof UserSummarySchema>;
