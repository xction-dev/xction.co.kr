import { z } from "zod";
import { ID } from "@core/constant/common/id";
import { USER_TYPE } from "@core/constant/user/userType";
import { USER_TEXT } from "@core/constant/user/text";

/**
 * @entity User
 * @description 사용자입니다. 어드민(Xction 멤버)와 일반 유저를 모두 포함합니다.
 */
export const User = z.object({
  id: ID.USER,
  type: USER_TYPE.default("USER"),
  email: z.string().email(),
  name: USER_TEXT.NAME,
  bio: USER_TEXT.BIO.nullable(),

  // image
  thumbnailImage: z.string().nullable(),
});
export type User = z.infer<typeof User>;
