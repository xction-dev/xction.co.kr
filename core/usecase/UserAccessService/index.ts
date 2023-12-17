import { BaseServerTransaction } from "@core/utility/AbstractType";
import { Token } from "@core/utility/Token";

export type UserAccessService<
  Login extends BaseServerTransaction,
  AutoLogin extends BaseServerTransaction,
  Refresh extends BaseServerTransaction,
  Logout extends BaseServerTransaction,
> = {
  login: (request: Login["Request"]) => Promise<Login["Response"]>;
  autoLogin: (request: AutoLogin["Request"]) => Promise<AutoLogin["Response"]>;
  refresh: (request: Refresh["Request"]) => Promise<Refresh["Response"]>;
  logout: (request: Logout["Request"]) => Promise<Logout["Response"]>;
  token: Token | null;
};
