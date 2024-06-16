const pick = (from: string, keys: string[], as?: string) =>
  keys.map((key) => `${from}.${key}${as ? ` AS ${as}_${key}` : ``}`).join(", ");

const inArray = (name: string, any: any[]) =>
  `${name} in ( ${any.join(", ")} )`;

const countBy = ({
  from,
  key,
  where,
  as,
}: {
  from: string;
  key: string;
  where?: string;
  as?: string;
}) => `
  SELECT ${key}, count(*)${as ? ` AS ${as}` : ``} from ${from}${where ? ` where ${where}` : ``}
  GROUP BY ${key}
`;

const joinById = (from: string, propName: string) =>
  `LEFT JOIN ${from} ON ${propName} = ${from}.id`;

export const sql = { pick, inArray, countBy, joinById };
