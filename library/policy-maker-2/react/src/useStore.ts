import { StoreConfig, StoredWithData, store } from "@policy-maker-2/core";
import { useReducer, useMemo, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

const defaultStoreConfig: StoreConfig = {
  staleTime: null,
};

export const useStore = <T>(
  key: string,
  init: () => T | Promise<T>,
  inputConfig?: Partial<StoreConfig>,
) => {
  const config = useMemo(
    () => ({ ...inputConfig, ...defaultStoreConfig }),
    [key],
  );
  const subscriptionKey = useMemo(() => key + nanoid(5), [key]);
  const [stored, dispatch] = useReducer(
    () => {
      const next = store.get<T>(key);
      if (!next) throw new Error(`Store with key ${key} not found`);
      return next;
    },
    undefined,
    () => {
      const existing = store.get<T>(key);
      return existing ?? store.set(key, init, config);
    },
  );

  const set = useCallback(
    (setter: (prev?: T) => T | Promise<T>) => store.set(key, setter, config),
    [key],
  );

  useEffect(() => {
    const { unsubscribe } = store.subscribe<T>(
      key,
      subscriptionKey,
      dispatch,
      init,
      config,
    );
    return () => unsubscribe();
  }, [key]);

  return [stored, set] as const;
};

export const useSyncStore = <T>(key: string, init: T) => {
  const [_get, _set] = useStore(key, () => init, { staleTime: null });
  const set = useCallback(
    (setter: (prev: T) => T) => _set((prev) => setter(prev as T)),
    [key],
  );
  if (!_get.value) throw new Error(`Store with key ${key} not found`);
  return [_get as StoredWithData<T>, set] as const;
};
