import cors from "cors";
import express from "express";
import wrap from "./utils/wrap";
import { connection } from "./utils/db/init";

// create express app
const app = express();

// add express middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// default route
app.get("/", (_, res) => {
  res.send("Xction Server!");
});

app.get(
  "/db",
  wrap(async (_, res) => {
    try {
      const [data] = await (
        await connection()
      ).execute("SELECT * users");
      res.send(data);
    } catch (error) {
      const err = error as any; // error를 any 타입으로 단언

      const isNetworkError =
        err.code === "ETIMEDOUT" || err.code === "ECONNREFUSED";
      const isAuthError =
        err.code === "ER_ACCESS_DENIED_ERROR" || err.code === "ER_BAD_DB_ERROR";

      console.error("Database connection error details:");
      console.error({
        message: err.message,
        code: err.code,
        sqlState: err.sqlState,
        stack: err.stack,
        ...(isNetworkError && { hint: "Check network connectivity." }),
        ...(isAuthError && {
          hint: "Check username, password, or database name.",
        }),
      });

      res.status(500).send({
        error: "DB Error",
        details: {
          message: err.message,
          code: err.code,
          sqlState: err.sqlState,
          type: isNetworkError
            ? "Network Issue"
            : isAuthError
            ? "Authentication Issue"
            : "Unknown Issue",
        },
      });
    }
  }),
);
app.listen(8080, () => {
  console.log(`[server]: Server is running at http://localhost:8080`);
});
