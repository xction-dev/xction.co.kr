import { PublicId } from "../../utility/Id";
import { TimeNodeEntity } from "../timeMap/TimeNode";
import { UserEntity } from "../user";

export type CommentEntity = {
  id: PublicId;
  writerId: UserEntity["id"];
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNodeEntity["id"];
};
