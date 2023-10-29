/**
 * 유즈케이스를 위한 타입에는 Service라는 suffix를 붙여줍니다.
 * UserData라는 타입, LoginRequestBody라는 타입은 실제 유즈케이스를 구현할 때 적절한 Dto로 주입해줄 것입니다.
 */
export type SampleUserService<UserData, LoginRequestBody> = {
  tryLogin: (body: LoginRequestBody) => void;
} & (
  | { status: "loading"; me: null; error: null }
  | { status: "fail"; error: unknown; me: null }
  | { status: "success"; me: UserData; error: null }
);
