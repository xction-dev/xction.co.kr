import { z } from "zod";

export const POST_TEXT = {
  TITLE: z.string().min(1).max(100),
  CONTENT: z.string().min(1),
  COMMENT_CONTENT: z.string().min(1),
};
export type POST_TEXT = {
  [key in keyof typeof POST_TEXT]: z.infer<(typeof POST_TEXT)[key]>;
};
