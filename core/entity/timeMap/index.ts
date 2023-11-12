import { TimeNodeEntity } from "./TimeNode";

export type TimeMapEntity = {
  type: "tree";
  root: TimeNodeEntity;
  leaves: TimeNodeEntity[];
};
