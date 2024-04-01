/**
 * 로그인 서비스 유즈케이스입니다.
 * 로그인을 시도하는 tryLogin 함수를 가지고 있습니다.
 */
export type LogInService<LoginRequestBody> = {
  tryLogin: (body: LoginRequestBody) => void;
};
