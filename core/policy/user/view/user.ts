import { ID } from "@core/constant/common/id";
import { User } from "@core/entity/user";
import { VP } from "@policy-maker/core";

/**
 * @viewPolicy User
 * @description 특정 유저의 상세 정보를 조회합니다
 */
export const VPUser = VP((userId: ID["USER"]) => ({
  key: [{ user: userId }],
  model: User,
}));
