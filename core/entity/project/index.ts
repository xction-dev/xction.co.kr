import { TimeMapEntity } from "../timeMap";
import { UserEntity } from "../user";
import { PublicId } from "../../utility/Id";

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
