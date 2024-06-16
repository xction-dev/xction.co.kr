import { User } from "@core/entity/user";
import { ViewPolicy } from "library/policy-maker-2/core";
import { z } from "zod";

export const VPMe = ViewPolicy(() => ({
  key: ["me"],
  model: User.extend({ token: z.string() }).nullable(),
}));
