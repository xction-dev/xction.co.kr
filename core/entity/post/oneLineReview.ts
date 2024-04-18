import { Post } from ".";
import { WorkSummary } from "../work/summary";

/**
 * @entity OneLineReviewPost
 * @description 한줄평 포스트입니다.
 */
export const OneLineReviewPost = Post.extend({
  work: WorkSummary,
});
export type OneLineReviewPost = typeof OneLineReviewPost;
