import { TimeNode } from "./TimeNode";

export type TimeMapEntity = {
  type: "tree";
  root: TimeNode;
  leaves: TimeNode[];
};
