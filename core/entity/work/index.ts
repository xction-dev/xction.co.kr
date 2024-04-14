import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";

export const Work = z
  .object({
    id: ID.WORK,
    title: z.string().min(1).max(100),
    description: z.string().nullable(),
    tags: z.unknown().array(),
    credit: z.record(z.string().array()).nullable(),
    thumbnailImage: z.string().nullable(),
    oneLineReviews: z.unknown().array(),
    relatedArticles: z.unknown().array(),
  })
  .extend(Creatable.shape);
export type Work = z.infer<typeof Work>;
