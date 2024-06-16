import { ID } from "@core/constant/common/id";
import { POST_TEXT } from "@core/constant/post/text";
import { PostComment } from "@core/entity/comment/post";
import { IntentPolicy } from "@policy-maker-2/core";
import { z } from "zod";

const input = z.object({
  content: POST_TEXT.COMMENT_CONTENT,
});

export const IPWritePostComment = IntentPolicy((postId: ID["POST"]) => ({
  key: { name: "writePost", postId },
  model: { input, output: PostComment },
  next: () => [],
}));
