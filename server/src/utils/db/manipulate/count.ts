import { RowDataPacket } from "mysql2";
import { sql } from "../sql";
import { connection } from "../init";
import { obj } from "@/utils/operator/obj";
import { z } from "zod";

const byIds = async ({
  from,
  key,
  as,
  targets,
}: {
  from: string;
  key: string;
  as: string;
  targets: number[];
}) => {
  return (await connection)
    .execute<RowDataPacket[]>(
      `
    SELECT ${key}, count(*) AS ${as} from ${from} where ${sql.inArray(key, targets)}
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

export const _db_count = {
  byIds,
};
