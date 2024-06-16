import { USER_TYPE } from "@core/constant/user/userType";
import { User } from "@core/entity/user";

export const UserDto = User.omit({ type: true }).extend({
  userType: USER_TYPE,
});
