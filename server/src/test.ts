import cors from "cors";
import express from "express";

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

app.listen(8080, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`,
  );
});
