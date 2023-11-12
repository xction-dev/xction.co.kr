import { CommentEntity } from "@core/entity/comment";
import { UserEntity } from "@core/entity/user";

/**
 * GET "comment/:projectId"
 */

export type GetCommentResponseDto = {
  id: CommentEntity["id"];
  writer: Pick<UserEntity, "id" | "name">;
  content: CommentEntity["content"];
  isSpoiler: CommentEntity["isSpoiler"];
}[];

/**
 * POST "comment/:projectId"
 * response body is empty
 */

export type PostCommentRequestDto = {
  content: CommentEntity["content"];
  isSpoiler: CommentEntity["isSpoiler"];
};

/**
 * PATCH "comment/:projectId/:commentId"
 * response body is empty
 */
export type PatchCommentRequestDto = Partial<{
  content: CommentEntity["content"];
  isSpoiler: CommentEntity["isSpoiler"];
}>;

/**
 * DELETE "comment/:projectId/:commentId"
 * request body is empty
 * response body is empty
 */
