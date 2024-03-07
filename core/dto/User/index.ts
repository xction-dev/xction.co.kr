import { z } from "zod";

export const UserDto = z.object({
  id: z.number().int(),
  name: z.string(),
});
export type UserDto = z.infer<typeof UserDto>;
