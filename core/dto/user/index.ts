import { USER_TEXT } from "@core/constant/user/text";
import { User } from "@core/entity/user";
import { z } from "zod";

export const UserDto = User;
export type UserDto = z.infer<typeof UserDto>;

export const PostRegisterBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: USER_TEXT.NAME,
});
export type PostRegisterBody = z.infer<typeof PostRegisterBody>;

export const PostLoginBody = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type PostLoginBody = z.infer<typeof PostLoginBody>;
