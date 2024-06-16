import { z } from "zod";
import { UserSummary } from "../user/summary";
import { UNKNOWN_USER_SUMMARY } from "../../constant/user/unknownUser";

export const Creatable = z.object({
  createdUser: UserSummary.default(UNKNOWN_USER_SUMMARY),
  createdTime: z.instanceof(Date),
  lastModifiedTime: z.instanceof(Date).nullable(),
});
export type Creatable = z.infer<typeof Creatable>;
