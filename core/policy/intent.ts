import { IPLikePost } from "./post/intent/likePost";
import { IPLikePostComment } from "./post/intent/likePostComment";
import { IPWritePost } from "./post/intent/writePost";
import { IPWritePostComment } from "./post/intent/writePostComment";

export const intentPolicy = {
  post: {
    writePost: IPWritePost,
    writePostComment: IPWritePostComment,
    likePost: IPLikePost,
    likePostComment: IPLikePostComment,
  },
};
