import { z } from "zod";

/*
 * Primitives
 */
export const INTEGER_ID = z.number().int().nonnegative();
export type INTEGER_ID = z.infer<typeof INTEGER_ID>;

export const STRING_ID = z.string().min(1);
export type STRING_ID = z.infer<typeof STRING_ID>;

/*
 * Entities
 */
export const ID = {
  USER: INTEGER_ID,
  WORK: INTEGER_ID,
  ARTICLE: INTEGER_ID,
  TAG: INTEGER_ID,
  POST: INTEGER_ID,
  POST_COMMENT: INTEGER_ID,
  POST_REPLY: INTEGER_ID,
};

export type ID = {
  [key in keyof typeof ID]: z.infer<(typeof ID)[key]>;
};
