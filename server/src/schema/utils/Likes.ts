import { z } from "zod";

export const LikesCountSchema = <Name extends string>(name: Name) =>
  z.object({
    [`${name}Id`]: z.number(),
    likesCount: z.number().default(0),
  });
export type LikesCountSchema = z.infer<ReturnType<typeof LikesCountSchema>>;
