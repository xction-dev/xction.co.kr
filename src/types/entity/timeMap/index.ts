export type TimeMapEntity = {
  type: "tree";
  root: Node;
  leaves: Node[];
};

type Node = {
  id: string;
  videoSrc: string;
  edges: Edge[];
  isLast: boolean;
};

type Edge = {
  from: Node;
  to: Node;
  transition: Transition;
};

type Transition = unknown;
