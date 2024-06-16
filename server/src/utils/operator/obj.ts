const group = (prefix: string) => (obj: Record<string, unknown>) =>
  Object.keys(obj).reduce(
    (acc, key) => {
      if (key.startsWith(prefix)) {
        const propName = key.slice(prefix.length + 1);
        console.log(propName);
        if (!acc[prefix]) acc[prefix] = {};
        (acc[prefix] as Record<string, unknown>)[propName] = obj[key];
      } else {
        acc[key] = obj[key];
      }
      return acc;
    },
    {} as Record<string, unknown>,
  );

const mapKey =
  <Key extends string, Input, Output, As extends string = Key>(
    key: Key,
    mapper: (arg: Input) => Output,
    as?: As,
  ) =>
  <T extends { [K in Key]: Input }>(obj: T) => {
    return Object.keys(obj).reduce(
      (acc, k) => {
        if (k === key) return { ...acc, [as ?? key]: mapper(obj[key]) };
        return { ...acc, [k]: obj[k as keyof typeof obj] };
      },
      {} as Omit<T, Key> & { [K in As]: Output },
    );
  };

export const obj = { group, mapKey };
