import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlayProjectService } from "@core/usecase/PlayProjectService";
import {
  getSampleProjectById,
  postSampleProjectById,
} from "@/api/SampleProjectService";
import { GetProjectResponseDto } from "@core/dto/ProjectService";

type InjectedUsecase = PlayProjectService;

export const useProjectService = (id: string): InjectedUsecase => {
  const queryClient = useQueryClient();

  const { data, error, status } = useQuery({
    queryKey: ["project", id],
    queryFn: getSampleProjectById(id),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });

  const { mutate } = useMutation({
    mutationFn: postSampleProjectById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });

  const parsedFetchResult = useMemo(() => {
    switch (status) {
      case "pending":
        return {
          status: "fetching",
          project: data ?? null,
          error: error ?? null,
        } as const;
      case "error":
        return { status: "fail", project: null, error } as const;
      case "success":
        return { status: "success", project: data, error: null } as const;
    }
  }, [status, data, error]);

  const finishWatchingProject = () => {
    mutate();
  };

  return { ...parsedFetchResult, finishWatchingProject };
};
