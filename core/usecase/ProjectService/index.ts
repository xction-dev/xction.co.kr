import { BasicProjectDto, CreateProjectDto, UpdateProjectDto } from "@core/dto/ProjectService";

export type ProjectService = {
  createProject: (projectData: CreateProjectDto) => Promise<BasicProjectDto>;
  getProject: (projectId: string) => Promise<BasicProjectDto>;
  updateProject: (projectId: string, projectData: UpdateProjectDto) => Promise<BasicProjectDto>;
  deleteProject: (projectId: string) => Promise<void>;
  searchProjects: (searchQuery: string) => Promise<BasicProjectDto[]>;
};
