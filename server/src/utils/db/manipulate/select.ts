import { Schema, SchemaRaw } from "@/schema/utils/Schema";
import { connection } from "../init";
import { sql } from "../sql";
import { RowDataPacket } from "mysql2/promise";
import { obj } from "../../operator/obj";
import { UserSummarySchema } from "@/schema/users";

const page = async <T extends Record<string, unknown>>({
  from,
  schema,
  pageNumber = 1,
  where,
}: {
  from: string;
  schema: Schema<T>;
  pageNumber?: number;
  where?: string;
}) => {
  return (await connection)
    .execute<RowDataPacket[]>(
      `
      SELECT ${sql.pick(from, Object.keys(schema.shape))}, ${sql.pick("users", Object.keys(UserSummarySchema.shape), "createdUser")}
      FROM ${from}
      ${sql.joinById("users", `${from}.createdUserId`)}
      ${where ? `WHERE ${where}` : ""}
      LIMIT ${(pageNumber - 1) * 20}, 20
    `,
    )
    .then(([data]) =>
      data
        .map(obj.group("createdUser"))
        .map((row) =>
          schema
            .omit({ createdUserId: true })
            .extend({ createdUser: UserSummarySchema })
            .parse(row),
        ),
    );
};

const byId = async <T extends Record<string, unknown>>({
  from,
  schema,
  id,
}: {
  from: string;
  schema: Schema<T>;
  id: number;
}) => {
  return (await connection)
    .execute<RowDataPacket[]>(
      `
      SELECT ${sql.pick(from, Object.keys(schema.shape))}, ${sql.pick("users", Object.keys(UserSummarySchema.shape), "createdUser")}
      FROM ${from}
      ${sql.joinById("users", `${from}.createdUserId`)}
      WHERE ${from}.id = ${id}
    `,
    )
    .then(([data]) => {
      if (data.length === 0) throw new Error("Not found");
      if (data.length > 2) throw new Error("Too many results");
      return Promise.resolve(data[0])
        .then(obj.group("createdUser"))
        .then(
          schema
            .omit({ createdUserId: true })
            .extend({ createdUser: UserSummarySchema }).parse,
        );
    });
};

const byIdRaw = async <T extends Record<string, unknown>>({
  from,
  schema,
  id,
}: {
  from: string;
  schema: SchemaRaw<T>;
  id: number;
}) => {
  return (await connection)
    .execute<RowDataPacket[]>(
      `
      SELECT ${sql.pick(from, Object.keys(schema.shape))}
      FROM ${from}
      WHERE ${from}.id = ${id}
    `,
    )
    .then(([data]) => {
      if (data.length === 0) throw new Error("Not found");
      if (data.length > 2) throw new Error("Too many results");
      return Promise.resolve(data[0]).then(schema.parse);
    });
};

export const _db_select = { page, byId, byIdRaw };
