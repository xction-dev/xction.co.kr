import { Authorization } from "@core/utility/Authorization";
import { z } from "zod";

const Token = z.string();
type Token = z.infer<typeof Token>;

/**
 * POST "user/login"
 * @description 사용자 로그인(일회용)을 요청합니다.
 */

/**
 * POST "user/login"
 * Request Body
 * @property ["authorization"] 소셜 로그인, 자체 로그인 등의 인증 방식을 지정합니다.
 */
export const PostUserLoginRequestDto = z.object({
  authorization: Authorization.PlainEmail,
});
export type PostUserLoginRequestDto = z.infer<typeof PostUserLoginRequestDto>;

/**
 * POST "user/login"
 * Response Body
 * @property ["token"] 요청이 성공했을 경우, 토큰을 반환합니다. access는 1일 동안 유효한 토큰입니다.
 */
export const PostUserLoginResponseDto = z.object({
  token: z.object({ access: Token }),
});
export type PostUserLoginResponseDto = z.infer<typeof PostUserLoginResponseDto>;

/**
 * POST "user/login/auto"
 * @description 사용자 자동 로그인을 요청합니다. 자동 로그인에 이용할 수 있는 refresh 토큰을 함께 제공합니다.
 */

/**
 * POST "user/login/auto"
 * Request Body
 * @property ["authorization"] 소셜 로그인, 자체 로그인 등의 인증 방식을 지정합니다.
 */
export const PostUserAutoLoginRequestDto = z.object({
  authorization: Authorization.PlainEmail,
});
export type PostUserAutoLoginRequestDto = z.infer<
  typeof PostUserAutoLoginRequestDto
>;

/**
 * POST "user/login/auto"
 * Response Body
 * @property ["token"] 요청이 성공했을 경우, 토큰을 반환합니다. access는 1일 동안 유효한 토큰, refresh는 30일 동안 유효한 토큰으로 access 토큰의 재발급에 이용됩니다.
 */
export const PostUserAutoLoginResponseDto = z.object({
  token: z.object({ access: Token, refresh: Token }),
});
export type PostUserAutoLoginResponseDto = z.infer<
  typeof PostUserAutoLoginResponseDto
>;

/**
 * POST "user/refresh"
 * 자동 로그인 때 발급받은 refresh 토큰을 이용해 access 토큰을 재발급합니다.
 */

/**
 * POST "user/refresh"
 * Request Body
 * @property ["refresh"] access 토큰의 재발급을 위한 refresh 토큰입니다.
 */
export const PostUserRefreshRequestDto = z.object({
  refresh: Token,
});
export type PostUserRefreshRequestDto = z.infer<
  typeof PostUserRefreshRequestDto
>;

/**
 * POST "user/refresh"
 * Response Body
 * @property ["token"] 요청이 성공했을 경우, 토큰을 반환합니다. access는 1일 동안 유효한 토큰입니다.
 */
export const PostUserRefreshResponseDto = z.object({
  access: Token,
});
export type PostUserRefreshResponseDto = z.infer<
  typeof PostUserRefreshResponseDto
>;

/**
 * POST "user/logout"
 * @description 사용자 로그아웃을 요청합니다.
 */

/**
 * POST "user/logout"
 * Request Body is empty
 */

/**
 * POST "user/logout"
 * Response Body
 * @property ["success"] 요청이 성공했는지 여부를 나타냅니다.
 */
export const PostUserLogoutResponseDto = z.object({
  success: z.literal(true),
});
export type PostUserLogoutResponseDto = z.infer<
  typeof PostUserLogoutResponseDto
>;

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
  token: Token;
};
