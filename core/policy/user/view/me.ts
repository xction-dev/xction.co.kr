import { User } from "@core/entity/user";
import { ViewPolicy } from "@policy-maker/core";

export const VPMe = ViewPolicy(() => ({
  key: ["me"],
  model: User,
}));
