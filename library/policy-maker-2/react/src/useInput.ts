import { useMemo } from "react";
import { ZodObject, ZodType, z } from "zod";
import { useSyncStore } from "./useStore";

type Input = Record<string, any>;
type ValidatedValue<T> =
  | { isValid: true; value: T; error: null }
  | { isValid: false; value: T; error: unknown };

export type Validator<T extends Required<Input>> = ZodObject<{
  [key in keyof T]: ZodType<T[key]>;
}>;

type Return<T extends Input> = {
  values: {
    [key in keyof Required<T>]: ValidatedValue<NonNullable<Required<T>[key]>>;
  };
  inputValues: Partial<T>;
  isValid: boolean;
  set: (setter: ((prev: Partial<T>) => Partial<T>) | Partial<T>) => void;
  reset: () => void;
};

const getDiff = <T extends Input>(
  original: T,
  target: Partial<T>,
): Partial<T> => {
  return Object.keys(target).reduce((acc, key) => {
    if (original[key] === target[key]) return acc;
    return { ...acc, [key]: target[key] };
  }, {} as Partial<T>);
};

export const useInput = <T extends Input>(
  key: string,
  validator: Validator<T>,
  initialValue: Required<{ [key in keyof T]: NonNullable<T[key]> }>,
  compareDiff?: boolean,
): Return<T> => {
  const [{ value: inputValues }, setInputValues] = useSyncStore<Partial<T>>(
    key + "_input",
    compareDiff ? {} : initialValue,
  );
  const merged: Required<T> = useMemo(
    () => ({ ...initialValue, ...inputValues }),
    [inputValues],
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
  }, [merged]);
  const isValid = useMemo(() => {
    if (z.object({}).strict().safeParse(inputValues).success) return false;
    return validator.safeParse(inputValues).success;
  }, [inputValues]);
  const set: Return<T>["set"] = (setter) =>
    setInputValues((prev) => {
      const value =
        typeof setter === "function"
          ? { ...prev, ...setter(prev) }
          : { ...prev, ...setter };
      return compareDiff ? getDiff(initialValue, value) : value;
    });
  const reset = () => setInputValues(() => (compareDiff ? {} : initialValue));

  return { values, inputValues, isValid, set, reset };
};
