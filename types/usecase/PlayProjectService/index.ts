import { ProjectEntity } from "../../entity/project";
import { TimeNode } from "../../entity/timeMap/TimeNode";

export type PlayProjectService = {
  project: ProjectEntity;
  currentTimeNode: TimeNode; // ProjectEntity.TimeMap.leaves[0]의 타입
  playNextTimeNode: (nextTimeNode: TimeNode) => void;
  playFromStart: () => void;
  playFromSpecificTimeNode: (timeNode: TimeNode) => void;
  savePlayHistory: (timeNode: TimeNode) => void;
  loadPlayHistory: () => void;
};
