import { Authorization } from "@core/entity/.shared/Authorization";
import { UserEntity } from "@core/entity/user";

export type UserAccessService<
  LoginRequestInterface extends {
    authorization: Authorization;
    isAutoLoginAllowed: boolean;
  },
  LoginResponseInterface extends {
    success: boolean;
    token: string;
  },
  RegisterRequestInterface extends {
    name: UserEntity["name"];
    email: UserEntity["email"];
    authorization: Authorization;
  },
  RegisterResponseInterface extends {
    success: boolean;
    token: string;
  },
> = {
  tryLogin: (body: LoginRequestInterface) => Promise<LoginResponseInterface>;
  tryAutoLogin: () => Promise<LoginResponseInterface>;
  tryLogout: () => Promise<void>;
  tryRegister: (
    body: RegisterRequestInterface,
  ) => Promise<RegisterResponseInterface>;
} & (
  | {
      status: "fetching" | "not_authorized";
      token: null;
    }
  | {
      status: "authorized";
      token: string;
    }
);
