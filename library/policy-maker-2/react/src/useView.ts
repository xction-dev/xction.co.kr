import { ViewPolicy } from "@policy-maker-2/core";
import { useCallback } from "react";
import { useStore } from "./useStore";

export const useView = <T>({
  policy,
  from,
}: {
  policy: ViewPolicy<T>;
  from: (prev?: T) => T | Promise<T>;
}) => {
  const [get, set] = useStore<T>(policy.key, from, policy.config);

  const refresh = useCallback(() => {
    set(from);
  }, [policy.key, from]);

  const reset = useCallback(() => {
    set(get.init);
  }, [policy.key]);

  if (get.status === "PENDING") throw get.promise;
  if (get.status === "REJECTED") throw get.error;

  return {
    status: get.status,
    view: get.value,
    refresh,
    reset,
    isRefreshing: get.status === "REFRESHING",
  };
};
