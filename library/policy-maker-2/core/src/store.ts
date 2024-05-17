import { IntentNext } from "./intent";

/*
 * Types
 */

/* Basics */
export type LifecycleConfig = {
  staleTime: number | null;
  gcTime: number | null;
};
export type LifecycleContext = {
  lastFreshedAt: number;
  gcTimer: number;
};
export type StoreConfig = LifecycleConfig;
export type StoreContext = Partial<LifecycleConfig & LifecycleContext>;

export type Subscriber = () => void;
export type Subscriptions = Map<string, Subscriber>;
export type Subscribable = { subscriptions: Subscriptions };

/* States */
/**  Dataless State **/
type Rejected<T> = Subscribable &
  StoreContext & {
    status: "REJECTED";
    value: undefined;
    error: unknown;
    from: () => T | Promise<T>;
  };

type Pending<T> = Subscribable &
  StoreContext & {
    status: "PENDING";
    value: Promise<T>;
    error: undefined;
    from: () => T | Promise<T>;
  };

/**  Dataful State **/
type Fresh<T> = Subscribable &
  StoreContext & {
    status: "FRESH";
    value: T;
    from: () => T | Promise<T>;
    error: unknown;
  };

type Refreshing<T> = Subscribable &
  StoreContext & {
    status: "REFRESHING";
    value: T;
    from: () => T | Promise<T>;
    error: unknown;
  };

type Stale<T> = Subscribable &
  StoreContext & {
    status: "STALE";
    value: T;
    from: () => T | Promise<T>;
    error: unknown;
  };

type Cached<T> = Subscribable &
  StoreContext & {
    status: "CACHED";
    value: T;
    from: () => T | Promise<T>;
    error: unknown;
  };

/** Stored State **/
export type StoreStatus =
  | "REJECTED"
  | "PENDING"
  | "FRESH"
  | "REFRESHING"
  | "STALE"
  | "CACHED";
export type Stored<T> =
  | Rejected<T>
  | Pending<T>
  | Fresh<T>
  | Refreshing<T>
  | Stale<T>
  | Cached<T>;
export type StoredWithData<T> = Fresh<T> | Refreshing<T> | Stale<T> | Cached<T>;

/*
 * Predicates
 */
const isWithData = <T>(snapshot?: Stored<T>): snapshot is StoredWithData<T> =>
  !!snapshot && snapshot.status !== "PENDING" && snapshot.status !== "REJECTED";

const isStale = <T>(snapshot: Stored<T>): snapshot is Fresh<T> | Stale<T> => {
  if (!isWithData(snapshot)) return false;
  if (isBusy(snapshot)) return false;
  if (snapshot.status === "STALE") return true;
  if (!snapshot.staleTime || !snapshot.lastFreshedAt) return true;
  return snapshot.lastFreshedAt + snapshot.staleTime < Date.now();
};
const isCached = <T>(snapshot: Stored<T>): snapshot is Cached<T> =>
  snapshot.status === "CACHED";

const isBusy = <T>(
  snapshot: Stored<T>,
): snapshot is Pending<T> | Refreshing<T> =>
  snapshot.status === "PENDING" || snapshot.status === "REFRESHING";

/*
 * Store Manupulation
 */
const _store = new Map<string, Stored<any>>();
const _get = <T>(key: string) => _store.get(key) as Stored<T> | undefined;
const _set = <T, S extends Stored<T> = Stored<T>>(key: string, value: S) => {
  _store.set(key, value);
  value.subscriptions.forEach((listener) => listener());
  return value;
};
const _delete = (key: string) => _store.delete(key);

/*
 * State Transformer
 */

/* PENDING */
const pend = <T>(
  key: string,
  from: () => T | Promise<T>,
  subscribers: Subscriber[],
  config: StoreConfig,
) => {
  const value = Promise.resolve(from());
  value.then((resolved) => freshSnapshot(key, resolved));

  const subscriptions = new Map<string, Subscriber>();
  subscribers.forEach((listener) => subscriptions.set(listener.name, listener));

  return _set<T>(key, {
    status: "PENDING",
    error: undefined,
    value,
    from,
    subscriptions,
    ...config,
  });
};

