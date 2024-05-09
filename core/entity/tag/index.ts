import { ID } from "@core/constant/common/id";
import { TAG_TYPE } from "@core/constant/tag/tagType";
import { TAG_TEXT } from "@core/constant/tag/text";
import { z } from "zod";

/**
 * @entity Tag
 * @description 태그입니다. 아직 데이터타입이 확실하지 않아 임시로 만들어 두었습니다.
 */
export const Tag = z.object({
  id: ID.TAG,
  type: TAG_TYPE.nullish(),
  name: TAG_TEXT.NAME,
});
export type Tag = z.infer<typeof Tag>;
