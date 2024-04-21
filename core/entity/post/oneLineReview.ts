import { POST_TYPE } from "@core/constant/post/postType";
import { Post } from ".";
import { WorkSummary } from "../work/summary";
import { z } from "zod";

/**
 * @entity OneLineReviewPost
 * @description 한줄평 포스트입니다.
 */
export const OneLineReviewPost = Post.omit({ postType: true }).extend({
  work: WorkSummary,
  postType: z.literal(POST_TYPE.Enum.ONE_LINE_REVIEW),
});
export type OneLineReviewPost = typeof OneLineReviewPost;
