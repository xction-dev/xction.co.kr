import { Post } from ".";
import { WorkSummary } from "../work/summary";

export const OneLineReviewPost = Post.extend({
  work: WorkSummary,
});
