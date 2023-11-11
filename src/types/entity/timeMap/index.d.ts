export type TimeMapEntity = {
  type: "tree";
  root: TimeNode;
  leaves: TimeNode[];
};

type Transition = unknown;
