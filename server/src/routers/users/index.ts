import { Router } from "express";
import { nanoid } from "nanoid";
import { z } from "zod";

type User = {
  id: number;
  name: string;
  thumbnail?: string;
  authorization?: { username: string; password: string; token: string };
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "박준영",
    thumbnail:
      "https://i.namu.wiki/i/C_DVOnVUvmh21NKyFIvr_ukE4zRI4lwnTp4UnXSMlU98nJGY-uV5_Q1IEWi0NFS0s6FJBx7uUJPxCLkwjugllNuKZr3h7xBElcrEaLxqcUPN2Pt14eJK4TbG_iLfhp5GvxqYelP4_n7IoYOF4Xv-qw.webp",
  },
  {
    id: 2,
    name: "이화림",
    thumbnail:
      "https://i.namu.wiki/i/IxoyHhoskRjxFQuF-dPG0DoxlqTjllJEb15jfN8V1-YaXVRghU6Cz685pziG-3JAwpsh7-xLRlmZbg9sh1FfQ1k5IUWhgWeu7e3TWIwcSQvNf6fOabSAr9MNyFY4D5AnKzmL9mXNL5rKx3TSnEByuA.webp",
  },
  {
    id: 3,
    name: "고영근",
    thumbnail:
      "https://i.namu.wiki/i/NkUOMDfkwmE0-r4lTet7vTAorqAAqGHwrdWq_4kv4WdXaYeDCsyxnFi6waVJ6y9ma71NhC4flCwCfOPHsNH7Nqt8yj6G9M9LX8yAl7BGWYPU2qQS0D9HCrkBYrvddvcXfHSOQsgpc5zQhE-sxo4N3A.webp",
  },
  {
    id: 4,
    name: "김상덕",
    thumbnail:
      "https://i.namu.wiki/i/RCAR2V3YPyXvxfkdpCmlTto8naGHKLzlFMX76nDGNs3Kaf1OHYa6-LOLgX6fPeQWnb3-uGsTRMkUASVEO9kiHnjTqGLHSt51ROKCtTUVFxFvxTfphSgbVzZLkg189nwN-U_vso90TvzQeiDNk9Z-jA.webp",
  },
  {
    id: 5,
    name: "윤봉길",
    thumbnail:
      "https://i.namu.wiki/i/RhtXRz5QcwCHvsR4iqS96loVe29uUrYgfcbJeIsAzcKq_u3K6o83oh2LTDVUYcMJnwH-_k0bVDLUrAafZiDnXYU30ft5wrE7eQZ45KnVtd56GP0mmdidyNXGdeJBfLiQEOL9ljHpG7nUPjdwV7CX8A.webp",
  },
];

const router = Router();

const SignupRequestDto = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  thumbnail: z.string().optional(),
});
router.post("/signup", (req, res) => {
  try {
    const parsedBody = SignupRequestDto.parse(req.body);
    mockUsers.push({
      id: mockUsers[mockUsers.length - 1]?.id + 1 || 1,
      name: parsedBody.name,
      thumbnail: parsedBody.thumbnail,
      authorization: {
        username: parsedBody.username,
        password: parsedBody.password,
        token: nanoid(),
      },
    });
    res.send(200);
  } catch (e) {
    if (e instanceof z.ZodError)
      res.status(400).json({ message: e.errors[0].message });
    else if (e instanceof Error) res.status(400).json({ message: e.message });
    else res.status(500).json({ message: "Unknown" });
  }
});

const SigninRequestDto = z.object({
  username: z.string(),
  password: z.string(),
});
router.post("/signin", (req, res) => {
  try {
    const parsedBody = SigninRequestDto.parse(req.body);
    const user = mockUsers.find(
      (user) =>
        user.authorization &&
        user.authorization.username === parsedBody.username &&
        user.authorization.password === parsedBody.password,
    );
    if (!user) res.status(401).json({ message: "Unauthorized" });
    else res.json({ token: user.authorization?.token });
  } catch (e) {
    if (e instanceof z.ZodError)
      res.status(400).json({ message: e.errors[0].message });
    else if (e instanceof Error) res.status(400).json({ message: e.message });
    else res.status(500).json({ message: "Unknown" });
  }
});

router.get("", (_, res) => {
  res.json({
    data: mockUsers.map(({ id, name, thumbnail }) => ({ id, name, thumbnail })),
  });
});
router.get("/me", (req, res) => {
  const token = req.headers.authorization;
  const me = mockUsers.find(
    (user) => token && user.authorization?.token === token,
  );
  if (!me) res.status(401).json({ message: "Unauthorized" });
  else res.json({ id: me.id, name: me.name, thumbnail: me.thumbnail });
});
router.patch("/me", (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new Error("Unauthorized");
    const me = mockUsers.find((user) => user.authorization?.token === token);
    if (!me) throw new Error("Unauthorized");
    const parsedBody = SignupRequestDto.partial().parse(req.body);
    const newMe = {
      id: me.id,
      name: parsedBody.name ?? me.name,
      thumbnail: parsedBody.thumbnail ?? me.thumbnail,
      authorization: me.authorization && {
        username: parsedBody.username ?? me.authorization.username,
        password: parsedBody.password ?? me.authorization.password,
        token: me.authorization.token,
      },
    };
    mockUsers[mockUsers.findIndex((user) => user.id === me.id)] = newMe;
    res.status(200);
  } catch (e) {
    if (e instanceof z.ZodError)
      res.status(400).json({ message: e.errors[0].message });
    else if (e instanceof Error) res.status(400).json({ message: e.message });
    else res.status(500).json({ message: "Unknown" });
  }
});

router.get("/:userId", (req, res) => {
  const user = mockUsers.find((user) => user.id === Number(req.params.userId));
  if (!user) res.status(404).json({ message: "Not Found" });
  else res.json({ id: user, name: user.name, thumbnail: user.thumbnail });
});

export default router;
