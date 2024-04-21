import { z } from "zod";
import { Post } from ".";

export const PostTrending = Post.pick({
  id: true,
  title: true,
  tags: true,
  viewsCount: true,
  createdTime: true,
});

export type PostTrending = z.infer<typeof Post>;
