import { IntentModel, ImplementedIntentPolicy } from "@policy-maker/core";
import { TypeOf } from "zod";
import { useCallback, useState } from "react";
import { hashKey, useQueryClient } from "@tanstack/react-query";

// type IntentSimpleConfig = Partial<{}>;

type Param<Model extends IntentModel> = {
  policy: ImplementedIntentPolicy<Model>;
  repository: (
    input: TypeOf<Model["input"]>,
  ) => Promise<TypeOf<Model["output"]>>;
  // config?: IntentSimpleConfig;
};

type Send<Model extends IntentModel> = (
  input: TypeOf<Model["input"]>,
) => Promise<TypeOf<Model["output"]>>;

type Return<Model extends IntentModel> = {
  send: Send<Model>;
  isWorking: boolean;
};

// const defaultConfig: IntentSimpleConfig = {};

export const useSimpleIntent = <Model extends IntentModel>({
  policy,
  repository,
  // config,
}: Param<Model>): Return<Model> => {
  // const mergedConfig = { ...defaultConfig, ...config };
  const hashedKey = hashKey(policy.key);
  const queryClient = useQueryClient();
  const [isWorking, setIsWorking] = useState(false);

  const send: Send<Model> = useCallback(
    (input) => {
      if (isWorking) return Promise.reject();
      setIsWorking(true);
      return repository(input)
        .then((output) => {
          policy.connect({ input, output }).forEach((connection) => {
            console.log(connection);
            if (!connection) return;
            if (connection.type === "invalidate")
              queryClient.invalidateQueries({ queryKey: connection.key });
            if (connection.type === "map") {
              queryClient.setQueriesData(
                { queryKey: connection.key },
                (prev: unknown) => {
                  if (!prev) return prev;
                  return connection.mapFn(prev);
                },
              );
            }
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

  return { send, isWorking };
};
