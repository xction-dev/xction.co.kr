import {
  PostUserLoginRequestDto,
  PostUserLoginResponseDto,
  PostUserRegisterRequestDto,
  PostUserRegisterResponseDto,
} from "@core/dto/UserAccessService";

export const postUserLogin = (
  body: PostUserLoginRequestDto,
): Promise<PostUserLoginResponseDto> =>
  fetch(`/api/user/login`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));

export const postUserAutoLogin = (): Promise<PostUserLoginResponseDto> =>
  fetch(`/api/user/login/auto`, {
    method: "POST",
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));

export const postUserLogout = (): Promise<void> =>
  fetch(`/api/user/logout`, {
    method: "POST",
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));

export const postUserRegister = (
  body: PostUserRegisterRequestDto,
): Promise<PostUserRegisterResponseDto> =>
  fetch(`/api/user/register`, {
    method: "POST",
    body: JSON.stringify(body),
  }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));
