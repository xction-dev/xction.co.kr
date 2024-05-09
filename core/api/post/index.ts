import { z } from "zod";
import { Paginated, api, parseConfig } from "../util";
import { Post } from "@core/entity/post";
import { ID } from "@core/constant/common/id";
import { GetPostsConfig } from "./payload";
import { PostComment } from "@core/entity/comment/post";

const getPosts = (config: GetPostsConfig) =>
  api.get(`/posts${parseConfig(config)}`).then(Paginated(Post).parse);

const getPost = (postId: ID["POST"]) =>
  api.get(`/posts/${postId}`).then(Post.parse);

const getPostComments = (postId: ID["POST"]) =>
  api.get(`/posts/${postId}/comments`).then(Paginated(PostComment).parse);

export const PostApi = {
  getPosts,
  getPost,
  getPostComments,
};
