import { createConnection } from "mysql2/promise";

export const connection = () =>
  createConnection({
    host: "xctiondb",
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
