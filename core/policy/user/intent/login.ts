import { USER_EMAIL } from "@core/constant/user/userEmail";
import { USER_PASSWORD } from "@core/constant/user/userPassword";
import { User } from "@core/entity/user";
import { IntentPolicy } from "@policy-maker/core";
import { z } from "zod";

export const LoginInput = z.object({
  email: USER_EMAIL,
  password: USER_PASSWORD,
});

export const IPLogin = IntentPolicy(() => ({
  key: ["me"],
  model: { input: LoginInput, output: User.extend({ token: z.string() }) },
}));
