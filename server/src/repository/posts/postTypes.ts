import { z } from "zod";
import { INTEGER_ID } from "@core/constant/common/id";

export const PostTypesSchema = z.object({
  id: INTEGER_ID,
  value: z.enum(["FREE", "INFORMATION", "PROMOTION", "ONE_LINE_REVIEW"]),
});
export type PostTypesSchema = z.infer<typeof PostTypesSchema>;

export const postTypes = {
  schema: PostTypesSchema,
};
