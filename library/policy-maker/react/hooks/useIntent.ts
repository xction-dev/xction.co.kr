import { IntentModel, ImplementedIntentPolicy } from "@policy-maker/core";
import { TypeOf } from "zod";
import { InputConfig, InputState, useInput } from "./useInput";
import { useCallback, useMemo, useState } from "react";
import { hashKey, useQueryClient } from "@tanstack/react-query";

type IntentConfig = Partial<{
  immediateReset: boolean;
}> &
  InputConfig;

type Param<Model extends IntentModel> = {
  policy: ImplementedIntentPolicy<Model>;
  repository: (
    input: TypeOf<Model["input"]>,
  ) => Promise<TypeOf<Model["output"]>>;
  initialData: Required<TypeOf<Model["input"]>>;
  config?: IntentConfig;
};

type Send<Model extends IntentModel> = (
  input: TypeOf<Model["input"]>,
) => Promise<TypeOf<Model["output"]>>;

type Input<Model extends IntentModel> = InputState<Model["input"]>;

type Submit<Model extends IntentModel> = () => Promise<TypeOf<Model["output"]>>;

type Return<Model extends IntentModel> = Input<Model> & {
  send: Send<Model>;
  submit: Submit<Model>;
  isWorking: boolean;
};

const defaultConfig: IntentConfig = {};

export const useIntent = <Model extends IntentModel>({
  policy,
  repository,
  initialData,
  config: inputConfig,
}: Param<Model>): Return<Model> => {
  const hashedKey = hashKey(policy.key);
  const config = useMemo(
    () => ({ ...defaultConfig, ...inputConfig }),
    [inputConfig?.compareDiff, inputConfig?.immediateReset],
  );
  const queryClient = useQueryClient();
  const [isWorking, setIsWorking] = useState(false);
  const inputs = useInput<Model["input"]>(
    policy.model.input,
    initialData,
    config,
  );

  const send: Send<Model> = useCallback(
    (input) => {
      if (isWorking) return Promise.reject();
      setIsWorking(true);
      return repository(input)
        .then((output) => {
          policy.connect({ input, output }).forEach((connection) => {
            if (!connection) return;
            if (connection.type === "invalidate")
              queryClient.invalidateQueries({ queryKey: connection.key });
            if (connection.type === "map")
              queryClient.setQueriesData(
                { queryKey: connection.key },
                (prev: unknown) => {
                  if (!prev) return prev;
                  return connection.mapFn(prev);
                },
              );
            if (connection.type === "set")
              queryClient.setQueriesData(
                { queryKey: connection.key },
                connection.data,
              );
            if (connection.type === "reset")
              queryClient.resetQueries({ queryKey: connection.key });
          });
          setIsWorking(false);
          return output;
        })
        .catch((e) => {
          setIsWorking(false);
          return Promise.reject(e);
        });
    },
    [hashedKey],
  );

  const submit: Submit<Model> = useCallback(() => {
    if (!inputs.isValid || isWorking) return Promise.reject();
    setIsWorking(true);
    const cachedInput = { ...inputs.inputValues };
    if (config.immediateReset) inputs.reset();
    return repository(cachedInput)
      .then((output) => {
        policy
          .connect({ input: inputs.inputValues, output })
          .forEach((connection) => {
            if (!connection) return;
            if (connection.type === "invalidate")
              queryClient.invalidateQueries({ queryKey: connection.key });
            if (connection.type === "map")
              queryClient.setQueriesData(
                { queryKey: connection.key },
                (prev: unknown) => {
                  if (!prev) return prev;
                  return connection.mapFn(prev);
                },
              );
            if (connection.type === "set")
              queryClient.setQueriesData(
                { queryKey: connection.key },
                connection.data,
              );
            if (connection.type === "reset")
              queryClient.resetQueries({ queryKey: connection.key });
          });
        setIsWorking(false);
        if (!config.immediateReset) inputs.reset();
        return output;
      })
      .catch((e) => {
        setIsWorking(false);
        return Promise.reject(e);
      });
  }, [hashedKey]);
  return { ...inputs, send, submit, isWorking };
};
