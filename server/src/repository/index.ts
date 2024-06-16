export type Repository = {
  origin: {
    table: string;
    predicate?: string;
    columns: string[];
  };
  join: {
    [key: string]: {
      predicate: string;
      columns: string | string[];
      as: string;
    };
  };
};

export const queryFromRepository = ({ origin, join }: Repository): string => {
  const joinKeys = Object.keys(join);
  const originColumns = origin.columns.map(
    (column) => `${origin.table}.${column}`,
  );
  const foreignColumns = joinKeys.map((key) => {
    const { columns, as } = join[key];
    if (typeof columns === "string") return `${key}.${columns} AS ${as}`;
    return columns
      .map((column) => `${key}.${column} AS ${as}_${column}`)
      .join(", ");
  });
  const columns = [...originColumns, ...foreignColumns];
  const joins = joinKeys.map(
    (key) => `LEFT JOIN ${key} ON ${join[key].predicate}`,
  );

  const SELECT = columns.join(", ");
  return `SELECT ${SELECT} FROM ${origin.table} ${joins.join(" ")} ${origin.predicate ? `WHERE ${origin.predicate}` : ""}`;
};
