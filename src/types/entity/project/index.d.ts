import { TimeMapEntity } from "../timeMap";
import { UserEntity } from "../user";

export type ProjectEntity = {
  id: PublicId;
  creator: UserEntity;
  metadata: {
    title: string;
    description: string;
    createdDate: string;
  };
  timeMap: TimeMapEntity;
};
