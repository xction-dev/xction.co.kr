import { z } from "zod";
import { ID } from "@core/constant/common/id";
import { POST_TEXT } from "@core/constant/post/text";
import { Creatable } from "../utility/creatable";

export const PostSummary = z
  .object({
    id: ID.POST,
    title: POST_TEXT.TITLE,
  })
  .extend(Creatable.shape);

export type PostSummary = typeof PostSummary;