const repend = <T>(key: string, snapshot: StoredWithData<T>) => {
  if (isBusy(snapshot)) return snapshot;
  const value = Promise.resolve(snapshot.from());
  value.then((resolved) => freshSnapshot(key, resolved));
  return _set<T>(key, {
    ...snapshot,
    status: "PENDING",
    error: undefined,
    value,
  });
};

/* FRESH */
const freshSnapshot = <T>(key: string, value: T) => {
  const prev = _get<T>(key);
  if (!prev) return;
  return _set<T>(key, {
    ...prev,
    status: "FRESH",
    value,
    lastFreshedAt: Date.now(),
  });
};

const freshCache = <T>(key: string, snapshot: Cached<T>) => {
  window.clearTimeout(snapshot.gcTimer);
  return _set(key, {
    ...snapshot,
    status: "FRESH" as const,
    gcTimer: undefined,
  });
};

/* STALE */

const stale = <T>(key: string) => {
  const prev = _get<T>(key);
  if (!prev || isBusy(prev) || !isWithData(prev)) return;
  return _set<T>(key, { ...prev, status: "STALE" });
};

/* CACHE */

/*
 * Public API
 */

/* getter / setter */
const get = <T>(key: string): Stored<T> | undefined => {
  const snapshot = _get<T>(key);
  if (!snapshot) return snapshot;
  if (isStale(snapshot)) return repend(key, snapshot);
  if (snapshot.status === "CACHED") return freshCache(key, snapshot);
  return snapshot;
};

const initSync = <T>(key: string, initialData: T, config: StoreConfig) => {
  return _set<T>(key, {
    status: "FRESH",
    value: initialData,
    error: undefined,
    from: () => initialData,
    subscriptions: new Map(),
    ...config,
    lastFreshedAt: Date.now(),
  });
};
const initAsync = <T>(
  key: string,
  from: () => T | Promise<T>,
  config: StoreConfig,
) => pend(key, from, [], config);

const setSync = <T>(key: string, updater: (prev?: T) => T) => {
  const prev = _get<T>(key);
  if (!prev || prev.status === "REJECTED" || isBusy(prev)) return;
  return _set<T>(key, { ...prev, value: updater(prev.value) });
};

const setAsync = <T>(key: string, updater: (prev?: T) => T | Promise<T>) => {
  const prev = _get<T>(key);
  if (!prev || prev.status === "REJECTED" || isBusy(prev)) return;
  const value: Promise<T> = Promise.resolve(updater(prev.value));
  value.then((resolved) => freshSnapshot(key, resolved));
  return _set<T>(key, { ...prev, status: "REFRESHING" });
};

/* Intent Next */
const invalidate = (key: string) => stale(key);

const map = <T>(key: string, mapper: (prev?: T) => T) => {
  const prev = _get<T>(key);
  if (!prev || prev.status === "REJECTED" || isBusy(prev)) return;
  _set<T>(key, { ...prev, value: mapper(prev.value) });
  prev.subscriptions.forEach((listener) => listener());
};

/* subscription */
const unsubscribe = (key: string, subscriptionKey: string) => {
  const prev = _get(key);
  if (!prev) return;

  prev.subscriptions.delete(subscriptionKey);
  if (prev.subscriptions.size > 0 || isCached(prev)) return;

  if (!prev.gcTime) return _delete(key);

  if (!Number.isFinite(prev.gcTime)) return;
  const timer = window.setTimeout(() => _delete(key), prev.gcTime);

  _set(key, { ...prev, gcTimer: timer });
};

const subscribe = <T>(
  key: string,
  subscriptionKey: string,
  listener: () => void,
  from: () => T | Promise<T>,
  config: StoreConfig,
) => {
  const prev = _get<T>(key);

  if (!prev || prev.status === "REJECTED") pend(key, from, [listener], config);
  else prev.subscriptions.set(subscriptionKey, listener);

  listener();
  return { unsubscribe: () => unsubscribe(key, subscriptionKey) };
};

const parseIntent = <Next extends IntentNext>(next: Next) => {
  switch (next.type) {
    case "SET":
      typeof next.predicate === "string"
        ? setSync(next.predicate, next.fn)
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
  initSync,
  initAsync,
  get,
  setSync,
  setAsync,
  invalidate,
  map,
  subscribe,
  unsubscribe,
  parseIntent,
};
