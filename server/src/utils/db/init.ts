import { createConnection } from "mysql2/promise";

export const connection = createConnection({
  host: "localhost",
  user: "root",
  database: "xction_test",
  password: "wh173SQL?!",
});
