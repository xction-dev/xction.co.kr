import { CommentEntity } from "@core/entity/comment";

export type CommentService<
  ReadCommentResponseInterface extends Pick<
    CommentEntity,
    "content" | "isSpoiler"
  >,
  WriteCommentRequestInterface extends Pick<
    CommentEntity,
    "content" | "isSpoiler"
  >,
> = {
  currentComments: ReadCommentResponseInterface[];
  writeComment: (body: WriteCommentRequestInterface) => void;
  fixComment: (
    commentId: CommentEntity["id"],
    body: WriteCommentRequestInterface,
  ) => void;
  deleteComment: (commentId: CommentEntity["id"]) => void;
  reportComment: (commentId: CommentEntity["id"]) => void;
};
