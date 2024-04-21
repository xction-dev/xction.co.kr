import { Post } from ".";

export const PostTrending = Post.pick({
  id: true,
  title: true,
  tags: true,
  viewsCount: true,
  createdTime: true,
});

export type PostTrending = typeof PostTrending;
