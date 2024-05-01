import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSampleProjectById, postSampleProjectById } from "@core/usecase/PlayProjectService";


export const useProjectService = (id: string) => {
  const queryClient = useQueryClient();

  const { data, error, status } = us eQuery(["project", id], () => getSampleProjectById(id), {
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });

  const { mutate } = useMutation(() => postSampleProjectById(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["project", id]);
    },
  });

  const project = useMemo(() => {
    switch (status) {
      case "pending":
        return { status: "fetching", project: null, error: null };
      case "error":
        return { status: "fail", project: null, error };
      case "success":
        return { status: "success", project: data, error: null };
    }
  }, [status, data, error]);

  const finishWatchingProject = () => mutate();

  return { ...project, finishWatchingProject };
};

/* For listing & searching

import { useQuery } from "@tanstack/react-query";
// listing, searching에 필요한 api, ex) getProjects, searchProjects
import { ProjectEntity } from "@core/entity/project";

export const useProjectListService = () => {
  const { data, error, status } = useQuery<ProjectEntity[], Error>("projects", getProjects);

  return { data, error, status };
};

export const useProjectSearchService = (query: string) => {
  const { data, error, status } = useQuery<ProjectEntity[], Error>(["search", query], () =>
    searchProjects(query)
  );

  return { data, error, status };
};


