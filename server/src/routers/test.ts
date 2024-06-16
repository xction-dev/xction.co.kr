import wrap from "@/utils/wrap";
import { Router } from "express";

const router = Router();

router.get(
  "",
  wrap(async (_, res) => {
    const result = ["test1", "test2", "test3"];
    res.json({ data: result });
  }),
);

export default router;
