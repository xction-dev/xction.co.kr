import { ViewModel, ImplementedViewPolicy } from "@policy-maker/core";
import { hashKey, useSuspenseQuery } from "@tanstack/react-query";
import { TypeOf } from "zod";
import { useStore } from "../store/useStore";
import { useCallback, useEffect, useState } from "react";

export type ViewConfig = {
  staleTime?: number;
  gcTime?: number;
  retry?: number;
};
type ContinueFetch<T> = (fn: (prev: T) => Promise<T>) => Promise<void>;

const defaultViewConfig: ViewConfig = {
  staleTime: Infinity,
  gcTime: 60 * 1000,
  retry: 0,
};

type Param<Model extends ViewModel> = {
  policy: ImplementedViewPolicy<Model>;
  repository: () => Promise<TypeOf<Model>>;
  initialData?: TypeOf<Model>;
  config?: ViewConfig;
};
type Return<Data> = {
  data: Data;
  isFetching: boolean;
  isRefetching: boolean;
  isContinueFetching: boolean;
  continueFetch: ContinueFetch<Data>;
  error: unknown;
};

export const useView = <Model extends ViewModel>({
  policy,
  repository,
  initialData,
  config,
}: Param<Model>): Return<TypeOf<Model>> => {
  const hashedKey = hashKey(policy.key);
  const [isContinueFetching, setIsContinueFetching] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { get, set } = useStore<Model>(policy.key, policy.model);
  const { data, isFetching: isRefetching } = useSuspenseQuery({
    queryKey: policy.key,
    queryFn: repository,
    initialData,
    ...defaultViewConfig,
    ...config,
  });
  const continueFetch: ContinueFetch<TypeOf<Model>> = useCallback(
    async (fn) => {
      try {
        setIsContinueFetching(true);
        const prev = get();
        const fetched = await (prev ? fn(prev) : repository());
        setIsContinueFetching(false);
        set(() => fetched);
        setError(null);
      } catch (e) {
        setIsContinueFetching(false);
        setError(e);
        throw e;
      }
    },
    [hashedKey],
  );

  useEffect(() => {
    setError(null);
  }, [hashedKey]);

  return {
    data,
    isFetching: isContinueFetching || isRefetching,
    isRefetching,
    isContinueFetching,
    continueFetch,
    error,
  };
};

export const useViewState = useView;
