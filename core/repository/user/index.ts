import { api } from "@core/api";
import { ID } from "@core/constant/common/id";
import { User } from "@core/entity/user";

const getUser = (id: ID["USER"]) => api.get(`/users/${id}`).then(User.parse);

export const UserRepository = {
  getUser,
};
