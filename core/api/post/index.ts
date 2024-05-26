import { Paginated } from "../util";
import { PostComment } from "@core/entity/comment/post";
import {
  GetPostsQueryDto,
  PostDto,
  PostPostBodyDto,
  PostPostCommentBodyDto,
} from "./dto";
import { createApi } from "..";
import { PostMapper } from "./map";

const getPosts = createApi({
  method: "get",
  params: {},
  endpoint: () => [`/posts`, ``],
  query: GetPostsQueryDto.partial().parse,
  dto: Paginated(PostDto).parse,
});

const getPost = createApi({
  method: "get",
  params: { postId: "number" },
  endpoint: ({ postId }) => [`/posts`, `/${postId}`],
  dto: PostDto.parse,
  map: PostMapper.toEntity,
});

const getPostComments = createApi({
  method: "get",
  params: { postId: "number" },
  endpoint: ({ postId }) => [`/posts`, `/${postId}/comments`],
  dto: Paginated(PostComment).parse,
});

const postPost = createApi({
  method: "post",
  params: {},
  endpoint: () => [`/posts`, ``],
  body: PostPostBodyDto.parse,
  dto: PostDto.parse,
});

const postPostComment = createApi({
  method: "post",
  params: { postId: "number" },
  endpoint: ({ postId }) => [`/posts`, `/${postId}/comments`],
  body: PostPostCommentBodyDto.parse,
  dto: PostComment.parse,
});

export const PostApi = {
  // get
  getPosts,
  getPost,
  getPostComments,

  // post
  postPost,
  postPostComment,
};
