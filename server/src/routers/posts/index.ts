import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { PostApi } from "@core/api/post";
import { Router } from "express";

const router = Router();

const { getPosts } = PostApi;

router.get(
  getPosts.server.endpoint,
  wrap(async (_, res) => {
    // parse request

    // connect db
    const [result] = await (await connection).execute(`SELECT * FROM users`);

    // parse data

    // return response
    res.json({ data: result });
  }),
);

export default router;
