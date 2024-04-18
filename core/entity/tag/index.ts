import { ID } from "@core/constant/common/id";
import { z } from "zod";

/**
 * @entity Tag
 * @description 태그입니다. 아직 데이터타입이 확실하지 않아 임시로 만들어 두었습니다.
 */
export const Tag = z.object({
  id: ID.TAG,
  name: z.string(),
  color: z.string().nullable(),
});
export type Tag = z.infer<typeof Tag>;
