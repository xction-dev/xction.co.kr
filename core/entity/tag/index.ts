import { ID } from "@core/constant/common/id";
import { z } from "zod";

export const Tag = z.object({
  id: ID.TAG,
});
export type Tag = z.infer<typeof Tag>;
