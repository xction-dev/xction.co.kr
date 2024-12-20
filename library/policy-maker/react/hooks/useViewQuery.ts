import { ViewModel, ImplementedViewPolicy } from "@policy-maker/core";
import { hashKey, useSuspenseQuery } from "@tanstack/react-query";
import { TypeOf } from "zod";
import { useStore } from "../store/useStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import equal from "fast-deep-equal";

export type ViewQueryConfig = {
  staleTime?: number;
  gcTime?: number;
  retry?: number;
  debounceTime?: number;
};
type ContinueFetchWithQuery<T, Query> = (
  fn: (prev: T, query: Query) => Promise<T>,
) => Promise<void>;

const defaultViewQueryConfig: Required<ViewQueryConfig> = {
  staleTime: Infinity,
  gcTime: 60 * 1000,
  retry: 0,
  debounceTime: 500,
};

type Param<Model extends ViewModel, Query extends Record<string, unknown>> = {
  policy: ImplementedViewPolicy<Model>;
  repository: (query: Query) => Promise<TypeOf<Model>>;
  initialQuery: Query;
  config?: ViewQueryConfig;
  injectedQuery?: Query;
};
type Return<Data, Query extends Record<string, unknown>> = {
  data: Data;
  query: Query;
  setQuery: (query: Partial<Query>) => void;
  isFetching: boolean;
  isRefetching: boolean;
  isContinueFetching: boolean;
  continueFetch: ContinueFetchWithQuery<Data, Query>;
  error: unknown;
};

export const useViewQuery = <
  Model extends ViewModel,
  Query extends Record<string, unknown>,
>({
  policy,
  repository,
  initialQuery,
  injectedQuery,
  config,
}: Param<Model, Query>): Return<TypeOf<Model>, Query> => {
  const hashedKey = hashKey(policy.key);
  const { debounceTime, ...reactQueryConfig } = {
    ...defaultViewQueryConfig,
    ...config,
  };
  const [isContinueFetching, setIsContinueFetching] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [queryState, setQueryState] = useState(initialQuery);
  const [debouncedQueryState] = useDebounce(queryState, debounceTime);
  const queriedKeys = [...policy.key, debouncedQueryState];
  const { get, set } = useStore<Model>(queriedKeys, policy.model);
  const { data, isFetching: isRefetching } = useSuspenseQuery({
    queryKey: queriedKeys,
    queryFn: () => repository(debouncedQueryState),
    ...reactQueryConfig,
  });

  const continueFetch: ContinueFetchWithQuery<
    TypeOf<Model>,
    Query
  > = useCallback(
    async (fn) => {
      try {
        setIsContinueFetching(true);
        const prev = get();
        const fetched = await (prev
          ? fn(prev, debouncedQueryState)
          : repository(debouncedQueryState));
        setIsContinueFetching(false);
        set(() => fetched);
        setError(null);
      } catch (e) {
        setIsContinueFetching(false);
        setError(e);
        throw e;
      }
    },
    [debouncedQueryState],
  );

  const setQuery = useCallback(
    (input: Partial<Query>) => setQueryState((prev) => ({ ...prev, ...input })),
    [hashedKey],
  );

  const isDebouncing = useMemo(
    () => !equal(queryState, debouncedQueryState),
    [hashedKey, queryState, debouncedQueryState],
  );

  useEffect(() => {
    if (!injectedQuery) return;
    if (!equal(injectedQuery, queryState)) setQueryState(injectedQuery);
  }, [injectedQuery]);

  useEffect(() => {
    setQueryState(initialQuery);
    setError(null);
  }, [hashedKey]);

  return {
    data,
    query: queryState,
    setQuery,
    isFetching: isContinueFetching || isRefetching || isDebouncing,
    isRefetching: isRefetching || isDebouncing,
    isContinueFetching,
    continueFetch,
    error,
  };
};
