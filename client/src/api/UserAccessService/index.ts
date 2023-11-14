/**
 * UserAccessService의 유즈케이스에서 사용할 fetch 함수를 정의합니다.
 * 유즈케이스를 실제로 구현한 hook이 너무 커지는 것을 방지하기 위해 분리해두었습니다.
 */

import {
  PostUserLoginRequestDto,
  PostUserLoginResponseDto,
  PostUserAutoLoginRequestDto,
  PostUserAutoLoginResponseDto,
  PostUserLogoutResponseDto,
} from "@core/dto/UserAccessService";

export const postUserLogin = (
  body: PostUserLoginRequestDto,
): Promise<PostUserLoginResponseDto> =>
  fetch(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));

export const postUserAutoLogin = (
  body: PostUserAutoLoginRequestDto,
): Promise<PostUserAutoLoginResponseDto> =>
  fetch(`/api/user/login/auto`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));

export const postUserLogout = (): Promise<PostUserLogoutResponseDto> =>
  fetch(`/api/user/logout`, {
    method: "POST",
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));
