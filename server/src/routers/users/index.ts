import { UserSchema } from "@/repository/users";
import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { Router } from "express";
import { PostLoginBody } from "@core/dto/user";
import * as jwt from "jsonwebtoken";
import db from "@/utils/db/manipulate";
import { PostRegisterBody } from "../../../../core/dto/user/index";

const router = Router();

router.get(
  "",
  wrap(async (_, res) => {
    const [result] = await (
      await connection
    ).execute(`
      SELECT id, name, bio, thumbnailImage
      FROM users
    `);
    res.json({ data: result });
  }),
);

/*
 * GET "/users/me"
 */
router.get(
  "/me",
  wrap(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) throw new Error("Token is empty");

    const userId = Number(
      jwt.verify(token.slice(7), process.env.JWT_SECRET as string),
    );

    const user = await db.select.byIdRaw<UserSchema>({
      from: "users",
      schema: UserSchema,
      id: userId,
    });

    res.json(user);
  }),
);

/*
 * GET "/users/:userId"
 */
router.get(
  "/:userId",
  wrap(async (req, res) => {
    const userId = Number(req.params.userId);

    const user = await db.select.byIdRaw<UserSchema>({
      from: "users",
      schema: UserSchema,
      id: userId,
    });

    res.json(user);
  }),
);

router.post(
  "/login",
  wrap(async (req, res) => {
    const body = PostLoginBody.parse(req.body);
    if (!body) throw new Error("Body is empty");
    const { email, password } = body;
    const result = await db.select.oneRaw<UserSchema>({
      from: "users",
      schema: UserSchema,
      where: `email = "${email}" AND password = "${password}"`,
    });

    if (!result) throw new Error("User not found");

    const token = jwt.sign(
      result.id.toString(),
      process.env.JWT_SECRET as string,
    );

    res.json({ data: { ...result, token } });
  }),
);

router.post(
  "/register",
  wrap(async (req, res) => {
    const { email, password, name } = PostRegisterBody.parse(req.body);
    await (
      await connection
    ).execute(`
      INSERT INTO users(email, password, name) VALUES ("${email}", "${password}", "${name}")
    `);
    res.send("Register Success");
  }),
);

export default router;
