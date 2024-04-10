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
