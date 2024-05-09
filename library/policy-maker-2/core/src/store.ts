/*
 * Types
 */

import { IntentNext } from "./intent";

/* Basics */
export type Lifecycle = {
  lastFreshedAt: number;
  staleTime: number | null;
};
export type LifecycleConfig = {
  staleTime: number | null;
};
export type StoreConfig = LifecycleConfig;

/* States */
/**  Dataless State **/
type Rejected<T> = {
  status: "REJECTED";
  value: undefined;
  error: unknown;
  init: () => T | Promise<T>;
};
type Pending<T> = {
  status: "PENDING";
  value: undefined;
  promise: Promise<T>;
  init: () => T | Promise<T>;
};

/**  Dataful State **/
type Resolved<T> = {
  status: "FRESH" | "REFRESHING" | "STALE";
  value: T;
  init: () => T | Promise<T>;
} & Lifecycle;

/* Stored State */
export type State<T> = Rejected<T> | Pending<T> | Resolved<T>;
export type Stored<T> = State<T> & {
  subscriptions: Map<string, () => void>;
};
export type StoredWithData<T> = Resolved<T> & {
  subscriptions: Map<string, () => void>;
};

/*
 * Functions
 */

/* util */
const isStale = <T>(snapshot: StoredWithData<T>) =>
  snapshot.staleTime !== null &&
  snapshot.lastFreshedAt + snapshot.staleTime < Date.now();

/* Internal */
const _store = new Map<string, Stored<any>>();
const _get = <T>(key: string) => _store.get(key) as Stored<T> | undefined;
const _set = <T>(key: string, value: Stored<T>): Stored<T> => {
  _store.set(key, value);
  value.subscriptions.forEach((listener) => listener());
  return value;
};
const _delete = (key: string) => _store.delete(key);

const _pend = <T>(
  key: string,
  promise: Promise<T>,
  init: () => T | Promise<T>,
  config: LifecycleConfig,
  subscriptions: Map<string, () => void> = new Map(),
) =>
  _set<T>(key, {
    status: "PENDING",
    value: undefined,
    promise,
    init,
    subscriptions,
    ...config,
  });

const _fresh = <T>(
  key: string,
  value: T,
  init: () => T | Promise<T>,
  subscriptions: Map<string, () => void>,
  config: LifecycleConfig,
) =>
  _set(key, {
    status: "FRESH",
    value,
    init,
    subscriptions,
    lastFreshedAt: Date.now(),
    ...config,
  });
const _refresh = <T>(key: string, prev: StoredWithData<T>) =>
  _set(key, { ...prev, status: "REFRESHING" });
const _stale = <T>(key: string, prev: StoredWithData<T>) =>
  _set(key, { ...prev, status: "STALE" });

/* Public */
const get = <T>(key: string): Stored<T> | undefined => {
  const snapshot = _get<T>(key);
  if (
    snapshot?.status === "STALE" ||
    (snapshot?.status === "FRESH" && isStale(snapshot))
  )
    return set(key, snapshot.init, { staleTime: snapshot.staleTime });
  return snapshot;
};

const set = <T>(
  key: string,
  setter: (prev?: T) => T | Promise<T>,
  config: LifecycleConfig,
) => {
  const prev = _get<T>(key);
  // no previous state
  if (!prev || prev.status === "REJECTED") {
    const next = setter();
    // input is promise
    if (next instanceof Promise) {
      next.then((resolved) => {
        const snapshot = _get<T>(key);
        if (snapshot?.status !== "PENDING") return;
        _fresh(key, resolved, snapshot.init, snapshot.subscriptions, config);
      });
      return _pend(key, next, setter, config);
    }
    // input is value
    return _fresh(key, next, setter, new Map(), config);
  }
  // previous state is busy
  if (prev.status === "PENDING" || prev.status === "REFRESHING") return prev;

  // previous state is idle
  const next = setter(prev.value);
  if (next instanceof Promise) {
    next.then((resolved) => {
      const snapshot = _get<T>(key);
      if (snapshot?.status !== "REFRESHING") return;
      _fresh(key, resolved, snapshot.init, snapshot.subscriptions, {
        staleTime: snapshot.staleTime,
      });
    });
    return prev.status === "STALE" || isStale(prev)
      ? _pend(key, next, prev.init, { staleTime: prev.staleTime })
      : _refresh(key, prev);
  }
  return _fresh(key, next, prev.init, prev.subscriptions, {
    staleTime: prev.staleTime,
  });
};

const unsubscribe = (key: string, subscriptionKey: string) => {
  const prev = _get(key);
  if (prev) {
    prev.subscriptions.delete(subscriptionKey);
    if (prev.subscriptions.size === 0) _delete(key);
  }
};
const subscribe = <T>(
  key: string,
  subscriptionKey: string,
  listener: () => void,
  init: () => T | Promise<T>,
  config: LifecycleConfig,
) => {
  const prev = _get<T>(key);
  if (!prev || prev.status === "REJECTED") {
    const initial = set(key, init, config);
    initial.subscriptions.set(subscriptionKey, listener);
    return {
      stored: initial,
      unsubscribe: () => unsubscribe(key, subscriptionKey),
    };
  }
  prev.subscriptions.set(subscriptionKey, listener);
  return { stored: prev, unsubscribe: () => unsubscribe(key, subscriptionKey) };
};

const invalidate = <T>(key: string) => {
  const prev = _get<T>(key);
  if (
    !prev ||
    prev.status === "REFRESHING" ||
    prev.status === "PENDING" ||
    prev.status === "REJECTED"
  )
    return;
  _stale(key, prev);
};

const parseIntent = <Next extends IntentNext>(next: Next) => {
  switch (next.type) {
    case "SET":
      typeof next.predicate === "string"
        ? set(next.predicate, next.fn, { staleTime: null })
        : null;
      return;
    case "INVALIDATE":
      typeof next.predicate === "string" ? invalidate(next.predicate) : null;
      return;
    case "RESET":
      return;
  }
};

export const store = {
  get,
  set,
  invalidate,
  subscribe,
  unsubscribe,
  parseIntent,
};
