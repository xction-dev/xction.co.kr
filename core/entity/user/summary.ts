import { ID } from "@core/constant/common/id";
import { USER_TEXT } from "@core/constant/user/text";
import { z } from "zod";

/**
 * @entity User Summary
 * @description 사용자의 요약 정보입니다.
 */
export const UserSummary = z.object({
  id: ID.USER,
  name: USER_TEXT.NAME,
  thumbnailImage: z.string().nullable(),
});
export type UserSummary = z.infer<typeof UserSummary>;

export const UnknownUserSummary: UserSummary = {
  id: -1,
  name: "알 수 없는 사용자",
  thumbnailImage: null,
};
