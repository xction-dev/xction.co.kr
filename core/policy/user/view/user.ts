import { ID } from "@core/constant/common/id";
import { User } from "@core/entity/user";
import { ViewPolicy } from "@policy-maker/core";

export const VPUser = ViewPolicy((id: ID["USER"]) => ({
  key: ["user", { user: id }],
  model: User,
}));
