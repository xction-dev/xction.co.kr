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

  const update = useCallback(() => {
    set(from);
  }, [policy.key]);

  const refresh = useCallback(() => {
    set(get.from);
  }, [policy.key]);

  if (get.status === "PENDING") throw get.pending;
  if (get.status === "REJECTED") throw get.error;

  return {
    status: get.status,
    view: get.value,
    update,
    refresh,
    isUpdating: get.status === "UPDATING",
    isRefreshing: get.status === "UPDATING" && get.isInvalid,
    isProceeding: get.status === "UPDATING" && !get.isInvalid,
  };
};
