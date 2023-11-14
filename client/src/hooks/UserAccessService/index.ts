import { useMemo } from "react";
import {
  postUserLogin,
  postUserAutoLogin,
  postUserLogout,
  postUserRegister,
} from "@/api/UserAccessService";
import {
  PostUserLoginRequestDto,
  PostUserLoginResponseDto,
  PostUserRegisterRequestDto,
  PostUserRegisterResponseDto,
} from "@core/dto/UserAccessService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const {
    status,
    data,
    mutateAsync: tryLogin,
  } = useMutation({
    mutationFn: postUserLogin,
  });

  // useMutation을 이용한 자동 로그인 시도.
  const { mutateAsync: tryAutoLogin } = useMutation({
    mutationFn: postUserAutoLogin,
  });

  // useMutation을 이용한 로그아웃 시도.
  const { mutateAsync: tryLogout } = useMutation({
    mutationFn: postUserLogout,
  });

  // useMutation을 이용한 회원가입 시도.
  const { mutateAsync: tryRegister } = useMutation({
    mutationFn: postUserRegister,
  });

  const parsedFetchResult = useMemo(() => {
    switch (status) {
      case "idle":
        return {
          status: "fetching",
          token: null,
        } as const;
      case "pending":
        return {
          status: "fetching",
          token: null,
        } as const;
      case "error":
        return {
          status: "not_authorized",
          token: null,
        } as const;
      case "success":
        return {
          status: "authorized",
          token: data.token,
        } as const;
    }
  }, [status, data]);

  return {
    tryLogin,
    tryAutoLogin,
    tryLogout,
    tryRegister,
    ...parsedFetchResult,
  };
};
