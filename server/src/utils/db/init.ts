import { createConnection } from "mysql2/promise";

export const connection = () =>
  createConnection({
    host: "172.19.0.4",
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "xctiondb",
  });
