import { useMemo } from "react";
import { getSampleMe, postSampleLogin } from "@/api/SampleUserService";
import {
  PostSampleLoginRequestDto,
  GetSampleMeResponseDto,
} from "@core/dto/sample/SampleUserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SampleUserService } from "@core/usecase/sample/SampleUserService";

type InjectedUsecase = SampleUserService<
  GetSampleMeResponseDto,
  PostSampleLoginRequestDto
>; // 의미에 맞는 적절한 DTO를 Generic으로 주입해줍니다.

/**
 * SampleUserService 유즈케이스를 위한 구현체입니다.
 * 각 코드에 대한 설명을 자세히 달아놓았으니 참고하시기 바랍니다.
 */
export const useSampleUserService = (): InjectedUsecase => {
  // query를 관리하는 객체
  const queryClient = useQueryClient();

  // useQuery를 이용한 내 정보 가져오기
  const { data, error, status } = useQuery({
    queryKey: ["user", "me"], // 에러는 react-query 버전 문제인 것 같습니다. 추후에 해결할 예정
    queryFn: getSampleMe, // /api/SapmleUserService 에서 정의한 함수를 가져옵니다
    staleTime: 1000 * 60, // 1분에 한 번씩 로그인 확인
    gcTime: 1000 * 60 * 60, // 페이지 전환해도 1시간동안 로그인 유지
    retry: 0, // 실패시 바로 에러 처리
  });

  // useMutation을 이용한 로그인 시도
  const { mutate } = useMutation({
    mutationFn: postSampleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "me"] }); // 로그인 성공 시 ["user", "me"] 쿼리를 새로고침해줍니다
    },
  });

  // useQuery의 결과값으로부터 status & me & error 값을 파싱합니다.
  // useMemo를 써 parsedFetchResult의 값에 영향을 주지 않는 리렌더링 시에는 캐싱된 값을 사용합니다.
  const parsedFetchResult = useMemo(() => {
    switch (status) {
      case "pending":
        return {
          status: "fetching", // usecase에서 요구한 대로 status를 바꿔주어야 합니다. 바꾼 결과는 타입
          me: data ?? null,
          error: error ?? null,
        } as const; // 이렇게 하면 타입스크립트에게 status가 string union 타입임을 알려줄 수 있습니다.
      case "error":
        return { status: "fail", me: null, error } as const;
      case "success":
        return { status: "success", me: data, error: null } as const;
    }
  }, [status, data, error]);

  return { ...parsedFetchResult, tryLogin: mutate }; // 유즈케이스의 타입과 동일한 객체를 반환합니다.
};
