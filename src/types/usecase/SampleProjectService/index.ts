/**
 * ProjectData는 구현부에서 주입해 줄 추상화된 프로젝트의 타입입니다.
 */
export type SampleProjectService<ProjectData> = {
  /**
   * 영상 재생이 끝났을 때 호출하는 함수입니다. (영상이 끝나거나, 중간에 나갔을 때)
   * `/api/mock/project/:project_id/finish` 엔드포인트로 POST 요청을 보냅니다.
   */
  finishWathcingProject: (body: any) => void;
} & (
  | {
      status: "fetching";
      project: ProjectData | null;
      error: unknown | null;
    }
  | {
      status: "fail";
      project: null;
      error: unknown;
    }
  | {
      status: "success";
      project: ProjectData;
      error: null;
    }
);
