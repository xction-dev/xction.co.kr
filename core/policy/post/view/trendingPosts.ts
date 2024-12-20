import { PostTrending } from "@core/entity/post/trending";
import { ViewPolicy } from "@policy-maker-2/core";

export const VPTrendingPosts = ViewPolicy((page: number) => ({
  key: { name: "posts", page },
  model: PostTrending.array(),
}));
