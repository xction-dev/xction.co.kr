export const as = (prop: string, name?: string, usePropName?: boolean) => {
  if (name) return ` AS ${name}_${prop}`;
  return usePropName ? ` AS ${prop}` : ``;
};

export const oneLine = (str: string) =>
  str.replace(/\n/g, "").replace(/\s+/g, " ").trim();

export const groupKeys = (name: string) => (obj: Record<string, unknown>) => {
  const totalKeys = Object.keys(obj);
  const keysToGroup = totalKeys.filter((k) => k.startsWith(name));
  const keysLeft = totalKeys.filter((k) => !k.startsWith(name));
  const grouped = keysToGroup.reduce(
    (acc, key) => {
      const newKey = key.replace(`${name}_`, "");
      return { ...acc, [newKey]: obj[key] };
    },
    {} as Record<string, unknown>,
  );
  const left = keysLeft.reduce(
    (acc, key) => ({ ...acc, [key]: obj[key] }),
    {} as Record<string, unknown>,
  );
  return { ...left, [name]: grouped };
};

export const matchById = <ID>(
  mainArr: { id: ID }[],
  ...arrs: [{ id: ID }[], Record<string, unknown>][]
) => {
  return mainArr.map((main) => {
    const matchedList = arrs.map(
      ([subArr, defaultValue]) =>
        subArr.find((sub) => sub.id === main.id) ?? {
          id: main.id,
          ...defaultValue,
        },
    );
    const matchedObject = matchedList.reduce(
      (acc, obj) => ({ ...acc, ...obj }),
      {} as Record<string, unknown>,
    );
    return { ...main, ...matchedObject };
  });
};
