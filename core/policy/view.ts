import { VPMe } from "./user/view/me";
import { VPUser } from "./user/view/user";

const viewPolicy = {
  user: {
    me: VPMe,
    user: VPUser,
  },
};

export default viewPolicy;
