import { z } from "zod";

export const CommentNormalRepository = z.object({
  _id: z.unknown(),
  type: z.literal("COMMENT"),
  id: z.number().int(),
  projectId: z.number().int(),
  writerId: z.number().int(),
  content: z.string(),
  isSpoiler: z.boolean(),
  parentTimeNodeId: z.number().int(),
  createTime: z.date(),
});
export type CommentNormalRepository = z.infer<typeof CommentNormalRepository>;

export const CommentReplyRepository = z.object({
  _id: z.unknown(),
  type: z.literal("REPLY"),
  id: z.number().int(),
  projectId: z.number().int(),
  writerId: z.number().int(),
  content: z.string(),
  isSpoiler: z.boolean(),
  parentTimeNodeId: z.number().int(),
  parentCommentId: z.number().int(),
  createTime: z.date(),
});
export type CommentReplyRepository = z.infer<typeof CommentReplyRepository>;

export const CommentRepository = z.discriminatedUnion("type", [
  CommentNormalRepository,
  CommentReplyRepository,
]);
export type CommentRepository = z.infer<typeof CommentRepository>;
