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
  PostUserAutoLoginRequestDto,
  PostUserAutoLoginResponseDto,
  PostUserRefreshResponseDto,
  PostUserLogoutResponseDto,
} from "@core/dto/UserAccessService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAccessService } from "@core/usecase/UserAccessService";
import { PostUserRefreshRequestDto } from "../../../../core/dto/UserAccessService/index";

type InjectedUsecase = UserAccessService<{
  Login: {
    Request: PostUserLoginRequestDto;
    Response: PostUserLoginResponseDto;
  };
  AutoLogin: {
    Request: PostUserAutoLoginRequestDto;
    Response: PostUserAutoLoginResponseDto;
  };
  Refresh: {
    Request: PostUserRefreshRequestDto;
    Response: PostUserRefreshResponseDto;
  };
  Logout: {
    Request: never;
    Response: PostUserLogoutResponseDto;
  };
}> &
  (
    | {
        status: "fetching" | "not_authorized";
        token: null;
      }
    | {
        status: "authorized_once";
        token: PostUserLoginResponseDto["token"];
      }
    | {
        status: "authorized_auto";
        token: PostUserAutoLoginResponseDto["token"];
      }
  ); // 의미에 맞는 적절한 DTO를 Generic으로 주입해줍니다.

export const useUserAccessService = (): InjectedUsecase => {
  // query를 관리하는 객체
  const queryClient = useQueryClient();

  // useMutation을 이용한 로그인 시도. GET 요청이 없으니 invalidateQueries는 없어도 된다고 판단했습니다.
  const { data, mutateAsync: login } = useMutation({
    mutationKey: [""],
    mutationFn: postUserLogin,
  });

  // useMutation을 이용한 자동 로그인 시도.
  const { mutateAsync: autoLogin } = useMutation({
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
