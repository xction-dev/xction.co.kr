/**
 * 유즈케이스를 위한 타입에는 Service라는 suffix를 붙여줍니다.
 * UserData라는 타입, LoginRequestBody라는 타입은 실체가 없는 제네릭 타입으로,
 * 실제 유즈케이스를 구현할 때에는 적절한 Dto로 주입해줄 것입니다.
 */
export type SampleUserService<UserData, LoginRequestBody> = {
  // 마치 함수의 매개변수처럼, UserData와 LoginRequestBody는 이후 구현 시에
  // 구체적인 타입으로 주입해줄 것입니다.
  tryLogin: (body: LoginRequestBody) => void;
} & (
  | { status: "fetching"; me: UserData | null; error: unknown | null }
  | { status: "fail"; error: unknown; me: null }
  | { status: "success"; me: UserData; error: null }
);
