import { PublicId } from "../.shared/Id";
import { TimeNode } from "../timeMap/TimeNode";

export type Comment = {
  id: PublicId;
  content: string;
  isSpoiler: boolean;
  parentTimeNodeId: TimeNode["id"];
};
