import { IntentPolicy } from "@policy-maker-2/core";
import { useIntent } from "./useIntent";
import { useSyncStore } from "./useStore";
import { useCallback, useMemo } from "react";

type SubmitConfig = {
  resetImmediate?: boolean;
};
const defaultSubmitConfig: SubmitConfig = {
  resetImmediate: false,
};

export const useIntentSubmit = <Input extends Record<string, unknown>, Output>({
  policy,
  to,
  config: inputConfig,
}: {
  policy: IntentPolicy<Input, Output>;
  to: (input: Input) => Promise<Output>;
  config?: SubmitConfig;
}) => {
  const config = useMemo(
    () => ({ ...defaultSubmitConfig, ...inputConfig }),
    [inputConfig],
  );
  const { send, validator, isWorking } = useIntent({ policy, to });
  const [get, set] = useSyncStore<Partial<Input>>(policy.key + "_input", {});

  const isValid = useMemo(
    () => validator.safeParse(get.value).success,
    [policy.key, get.value],
  );

  const reset = useCallback(() => set(() => ({})), [policy.key]);

  const submit = useCallback(async () => {
    try {
      const submitValue = { ...get.value };
      if (config.resetImmediate) reset();
      const parsed = policy.model.input.parse(submitValue);
      const output = await send(parsed);
      if (!config.resetImmediate) reset();
      return output;
    } catch (e) {
      return Promise.reject(e);
    }
  }, [policy.key, get.value]);

  return { validator, isValid, isWorking, submit };
};
