import { VPMe } from "./user/view/me";
import { VPUser } from "./user/view/user";

export const viewPolicy = {
  user: {
    me: VPMe,
    user: VPUser,
  },
};
