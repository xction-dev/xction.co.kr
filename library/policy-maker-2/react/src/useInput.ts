import { useCallback, useEffect, useMemo } from "react";
import { ZodObject, ZodType, z } from "zod";
import { useSyncStore } from "./useStore";

/*
 * Config
 */
export type InputConfig = { compareDiff: boolean; useInitialValue: boolean };
const defaultInputConfig: InputConfig = {
  compareDiff: false,
  useInitialValue: false,
};

/*
 * Validation
 */
export type Inputable = Record<string, any>;
type ValidatedValue<T> =
  | { isValid: true; value: T; error: null }
  | { isValid: false; value: T; error: unknown };
export type Validator<T extends Required<Inputable>> = ZodObject<{
  [key in keyof T]: ZodType<T[key]>;
}>;

/*
 * Hook Types
 */
type Param<Whole extends Inputable, Part extends Partial<Whole>> = {
  key: string;
  validator: Validator<Whole>;
  initialValue: (prev?: Partial<Whole>) => {
    [key in keyof Part]: NonNullable<Part[key]>;
  };
  config?: Partial<InputConfig>;
};

type Return<T extends Inputable> = {
  values: {
    [key in keyof Required<T>]: ValidatedValue<NonNullable<Required<T>[key]>>;
  };
  inputValues: Partial<T>;
  isValid: boolean;
  set: (setter: Partial<T> | ((prev?: Partial<T>) => Partial<T>)) => void;
  reset: () => void;
};

/*
 * Util
 */
const getDiff = <T extends Inputable>(
  original: T,
  target: Partial<T>,
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (original[key] === target[key]) return acc;
    return { ...acc, [key]: target[key] };
  }, {} as Partial<T>);
};

/*
 * Hook
 */
export const useInput = <Whole extends Inputable, T extends Partial<Whole>>({
  key,
  validator,
  initialValue,
  config: inputConfig,
}: Param<Whole, T>): Return<T> => {
  const config = useMemo(
    () => ({ ...defaultInputConfig, ...inputConfig }),
    [key],
  );
  const [store, setStoreValue] = useSyncStore<Partial<T>>(key + "_input", {});

  const merged: { [key in keyof T]: T[key] } = useMemo(
    () =>
      store.status === "PENDING"
        ? initialValue()
        : { ...initialValue(store.value), ...store.value },
    [key, store.value],
  );
  const values: Return<T>["values"] = useMemo(() => {
    return Object.keys(merged).reduce(
      (acc, key) => {
        const value = merged[key];
        const result = validator.shape[key].safeParse(value);
        if (result.success)
          return { ...acc, [key]: { value, isValid: true, error: undefined } };
        return {
          ...acc,
          [key]: { value, isValid: false, error: result.error },
        };
      },
      {} as Return<T>["values"],
    );
  }, [key, merged]);
  const isValid = useMemo(() => {
    if (z.object({}).strict().safeParse(store.value).success) return false;
    return validator.safeParse(store.value).success;
  }, [store.value]);

  const inputValues = useMemo(() => {
    if (store.status === "PENDING" || store.status === "REJECTED")
      return {} as Partial<T>;
    return store.value;
  }, [key, store.status, store.value]);

  const set: Return<T>["set"] = useCallback(
    (setter) => {
      setStoreValue((prev) => {
        const value =
          typeof setter === "function"
            ? { ...prev, ...setter(prev) }
            : { ...prev, ...setter };
        return config.compareDiff ? getDiff(initialValue, value) : value;
      });
    },
    [key, setStoreValue],
  );
  const reset = useCallback(
    () => setStoreValue(() => initialValue()),
    [key, setStoreValue],
  );

  useEffect(() => {
    if (config.useInitialValue) set(initialValue);
  }, [key]);

  return { values, inputValues, isValid, set, reset };
};
