import { IntentPolicy } from "@policy-maker-2/core";
import { InputConfig, Validator, useInput } from "./useInput";

export const useIntentInput = <
  Input extends Record<string, unknown>,
  PartialInput extends Partial<Input>,
>({
  policy,
  initialValue,
  config,
}: {
  policy: IntentPolicy<Input, any>;
  initialValue: (prev?: Partial<Input>) => {
    [key in keyof PartialInput]: NonNullable<PartialInput[key]>;
  };
  config?: Partial<InputConfig>;
}) => {
  const { values, isValid, set, reset } = useInput<Input, PartialInput>({
    key: policy.key,
    validator: policy.model.input as unknown as Validator<Input>,
    initialValue,
    config,
  });

  return { values: values, isValid, set, reset };
};
