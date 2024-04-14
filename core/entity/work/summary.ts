import { Work } from ".";

export const WorkSummary = Work.pick({
  id: true,
  title: true,
  tags: true,
  thumbnailImage: true,
});
export type WorkSummary = typeof WorkSummary;
