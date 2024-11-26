import { createConnection } from "mysql2/promise";

export const connection = () =>
  createConnection({
    host: "172.19.0.3",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
  });
