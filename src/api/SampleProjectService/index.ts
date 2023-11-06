import { GetSampleProjectResponseDto } from "@/types/dto/SampleProjectService";

/**
 * SampleProjectService의 유즈케이스에서 사용할 fetch 함수를 정의합니다.
 * 유즈케이스를 실제로 구현한 hook이 너무 커지는 것을 방지하기 위해 분리해두었습니다.
 */

/**
 *
 */
export const getSampleProjectById =
  (id: string) => (): Promise<GetSampleProjectResponseDto> =>
    fetch(`/api/mock/project/${id}`).then((res) =>
      res.ok ? res.json() : Promise.reject(res),
    );

export const postSampleProjectById =
  (id: string) => (): Promise<GetSampleProjectResponseDto> =>
    fetch(`/api/mock/project/${id}/finish`, {
      method: "POST",
    }).then(async (res) => (res.ok ? res.json() : Promise.reject(res)));
