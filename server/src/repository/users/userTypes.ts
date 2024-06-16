import { INTEGER_ID } from "@core/constant/common/id";
import { z } from "zod";

export const UserTypeSchema = z.object({
  id: INTEGER_ID,
  value: z.enum(["USER", "ADMIN"]),
});
export type UserTypeSchema = z.infer<typeof UserTypeSchema>;

export const userTypes = {
  schema: UserTypeSchema,
};
