import { ProjectEntity } from "@core/entity/project";
import { TimeNodeEntity } from "@core/entity/timeMap/TimeNode";

export type PlayProjectService = {
  project: ProjectEntity;
  currentTimeNode: TimeNodeEntity;
  playNextTimeNode: (nextTimeNode: TimeNodeEntity) => void;
  playFromStart: () => void;
  playFromSpecificTimeNode: (timeNode: TimeNodeEntity) => void;
  savePlayHistory: (timeNode: TimeNodeEntity) => void;
  loadPlayHistory: () => void;
};
