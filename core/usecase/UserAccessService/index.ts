import { Authorization } from "@core/entity/.shared/Authorization";
import { UserEntity } from "@core/entity/user";

export type UserAccessService<
  LoginRequestInterface extends {
    authorization: Authorization;
    isAutoLoginAllowed: boolean;
  },
  LoginResponseInterface extends {
    success: boolean;
<<<<<<< Updated upstream
    token: string;
=======
>>>>>>> Stashed changes
  },
  RegisterRequestInterface extends {
    name: UserEntity["name"];
    email: UserEntity["email"];
    authorization: Authorization;
  },
  RegisterResponseInterface extends {
    success: boolean;
<<<<<<< Updated upstream
    token: string;
  },
> = {
=======
  },
> = {
  data:
    | {
        status: "fetching" | "fail";
        user: null;
      }
    | {
        status: "success";
        user: LoginResponseInterface;
      };
>>>>>>> Stashed changes
  tryLogin: (body: LoginRequestInterface) => Promise<LoginResponseInterface>;
  tryAutoLogin: () => Promise<LoginResponseInterface>;
  tryLogout: () => Promise<void>;
  tryRegister: (
    body: RegisterRequestInterface,
  ) => Promise<RegisterResponseInterface>;
<<<<<<< Updated upstream
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
=======
};
>>>>>>> Stashed changes
