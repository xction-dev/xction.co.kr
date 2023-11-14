import { useMemo } from "react";
import {
  postUserLogin,
  postUserAutoLogin,
  postUserLogout,
} from "@/api/UserAccessService";
import {
  PostUserLoginRequestDto,
  PostUserLoginResponseDto,
  PostUserAutoLoginRequestDto,
  PostUserAutoLoginResponseDto,
  PostUserLogoutResponseDto,
  PostUserRegisterRequestDto,
  PostUserRegisterResponseDto,
} from "@core/dto/UserAccessService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAccessService } from "@core/usecase/UserAccessService";

type InjectedUsecase = UserAccessService<
  PostUserLoginRequestDto,
  PostUserLoginResponseDto,
  PostUserRegisterRequestDto,
  PostUserRegisterResponseDto
>; // 의미에 맞는 적절한 DTO를 Generic으로 주입해줍니다.

export const useUserAccessService = (): InjectedUsecase => {
  // query를 관리하는 객체
  const queryClient = useQueryClient();

  // useMutation을 이용한 로그인 시도. GET 요청이 없으니 invalidateQueries는 없어도 된다고 판단했습니다.
  const { mutateAsync: tryLogin } = useMutation({
    mutationFn: postUserLogin,
    onSuccess: (data) => {
      return data;
    },
  });

  // useMutation을 이용한 자동 로그인 시도. (보완 필요)
  const { mutateAsync: tryAutoLogin } = useMutation({
    mutationFn: postUserAutoLogin,
    onSuccess: (data) => {
      return data;
    },
  });

  // useMutation을 이용한 로그아웃 시도. (보완 필요)
  const { mutateAsync: tryLogout } = useMutation({
    mutationFn: postUserLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });

  return { data, tryLogin, tryAutoLogin, tryLogout, tryRegister };
};
