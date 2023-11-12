import Comment from "../../entity/comment/index";

export type CommentService = {
  currentComments: Comment[];
  writeComment: (content: Comment["content"], isSpoiler: boolean) => void;
  fixComment: (
    commentId: Comment["id"],
    content: Comment["content"],
    isSpolier: boolean,
  ) => void;
  deleteComment: (commentId: Comment["id"]) => void;
  reportComment: (commentId: Comment["id"]) => void;
};
