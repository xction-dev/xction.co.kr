import { UserSchema, users } from "@/repository/users";
import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { UserApi } from "@core/api/user";
import { Router } from "express";
import { PostLoginBody } from "@core/dto/user";
import * as jwt from "jsonwebtoken";
import db from "@/utils/db/manipulate";
import { PostRegisterBody } from "../../../../core/dto/user/index";

const router = Router();

const { getMe, getUserById } = UserApi;

router.get(
  "",
  wrap(async (_, res) => {
    const [result] = await (
      await connection
    ).execute(`
      SELECT users.id, name, bio, thumbnailImage, userTypes.value AS userType
      FROM users
      LEFT JOIN userTypes ON users.userTypeId = userTypes.id
    `);
    res.json({ data: result });
  }),
);

router.get(
  getMe.server.endpoint[1],
  wrap(async (req, res) => {
    const token = req.headers.authorization;
    const sliced = token?.slice(7);
    const userId = jwt.verify(sliced ?? "", process.env.JWT_SECRET as string);
    const [result] = await (
      await connection
    ).execute(`
      SELECT ${users.SELECT()}
      FROM users
      ${users.JOIN()}
      WHERE users.id = ${userId}
    `);
    res.json({ data: result });
  }),
);

router.get(
  getUserById.server.endpoint[1],
  wrap(async (req, res) => {
    const [result] = await (
      await connection
    ).execute(`
      SELECT ${users.SELECT()}
      FROM users
      ${users.JOIN()}
      WHERE users.id = ${req.params.userId}
    `);
    res.json({ data: result });
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

    if (result) {
      const token = jwt.sign(
        result.id.toString(),
        process.env.JWT_SECRET as string,
      );
      res.json({ data: { ...result, token } });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
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
