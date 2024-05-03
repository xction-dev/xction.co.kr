import { TypeOf, ZodType } from "zod";
import { PolicyKey } from "./common";

export type ViewModel = ZodType;

type ViewMapFn<Model extends ViewModel> = (
  prev: TypeOf<Model>,
) => TypeOf<Model>;
type ViewInvalidateInterface = {
  type: "invalidate";
  key: PolicyKey;
};
type ViewMapInterface = {
  type: "map";
  key: PolicyKey;
  mapFn: (prev: unknown) => unknown;
};
type ViewSetInterface = {
  type: "set";
  key: PolicyKey;
  data: unknown;
};
type ViewResetInterface = {
  type: "reset";
  key: PolicyKey;
};

export type ViewConnectionInterface =
  | ViewInvalidateInterface
  | ViewMapInterface
  | ViewResetInterface
  | ViewSetInterface;

type ViewPolicyParam<Deps extends unknown[], Model extends ViewModel> = (
  ...args: Deps
) => {
  key: PolicyKey;
  model: Model;
};

export type ViewPolicy<Deps extends unknown[], Model extends ViewModel> = (
  ...deps: Deps
) => {
  key: PolicyKey;
  model: Model;
  invalidate: () => ViewInvalidateInterface;
  map: (mapFn: ViewMapFn<Model>) => ViewMapInterface;
  set: (data: TypeOf<Model>) => ViewSetInterface;
  reset: () => ViewResetInterface;
};

export const VP =
  <Deps extends unknown[], Model extends ViewModel>(
    policy: ViewPolicyParam<Deps, Model>,
  ): ViewPolicy<Deps, Model> =>
  (...deps: Deps) => {
    const injected = policy(...deps);
    const invalidate = () =>
      ({ type: "invalidate", key: injected.key }) as const;
    const map = (mapFn: ViewMapFn<Model>) =>
      ({
        type: "map",
        key: injected.key,
        mapFn,
      }) as const;
    const set = (data: TypeOf<Model>) =>
      ({ type: "set", key: injected.key, data }) as const;
    const reset = () => ({ type: "reset", key: injected.key }) as const;
    return { ...injected, invalidate, map, set, reset };
  };

export type ImplementedViewPolicy<Model extends ViewModel> = ReturnType<
  ViewPolicy<unknown[], Model>
>;
