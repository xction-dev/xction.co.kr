import { z } from "zod";
import { User } from ".";

/**
 * @entity User Summary
 * @description 사용자의 요약 정보입니다.
 */
export const UserSumamry = User.pick({
  id: true,
  name: true,
  thumbnailImage: true,
});
export type UserSumamry = z.infer<typeof UserSumamry>;
