import { z } from "zod";

export const POST_TYPE = z.enum([
  "FREE",
  "INFORMATION",
  "PROMOTION",
  "ONE_LINE_REVIEW",
]);
export type POST_TYPE = z.infer<typeof POST_TYPE>;
