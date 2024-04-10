import { ProjectEntity } from "@core/entity/project/index";

// 일단 정보는 전부 가져오는 것으로 했습니다.
export type GetProjectResponseDto = {
  id: ProjectEntity["id"];
  title: ProjectEntity["metadata"]["title"];
  description: ProjectEntity["metadata"]["description"];
  createdDate: ProjectEntity["metadata"]["createdDate"];
  creatorId: ProjectEntity["creator"]["id"];
};

// 요약
export type ProjectSummaryDto = {
  id: string;
  title: string;
  description: string;
};

// 검색 or 목록
export type ProjectListDto = {
  projects: ProjectSummaryDto[];
};

export type CreateProjectDto = {
  title: string;
  description: string;
  creatorId: string;
};

export type UpdateProjectDto = {
  id: string;
  title?: string;
  description?: string;
};

export type CreateProjectResponseDto = {
  id: string;
};

export type UpdateProjectResponseDto = {
  id: string;
};


