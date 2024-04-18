import { PolicyKey } from "@policy-maker/core";
import { useQueryClient } from "@tanstack/react-query";
import { ZodType } from "zod";
import { useCallback } from "react";
import { Wrapped, wrap } from "../function/wrap";

export const useStore = <Model extends ZodType>(
  key: PolicyKey,
  model: Model,
) => {
  const queryClient = useQueryClient();

  const get = useCallback(() => {
    const data = queryClient.getQueryData(key);
    const result = Wrapped(model).safeParse(data);
    return result.success ? result.data.data : undefined;
  }, []);

  const set = <T>(setter: (prev?: T) => T) => {
    queryClient.setQueryData(key, (prev: unknown) => {
      if (!prev) return wrap(setter(), model);
      const data = Wrapped(model).safeParse(prev);
      if (data.success) return wrap(setter(data.data.data), model);
      return wrap(setter(), model);
    });
  };
  return { get, set };
};
