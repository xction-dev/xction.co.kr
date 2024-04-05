/**
 * 내 정보를 조회하는 유즈케이스입니다.
 * intent 없이 view로만 구성됩니다.
 */

export type GetMeService<MeInfo> =
  | {
      me: MeInfo | null;
      status: "pending";
      error: unknown | null;
    }
  | {
      me: null;
      status: "error";
      error: unknown;
    }
  | {
      me: MeInfo;
      status: "success";
      error: null;
    };
