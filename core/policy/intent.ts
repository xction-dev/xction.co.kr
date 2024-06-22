import { IPLogin } from "./user/intent/login";

const intentPolicy = {
  user: {
    login: IPLogin,
  },
};

export default intentPolicy;
