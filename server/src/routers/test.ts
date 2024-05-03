import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { Router } from "express";

const router = Router();

router.get(
  "",
  wrap(async (_, res) => {
    const [result] = await (await connection).execute(`SELECT * FROM tests`);
    res.json({ data: result });
  }),
);

export default router;
