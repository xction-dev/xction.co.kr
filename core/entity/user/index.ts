import { Authorization } from "../../utility/Authorization";
import { PublicId } from "../../utility/Id";

export type UserEntity = {
  id: PublicId;
  name: string; // required
  email: string; // required
  authorization: Authorization;
};
