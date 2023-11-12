import { PublicId } from "../.shared/Id";
import { TimeNodeEntity } from "../timeMap/TimeNode";
import { UserEntity } from "../user";

export type Comment = {
  id: PublicId;
  creatorId: UserEntity["id"];
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNodeEntity["id"];
};
