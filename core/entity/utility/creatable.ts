import { z } from "zod";
import { UserSumamry } from "../user/summary";

export const Creatable = z.object({
  createdUser: UserSumamry,
  createdTime: z.instanceof(Date),
  lastModifiedTime: z.instanceof(Date),
});
export type Creatable = z.infer<typeof Creatable>;
