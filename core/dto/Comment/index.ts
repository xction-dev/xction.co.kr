import z from "zod";
import { UserDto } from "../User";

export const BasicCommentDto = z.object({
  type: z.literal("COMMENT"),
  id: z.number().int(),
  projectId: z.number().int(),
  writer: UserDto,
  content: z.string(),
  isSpoiler: z.boolean(),
  parentTimeNodeId: z.number().int(),
  createTime: z.string(),
});
export type BasicCommentDto = z.infer<typeof BasicCommentDto>;

export const ReplyCommentDto = z.object({
  type: z.literal("REPLY"),
  id: z.number().int(),
  projectId: z.number().int(),
  writer: UserDto,
  content: z.string(),
  isSpoiler: z.boolean(),
  parentTimeNodeId: z.number().int(),
  parentCommentId: z.number().int(),
  createTime: z.string(),
});
export type ReplyCommentDto = z.infer<typeof ReplyCommentDto>;

export const CommentDto = z.discriminatedUnion("type", [
  BasicCommentDto,
  ReplyCommentDto,
]);
export type CommentDto = z.infer<typeof CommentDto>;
