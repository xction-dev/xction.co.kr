import { z } from "zod";
import { User } from ".";

/**
 * @entity User Summary
 * @description 사용자의 요약 정보입니다.
 */
export const UserSummary = User.pick({
  id: true,
  name: true,
  thumbnailImage: true,
});
export type UserSummary = z.infer<typeof UserSummary>;
