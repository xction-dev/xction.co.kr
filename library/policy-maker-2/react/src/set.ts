import { ViewPolicy, store } from "@policy-maker-2/core";

export const setViewValue = <T>(policy: ViewPolicy<T>, data: T) =>
  Promise.resolve(
    store.initSync(policy.key, () => data, { staleTime: Infinity, gcTime: 0 }),
  );
