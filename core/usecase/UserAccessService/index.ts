import { BaseServerTransaction } from "@core/utility/AbstractType";

export type UserAccessService<
  Interface extends {
    Login: BaseServerTransaction;
    AutoLogin: BaseServerTransaction;
    Refresh: BaseServerTransaction;
    Logout: BaseServerTransaction;
  },
> = {
  login: (
    request: Interface["Login"]["Request"],
  ) => Promise<Interface["Login"]["Response"]>;
  autoLogin: (
    request: Interface["AutoLogin"]["Request"],
  ) => Promise<Interface["AutoLogin"]["Response"]>;
  refresh: (
    request: Interface["Refresh"]["Request"],
  ) => Promise<Interface["Refresh"]["Response"]>;
  logout: (
    request: Interface["Logout"]["Request"],
  ) => Promise<Interface["Logout"]["Response"]>;
  token: Interface["Login"]["Response"] | Interface["AutoLogin"] | null;
};
