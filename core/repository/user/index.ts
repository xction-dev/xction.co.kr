import { api, authApi } from "@core/api";
import { ID } from "@core/constant/common/id";
import { PostLoginBody } from "@core/dto/user/request";
import { User } from "@core/entity/user";
import { z } from "zod";

const getMe = () => authApi.get("/users/me").then(User.parse);

const getUser = (id: ID["USER"]) => api.get(`/users/${id}`).then(User.parse);

const postLogin = (body: PostLoginBody) =>
  api.post("/users/login", body).then(z.object({ token: z.string() }).parse);

export const UserRepository = {
  getMe,
  getUser,
  postLogin,
};
