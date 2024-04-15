import { Work } from ".";

/**
 * @entity Work
 * @description 작품의 요약 정보입니다.
 */
export const WorkSummary = Work.pick({
  id: true,
  title: true,
  tags: true,
  thumbnailImage: true,
});
export type WorkSummary = typeof WorkSummary;
