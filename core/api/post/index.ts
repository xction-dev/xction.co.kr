import { Paginated, api, parseQuery } from "../util";
import { Post } from "@core/entity/post";
import { ID } from "@core/constant/common/id";
import { PostComment } from "@core/entity/comment/post";
import { GetPostsQueryDto, PostDto } from "./dto";

const getPosts = {
  server: { endpoint: "", query: GetPostsQueryDto.parse },
  client: (config?: GetPostsQueryDto) =>
    api.get<Paginated<PostDto>>(`/posts${parseQuery(config)}`),
  // .then(({ items, maxPageNumber }) => ({
  //   items: items.map(PostMapper.toEntity),
  //   maxPageNumber,
  // })),
};

const getPost = (postId: ID["POST"]) =>
  api.get(`/posts/${postId}`).then(Post.parse);

const getPostComments = (postId: ID["POST"]) =>
  api.get(`/posts/${postId}/comments`).then(Paginated(PostComment).parse);

export const PostApi = { getPosts, getPost, getPostComments };
