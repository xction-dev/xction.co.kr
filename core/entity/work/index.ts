import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";
import { PostSummary } from "../post/summary";
import { ArticleSummary } from "../article/summary";

/**
 * @entity Work
 * @description 작품입니다.
 */
export const Work = z
  .object({
    id: ID.WORK,
    title: z.string().min(1).max(100),
    description: z.string().nullable(),
    tags: z.unknown().array(),
    credit: z.record(z.string().array()).nullable(),

    // image
    thumbnailImage: z.string().nullable(),
    backgroundImage: z.string().nullable(),

    // detail
    runningTime: z.number().nullable(),
    genre: z.string().nullable(),
    platform: z.string().nullable(),

    // related
    oneLineReviews: PostSummary.array(),
    relatedArticles: ArticleSummary.array(),
  })
  .extend(Creatable.shape);
export type Work = z.infer<typeof Work>;
