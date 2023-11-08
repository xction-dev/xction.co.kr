import { SampleProjectEntity } from "@/types/entity/sample/project";

export type GetSampleProjectResponseDto = {
  id: SampleProjectEntity["id"];
  title: SampleProjectEntity["title"];
  src: SampleProjectEntity["src"];
};
