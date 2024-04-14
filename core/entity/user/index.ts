import { z } from "zod";
import { Authorization } from "../../utility/Authorization";
import { PublicId } from "../../utility/Id";
import { ID } from "@core/constant/common/id";
import { USER_TYPE } from "@core/constant/user/userType";

/*
 * Old
 */
export type UserEntity = {
  id: PublicId;
  name: string; // required
  email: string; // required
  authorization: Authorization;
};

/**
 * @entity User
 * @description 사용자입니다. 어드민(Xction 멤버)와 일반 유저를 모두 포함합니다.
 */
export const User = z.object({
  id: ID.USER,
  type: USER_TYPE,
  email: z.string().email(),
  name: z.string().min(1).max(30),
  thumbnailImage: z.string().nullable(),
  backgroundImage: z.string().nullable(),
  bio: z.string().nullable(),
});
export type User = z.infer<typeof User>;
