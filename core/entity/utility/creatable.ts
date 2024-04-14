import { z } from "zod";
import { UserSumamry } from "../user/summary";

export const Creatable = z.object({
  createdUser: UserSumamry,
  createdTime: z.string().datetime(),
  lastModifiedTime: z.string().datetime().nullable(),
});
export type Creatable = z.infer<typeof Creatable>;
