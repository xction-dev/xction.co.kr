import { Authorization } from "@core/entity/.shared/Authorization";

export type UserAccessService<
  LoginRequestInterface extends {
    authorization: Authorization;
    isAutoLoginAllowed: boolean;
  },
  LoginResponseInterface extends {
    success: boolean;
  },
  RegisterRequestInterface extends {
    Authorization: Authorization;
  },
  RegisterResponseInterface extends {
    success: boolean;
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
  tryLogin: (body: LoginRequestInterface) => Promise<LoginResponseInterface>;
  tryAutoLogin: () => Promise<LoginResponseInterface>;
  tryLogout: () => Promise<void>;
  tryRegister: (
    body: RegisterRequestInterface,
  ) => Promise<RegisterResponseInterface>;
};
