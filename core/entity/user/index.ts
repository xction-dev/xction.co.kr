import { Authorization } from "../.shared/Authorization";
import { PublicId } from "../.shared/Id";

export type UserEntity = {
  id: PublicId;
  name: string; // required
  email: string; // required
  authorization: Authorization;
};
