import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import user from "./routers/users";
import { connection } from "./utils/db/init";
import test from "./routers/test";

// set environment variables
dotenv.config();

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

// routes
app.use("/tests", test);
app.use("/users", user);

// error handling
// app.use(errorMapperMiddleware);

connection.then((connection) => {
  connection.execute(`SELECT * FROM tests`).then(([rows]) => console.log(rows));
});

app.listen(8080, () => {
  console.log(`[server]: Server is running at http://localhost:${8080}`);
});
