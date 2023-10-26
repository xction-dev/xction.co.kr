export type UserEntity = {
  id: number;
  name: string;
  auth: Auth;
};

type Auth = {
  type: "default";
  username: string;
  password: string;
};
