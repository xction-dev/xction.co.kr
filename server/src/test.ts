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
      ).execute("SELECT * FROM users");
      res.send(data);
    } catch (error) {
      const isNetworkError =
        error.code === "ETIMEDOUT" || error.code === "ECONNREFUSED";
      const isAuthError =
        error.code === "ER_ACCESS_DENIED_ERROR" ||
        error.code === "ER_BAD_DB_ERROR";

      console.error("Database connection error details:");
      console.error({
        message: error.message,
        code: error.code,
        sqlState: error.sqlState,
        stack: error.stack,
        ...(isNetworkError && { hint: "Check network connectivity." }),
        ...(isAuthError && {
          hint: "Check username, password, or database name.",
        }),
      });

      res.status(500).send({
        error: "DB Error",
        details: {
          message: error.message,
          code: error.code,
          sqlState: error.sqlState,
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