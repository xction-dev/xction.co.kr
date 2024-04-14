import { ID } from "@core/constant/common/id";
import { z } from "zod";
import { Creatable } from "../utility/creatable";
import { Tag } from "../tag";

export const Post = z
  .object({
    id: ID.POST,
    title: z.string().min(1).max(100),
    content: z.string().min(1),
    tags: Tag.array(),
  })
  .extend(Creatable.shape);
