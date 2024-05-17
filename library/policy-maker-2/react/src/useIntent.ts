import { useCallback, useMemo } from "react";
import { useSyncStore } from "./useStore";
import { IntentPolicy, store } from "@policy-maker-2/core";

type IntentMeta = {
  isWorking: boolean;
  error: unknown;
};

export const useIntent = <Input, Output>({
  policy,
  to,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
}) => {
  const [get, set] = useSyncStore<IntentMeta>(policy.key, {
    isWorking: false,
    error: null,
  });
  const value = useMemo(() => {
    if (get.status === "PENDING" || get.status === "REJECTED")
      return { isWorking: true, error: null };
    return get.value;
  }, [get]);
  const send = useCallback(
    async (input: Input) => {
      try {
        if (get.status === "PENDING" || get.status === "REJECTED")
          throw new Error("Preparing");
        if (get.value.isWorking) throw new Error("Already working");
        set((prev) => ({ isWorking: true, error: prev?.error ?? null }));
        const raw = await to(policy.model.input.parse(input));
        const output = policy.model.output.parse(raw);
        policy.next({ input, output }).forEach(store.parseIntent);
        set(() => ({ isWorking: false, error: null }));
        return output;
      } catch (e) {
        set(() => ({ isWorking: false, error: e }));
        return Promise.reject(e);
      }
    },
    [policy.key],
  );

  return { ...value, send, validator: policy.model.input };
};
