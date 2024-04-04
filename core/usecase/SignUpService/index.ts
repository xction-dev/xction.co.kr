/**
 * 회원가입 서비스 유즈케이스입니다.
 * 회원가입을 시도하는 trySignUp 함수(intent)를 가지고 있습니다.
 */

export type SignUpService<SignUpRequestBody> = {
  trySignUp: (body: SignUpRequestBody) => void;
};
