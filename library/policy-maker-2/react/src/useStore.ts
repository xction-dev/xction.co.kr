import { StoreConfig, store } from "@policy-maker-2/core";
import { useReducer, useMemo, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

const defaultStoreConfig: StoreConfig = {
  staleTime: Infinity,
  gcTime: null,
};

export const useStore = <T>(
  key: string,
  from: () => T | Promise<T>,
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
      return existing ?? store.initAsync<T>(key, from, config);
    },
  );

  const set = useCallback(
    (setter: (prev?: T) => T | Promise<T>) => store.setAsync(key, setter),
    [key],
  );

  useEffect(() => {
    const { unsubscribe } = store.subscribe<T>(
      key,
      subscriptionKey,
      dispatch,
      from,
      config,
    );
    return () => {
      unsubscribe();
    };
  }, [key]);

  return [stored, set] as const;
};

const defaultSyncStoreConfig: StoreConfig = {
  staleTime: Infinity,
  gcTime: null,
};

export const useSyncStore = <T>(key: string, from: T) => {
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
      return existing ?? store.initSync<T>(key, from, defaultSyncStoreConfig);
    },
  );

  const set = useCallback(
    (setter: (prev?: T) => T) => store.setSync(key, setter),
    [key],
  );

  useEffect(() => {
    const { unsubscribe } = store.subscribe<T>(
      key,
      subscriptionKey,
      dispatch,
      () => from,
      defaultSyncStoreConfig,
    );
    return () => {
      unsubscribe();
    };
  }, [key]);

  return [stored, set] as const;
};
