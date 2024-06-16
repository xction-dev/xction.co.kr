import { z } from "zod";
import { IntentPolicy } from "../src/intent";
import { ViewPolicy } from "../src/view";

const VPMe = ViewPolicy(() => ({
  key: { name: "me" },
  model: z.object({
    id: z.number(),
    name: z.string(),
  }),
}));

const IPEditMe = IntentPolicy(() => ({
  key: { name: "me" },
  model: {
    input: z.object({
      id: z.number(),
      name: z.string(),
    }),
    output: z.object({
      id: z.number(),
      name: z.string(),
    }),
  },
  next: ({ output }) => [
    VPMe().set(() => output),
    VPMe().invalidate(),
    VPMe().reset(),
  ],
}));
