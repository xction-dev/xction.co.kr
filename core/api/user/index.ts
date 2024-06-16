import { createApi, createAuthApi } from "..";
import { z } from "zod";
import { UserDto } from "./dto";

const getMe = createAuthApi({
  method: "get",
  params: {},
  endpoint: () => [`/users`, `/me`],
  dto: UserDto.parse,
  map: (dto) => ({ ...dto, type: dto.userType }),
});

const getUserById = createApi({
  method: "get",
  params: { userId: "number" },
  endpoint: ({ userId }) => [`/users`, `/${userId}`],
  dto: UserDto.parse,
});

const postSignIn = createApi({
  method: "post",
  params: {},
  endpoint: () => [`/users`, `/signIn`],
  dto: UserDto.extend({ token: z.string() }).parse,
  body: z.object({ email: z.string(), password: z.string() }).parse,
});

export const UserApi = {
  // get
  getMe,
  getUserById,

  // post
  postSignIn,
};
