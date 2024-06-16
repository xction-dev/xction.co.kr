import { ID } from "@core/constant/common/id";
import { IntentPolicy } from "@policy-maker-2/core";
import { z } from "zod";

export const IPLikePostComment = IntentPolicy(
  (postCommentId: ID["POST_COMMENT"]) => ({
    key: { name: "likePost", postCommentId },
    model: { input: z.never(), output: z.unknown() },
    next: () => [],
  }),
);
