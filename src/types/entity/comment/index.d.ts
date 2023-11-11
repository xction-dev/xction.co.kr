import { TimeNode } from "../timeMap/TimeNode";
import { PublicId } from "./.shared/Id";

export type Comment = {
  id: PublicId;
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNode["id"];
};
