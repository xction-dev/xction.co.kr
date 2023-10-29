import { getSampleMe, postSampleLogin } from "@/api/SampleUserService";
import {
  PostSampleLoginDto,
  SampleUserDto,
} from "@/types/dto/SampleUserService";
import { SampleUserService } from "@/types/usecase/SampleUserService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * SampleUserService 유즈케이스를 위한 구현체입니다.
 */

export const useSampleUserService = (): SampleUserService<
  SampleUserDto, // 의미에 맞는 적절한 DTO를
  PostSampleLoginDto // Generic으로 주입해줍니다.
> => {
  // query를 관리하는 객체
  const queryClient = useQueryClient();

  // 내 정보 가져오기
  const { data, error, isLoading } = useQuery({
    queryKey: ["user", "me"], // 에러는 react-query 버전 문제인 것 같습니다. 추후에 해결할 예정
    queryFn: getSampleMe, // /api/SapmleUserService 에서 정의한 함수를 가져옵니다
    staleTime: 1000 * 60, // 1분에 한 번씩 로그인 확인
    gcTime: 1000 * 60 * 60, // 페이지 전환해도 1시간동안 로그인 유지
    retry: 0, // 실패시 바로 에러 처리
  });

  //로그인 시도하기
  const { mutate } = useMutation({
    mutationFn: postSampleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "me"]); // 로그인 성공 시 ["user", "me"] 쿼리를 새로고침해줍니다
    },
  });

  // tryLogin 메소드
  const tryLogin = (body: PostSampleLoginDto) => mutate(body);

  // me & status & error 값
  // react-query의 상태에 따라 계산합니다
  const fetchedData = data
    ? {
        status: "success" as const,
        me: data,
        error: null,
      }
    : isLoading
    ? {
        status: "loading" as const,
        me: null,
        error: null,
      }
    : {
        status: "fail" as const,
        error,
        me: null,
      };

  return { ...fetchedData, tryLogin }; // 유즈케이스의 타입과 동일한 객체를 반환합니다.
};
