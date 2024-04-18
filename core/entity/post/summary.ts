import { Post } from ".";

export const PostSummary = Post.pick({
  id: true,
  title: true,
  content: true,
  createdUser: true,
});
export type PostSummary = typeof PostSummary;
