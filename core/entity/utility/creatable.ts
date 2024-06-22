import { z } from "zod";
import { UnknownUserSummary, UserSummary } from "../user/summary";

export const Creatable = z.object({
  createdUser: UserSummary.default(UnknownUserSummary),
  createdTime: z.instanceof(Date),
  lastModifiedTime: z.instanceof(Date).nullable(),
});
export type Creatable = z.infer<typeof Creatable>;
