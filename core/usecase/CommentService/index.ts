import { Comment } from "@core/entity/comment";

export type CommentService<
  ReadCommentResponseInterface extends Pick<Comment, "content" | "isSpoiler">,
  WriteCommentRequestInterface extends Pick<Comment, "content" | "isSpoiler">,
> = {
  currentComments: ReadCommentResponseInterface[];
  writeComment: (body: WriteCommentRequestInterface) => void;
  fixComment: (
    commentId: Comment["id"],
    body: WriteCommentRequestInterface,
  ) => void;
  deleteComment: (commentId: Comment["id"]) => void;
  reportComment: (commentId: Comment["id"]) => void;
};
