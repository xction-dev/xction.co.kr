"use client";

import { GetMeService } from "@core/usecase/GetMeService";
import { GetMeResponseDto } from "@core/dto/GetMeService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/api/GetMeService";

type InjectedUsecase = GetMeService<GetMeResponseDto>;

export const useGetMeService = (): InjectedUsecase => {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 0,
  });

  const parsedFetchedResult = (): InjectedUsecase => {
    if (isLoading) {
      return {
        me: null,
        status: "pending",
        error: null,
      };
    }

    if (isError) {
      return {
        me: null,
        status: "error",
        error: error ?? "Unknown error",
      };
    }

    if (isSuccess) {
      return {
        me: data,
        status: "success",
        error: null,
      };
    }

    throw new Error("Invalid state: neither loading, error, nor success");
  };

  return parsedFetchedResult();
};
