import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SampleProjectService } from "@core/usecase/sample/SampleProjectService";
import {
  getSampleProjectById,
  postSampleProjectById,
} from "@/api/SampleProjectService";
import { GetSampleProjectResponseDto } from "@core/dto/sample/SampleProjectService";

type InjectedUsecase = SampleProjectService<GetSampleProjectResponseDto>; // 의미에 맞는 적절한 DTO를 Generic으로 주입해줍니다.

/**
 * SampleUserService 유즈케이스를 위한 구현체입니다.
 * 각 코드에 대한 설명을 자세히 달아놓았으니 참고하시기 바랍니다.
 */
export const useSampleProjectService = (id: string): InjectedUsecase => {
  // query를 관리하는 객체
  const queryClient = useQueryClient();

  // useQuery를 이용한 비디오 가져오기
  const { data, error, status } = useQuery({
    queryKey: ["project", id],
    queryFn: getSampleProjectById(id),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });

  // useMutation을 이용한 POST 시도
  const { mutate } = useMutation({
    mutationFn: postSampleProjectById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] }); // POST 성공 시 ["project", id] 쿼리를 새로고침해줍니다
    },
  });

  // useQuery의 결과값으로부터 status & me & error 값을 파싱합니다.
  // useMemo를 써 parsedFetchResult의 값에 영향을 주지 않는 리렌더링 시에는 캐싱된 값을 사용합니다.
  const parsedFetchResult = useMemo(() => {
    switch (status) {
      case "pending":
        return {
          status: "fetching", // usecase에서 요구한 대로 status를 바꿔주어야 합니다. 바꾼 결과는 타입
          project: data ?? null,
          error: error ?? null,
        } as const; // 이렇게 하면 타입스크립트에게 status가 string union 타입임을 알려줄 수 있습니다.
      case "error":
        return { status: "fail", project: null, error } as const;
      case "success":
        return { status: "success", project: data, error: null } as const;
    }
  }, [status, data, error]);

  return { ...parsedFetchResult, finishWatchingProject: mutate }; // 유즈케이스의 타입과 동일한 객체를 반환합니다.
};
