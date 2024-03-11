import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db/connect";
import comment from "./routers/comment";
import wrapAsync from "./utils/wrapAsync";
import { initUniqueId } from "./utils/db/uniqueId";
import errorMapperMiddleware from "./utils/middleware/errorMapperMIddleware";

// set environment variables
dotenv.config();

// create express app
const app = express();

// add express middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*** connect DB ***/
connectDB()
  .then(() => {
    wrapAsync((_, __, db) => initUniqueId(db));
  })
  .catch(() => console.log("DB connection failed"));

// default route
app.get("/", (_, res) => {
  res.send("Xction Server!");
});

// routes
app.use("/comment", comment);

// error handling
app.use(errorMapperMiddleware);

// assign port and start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
