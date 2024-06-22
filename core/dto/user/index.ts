import { z } from "zod";
import { User } from "@core/entity/user";

export const UserDto = User;
export type UserDto = z.infer<typeof UserDto>;
