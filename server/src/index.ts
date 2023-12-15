import cors from "cors";
import express from "express";
import dotenv from "dotenv";

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
  res.send("Codec Server!");
});

app.listen(process.env.PORT, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`,
  );
});
