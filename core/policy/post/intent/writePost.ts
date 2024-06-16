import { ID } from "@core/constant/common/id";
import { POST_TYPE } from "@core/constant/post/postType";
import { POST_TEXT } from "@core/constant/post/text";
import { Post } from "@core/entity/post";
import { IntentPolicy } from "@policy-maker-2/core";
import { z } from "zod";

const input = z.object({
  type: POST_TYPE,
  title: POST_TEXT.TITLE,
  content: POST_TEXT.CONTENT,
});

export const IPWritePost = IntentPolicy((postId: ID["POST"]) => ({
  key: { name: "writePost", postId },
  model: { input, output: Post },
  next: () => [],
}));
