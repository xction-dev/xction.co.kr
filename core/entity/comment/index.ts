import { PublicId } from "../../utility/Id";
import { TimeNodeEntity } from "../timeMap/TimeNode";
import { UserEntity } from "../user";

export type CommentEntity = {
  type: "COMMENT";
  id: PublicId;
  writerId: UserEntity["id"];
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNodeEntity["id"];
};

export type ReplyEntity = {
  type: "REPLY";
  id: PublicId;
  writerId: UserEntity["id"];
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNodeEntity["id"];
  parentCommentId: CommentEntity["id"];
};
