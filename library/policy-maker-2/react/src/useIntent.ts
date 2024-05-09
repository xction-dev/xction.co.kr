import { useCallback } from "react";
import { useSyncStore } from "./useStore";
import { Validator, useInput } from "./useInput";
import { IntentPolicy, store } from "@policy-maker-2/core";

type IntentMeta = {
  isWorking: boolean;
  error: unknown;
};

export const useSendIntent = <Input, Output>({
  policy,
  to,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
}) => {
  const [get, set] = useSyncStore<IntentMeta>(policy.key + "_send", {
    isWorking: false,
    error: null,
  });
  const send = useCallback(
    async (input: Input) => {
      try {
        if (get.value?.isWorking) throw new Error("Already working");
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

  return { ...get.value, send, validator: policy.model.input };
};

export const useSubmitIntent = <Input extends Record<string, unknown>, Output>({
  policy,
  to,
  initialValue,
  compareDiff,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
  initialValue: Required<{ [key in keyof Input]: NonNullable<Input[key]> }>;
  compareDiff?: boolean;
}) => {
  const { send, validator, isWorking } = useSendIntent({ policy, to });
  const { inputValues, values, isValid, set, reset } = useInput(
    policy.key,
    validator as unknown as Validator<Input>,
    initialValue,
    compareDiff,
  );
  return {
    values,
    inputValues,
    validator,
    isValid,
    isWorking,
    set,
    reset,
    submit: () => send(inputValues as Input),
  };
};
