import { z } from "zod";
import { CommentDto } from "../Comment/index";

/**
 * GET: "comment/:projectId/:timeNodeId"
 * request body is empty
 *
 * @description 특정 프로젝트 - 특정 타임노드에 달린 댓글들을 가져옵니다.
 */
export const GetCommentEndpoint = (projectId: number, timeNodeId: number) => `
  comment/${projectId}/${timeNodeId}
`;
export const GetCommentResponseDto = z.object({
  items: z.array(CommentDto),
});
export type GetCommentResponseDto = z.infer<typeof GetCommentResponseDto>;

/**
 * POST "comment/:projectId/:timeNodeId"
 * response body is empty
 */
export const PostCommentEndpoint = (projectId: number, timeNodeId: number) => `
  comment/${projectId}/${timeNodeId}
`;
export const PostCommentRequestDto = z.object({
  content: z.string(),
  isSpoiler: z.boolean(),
});
export type PostCommentRequestDto = z.infer<typeof PostCommentRequestDto>;

/**
 * PATCH "comment/:commentId"
 * response body is empty
 *
 * !Not Implemented
 */
export const PatchCommentEndpoint = (commentId: number) => `
  comment/${commentId}
`;
export const PatchCommentRequestDto = z.object({
  content: z.string(),
  isSpoiler: z.boolean(),
});
export type PatchCommentRequestDto = z.infer<typeof PostCommentRequestDto>;

/**
 * POST "comment/:commentId/report"
 * response body is empty
 *
 * !Not Implemented
 */
export const PostCommentReportRequestDto = z.object({});
export type PostCommentReportRequestDto = z.infer<
  typeof PostCommentReportRequestDto
>;

/**
 * DELETE "comment/:projectId/:commentId"
 * request body is empty
 * response body is empty
 *
 * !Not Implemented
 */
