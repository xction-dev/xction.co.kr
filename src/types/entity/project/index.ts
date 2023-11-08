import { TimeMapEntity } from "../timeMap";
import { UserEntity } from "../user";

export type ProjectEntity = {
  id: number;
  title: string;
  description: string;
  timeMap: TimeMapEntity;
  creator: UserEntity;
};
