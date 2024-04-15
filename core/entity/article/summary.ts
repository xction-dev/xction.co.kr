import { Article } from ".";

/**
 * @entity ArticleSummary
 * @description 아티클 요약.
 */
export const ArticleSummary = Article.pick({
  id: true,
  title: true,
  tags: true,
  createdUser: true,
  createdAt: true,
  isXcticle: true,
});
export type ArticleSummary = typeof ArticleSummary;
