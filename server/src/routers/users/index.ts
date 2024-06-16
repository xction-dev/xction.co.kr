import { UserSchema, users } from "@/repository/users";
import { connection } from "@/utils/db/init";
import wrap from "@/utils/wrap";
import { UserApi } from "@core/api/user";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

const router = Router();

const { getMe, getUserById, postSignIn } = UserApi;

router.get(
  "",
  wrap(async (_, res) => {
    const [result] = await (
      await connection
    ).execute(`
      SELECT users.id, name, bio, thumbnailImage, backgroundImage, userTypes.value AS userType
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
  postSignIn.server.endpoint[1],
  wrap(async (req, res) => {
    const body = postSignIn.server.parseRequest(req).body;
    if (!body) throw new Error("Body is empty");
    const { email, password } = body;
    const result = await (
      await connection
    )
      .execute(
        `
      SELECT ${users.SELECT()}
      FROM users
      ${users.JOIN()}
      WHERE email = '${email}' AND password = '${password}'
    `,
      )
      .then(([result]) => result as any[])
      .then(([data]) => data as any[])
      .then(UserSchema.parse);

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

export default router;
