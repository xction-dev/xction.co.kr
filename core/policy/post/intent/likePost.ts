import { ID } from "@core/constant/common/id";
import { IntentPolicy } from "library/policy-maker-2/core";
import { z } from "zod";

export const IPLikePost = IntentPolicy((postId: ID["POST"]) => ({
  key: { name: "likePost", postId },
  model: { input: z.never(), output: z.unknown() },
  next: () => [],
}));
