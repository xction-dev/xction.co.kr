import { TimeMapEntity } from "../timeMap";
import { UserEntity } from "../user";
import { PublicId } from "../.shared/Id";

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
