import { RowDataPacket } from "mysql2";
import { sql } from "../sql";
import { connection } from "../init";
import { obj } from "@/utils/operator/obj";
import { z } from "zod";

const byIds = async <AS extends string>({
  from,
  key,
  as,
  ids,
}: {
  from: string;
  key: string;
  as: AS;
  ids: number[];
}) => {
  console.log(`
      SELECT ${key}, count(*) AS ${as} from ${from} 
      WHERE ${sql.inArray(key, ids)}
      GROUP BY ${key}
    `);
  return (await connection)
    .execute<RowDataPacket[]>(
      `
      SELECT ${key}, count(*) AS ${as} from ${from} 
      WHERE ${sql.inArray(key, ids)}
      GROUP BY ${key}
    `,
    )
    .then(([data]) =>
      data
        .map((row) =>
          z.object({ [key]: z.number(), [as]: z.number() }).parse(row),
        )
        .map(obj.mapKey(key, (id) => id, "id")),
    );
};

const byId = async ({
  from,
  key,
  id,
}: {
  from: string;
  key: string;
  id: number;
}) => {
  return (await connection)
    .execute<RowDataPacket[]>(
      `
      SELECT ${key}, count(*) AS counts from ${from}
      WHERE ${key} = ${id}
      GROUP BY ${key}
    `,
    )
    .then(([data]) => {
      if (data.length === 0) return 0;
      if (data.length > 2) throw new Error("Too many results");
      const { counts } = z.object({ counts: z.number() }).parse(data[0]);
      return counts;
    });
};

export const _db_count = {
  byIds,
  byId,
};
