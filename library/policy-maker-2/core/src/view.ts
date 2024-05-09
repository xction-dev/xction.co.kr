import { ZodType, TypeOf } from "zod";
import { hashFn } from "./util";
import { StoreConfig } from "./store";

export const ViewPolicy =
  <Args extends unknown[], Model extends ZodType>(
    init: (...args: Args) => {
      key: Record<string, unknown>;
      model: Model;
      config?: Partial<StoreConfig>;
    },
  ) =>
  (...args: Args): ViewPolicy<TypeOf<Model>> => {
    const { key, model, config } = init(...args);
    const hashedKey = hashFn(key);
    const predicate = hashedKey;
    return {
      key: hashedKey,
      model,
      config,
      set: (fn: (prev?: TypeOf<Model>) => TypeOf<Model> | void) => ({
        type: "SET" as const,
        predicate,
        fn,
      }),
      invalidate: () => ({
        type: "INVALIDATE" as const,
        predicate,
      }),
      reset: () => ({
        type: "RESET" as const,
        predicate,
      }),
    };
  };

export type ViewPolicy<T> = {
  key: string;
  model: ZodType<T>;
  config?: Partial<StoreConfig>;
  set: (fn: (prev?: T) => T | void) => {
    type: "SET";
    predicate: string;
    fn: (prev?: T) => T | void;
  };
  invalidate: () => { type: "INVALIDATE"; predicate: string };
  reset: () => { type: "RESET"; predicate: string };
};
