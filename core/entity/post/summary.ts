import { Post } from ".";

export const PostSummary = Post.pick({
  id: true,
  title: true,
  content: true,
  createdUser: true,
  createdTime: true,
  lastModifiedTime: true,
});
export type PostSummary = typeof PostSummary;
