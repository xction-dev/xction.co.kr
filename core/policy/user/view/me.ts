import { User } from "@core/entity/user";
import { VP } from "@policy-maker/core";

/**
 * @viewPolicy Me
 * @description 내 정보를 조회합니다.
 */
export const VPMe = VP(() => ({
  key: ["me"],
  model: User,
}));
