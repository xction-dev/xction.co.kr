import { Router } from "express";
import wrap from "@/utils/wrap";
import db from "@/utils/db/manipulate";
import { ArticleContentSchema, ArticleSchema } from "@/schema/articles";
import { connection } from "@/utils/db/init";
import { ResultSetHeader } from "mysql2";
import { z } from "zod";

const router = Router();

router.get(
  "/:articleId",
  wrap(async (req, res) => {
    const articleId = Number(req.params.articleId);

    const article = await db.select.byId<ArticleSchema>({
      from: "articles",
      schema: ArticleSchema,
      id: articleId,
    });

    const { content } = await db.select.byIdRaw<ArticleContentSchema>({
      from: "articleContents",
      schema: ArticleContentSchema,
      id: articleId,
    });

    res.json({ ...article, content });
  }),
);

router.post(
  "/",
  wrap(async (req, res) => {
    console.log(req);
    const { content } = z.object({ content: z.string() }).parse(req.body);

    const insertedId = await (
      await connection
    )
      .execute<ResultSetHeader>(
        `INSERT INTO articles(createdUserId, title) VALUES (1, "POST 테스트 중")`,
      )
      .then(([row]) => row)
      .then((result) => {
        console.log(result);
        return result.insertId;
      });
    await (
      await connection
    ).execute(
      `INSERT INTO articleContents(id, content) VALUES (${insertedId}, "${content}")`,
    );

    res.json({ insertedId });
  }),
);

export default router;
