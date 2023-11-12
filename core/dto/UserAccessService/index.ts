import { Authorization } from "@core/entity/.shared/Authorization";

type Token = string;

/**
 * POST "user/login"
 */
export type PostUserLoginRequestDto = {
  authorization: Authorization;
  isAutoLoginAllowed: boolean;
};
export type PostUserLoginResponseDto = {
  success: true;
  isAutoLoginAllowed: boolean;
  token: Token;
};

/**
 * POST "user/login/auto"
 */
export type PostUserAutoLoginRequestDto = {
  token: Token;
};
export type PostUserAutoLoginResponseDto = {
  success: true;
  token: Token;
};

/**
 * POST "user/logout"
 * request body is empty
 */
export type PostUserLogoutResponseDto = {
  success: true;
};

/**
 * POST "user/register"
 */
export type PostUserRegisterRequestDto = {
  name: string;
  email: string;
  authorization: Authorization;
};
export type PostUserRegisterResponseDto = {
  success: true;
};
