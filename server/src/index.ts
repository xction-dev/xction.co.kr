import "dotenv/config";
import cors from "cors";
import express from "express";
import user from "./routers/users";
import post from "./routers/posts";
import article from "./routers/articles";

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
app.use("/users", user);
app.use("/posts", post);
app.use("/articles", article);

// error handling
// app.use(errorMapperMiddleware);

app.listen(8080, () => {
  console.log(
    `[server]: Server is running at http://localhost:${process.env.PORT}`,
  );
});
