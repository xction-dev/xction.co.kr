import { IntentPolicy } from "library/policy-maker-2/core";
import { z } from "zod";
import { VPMe } from "../view/me";

export const IPSignin = IntentPolicy(() => ({
  key: ["signIn"],
  model: {
    input: z.object({ email: z.string(), password: z.string() }),
    output: z.unknown(),
  },
  next: () => [VPMe().invalidate()],
}));
