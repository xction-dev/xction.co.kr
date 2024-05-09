export const hashFn = (obj: Record<string, unknown>) =>
  JSON.stringify(
    Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        if (key[0] !== "_") result[key] = obj[key];
        return result;
      }, {} as any),
  );
