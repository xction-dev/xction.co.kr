import { Paginated } from "@core/api/util";
import { Post } from "@core/entity/post";
import { ViewPolicy } from "@policy-maker-2/core";

export const VPPosts = ViewPolicy((page: number) => ({
  key: ["posts"],
  model: Paginated(Post),
}));
