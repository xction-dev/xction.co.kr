import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";
import { Tag } from "../tag";

/**
 * @entity Article
 * @description 아티클입니다. 아직 임시로 만들어 둔 상태.
 */
export const Article = z
  .object({
    id: ID.ARTICLE,
    title: z.string().min(1).max(100),
    description: z.string().nullable(),
    content: z.string().min(1),
    tags: Tag.array(),
  })
  .extend(Creatable.shape);
export type Article = z.infer<typeof Article>;
