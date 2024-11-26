import { createConnection } from "mysql2/promise";

export const connection = () =>
  createConnection({
    host: "xctiondb",
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
