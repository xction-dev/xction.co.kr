import { z } from "zod";

/**
 * Public Id
 */

/**
 * @description 사용자에게 공개되는 Id로, 생성 순서에 따라 0부터 순차적으로 매겨집니다.
 */
export const PublicId = z.number().int().positive();
export type PublicId = z.infer<typeof PublicId>;

/**
 *  Unique Id
 */

/**
 * @description uuid를 사용하여 생성되는 Id로, 생성 순서와 상관없이 랜덤하게 생성됩니다.
 */
export const UniqueId = z.string().uuid();
export type UniqueId = z.infer<typeof UniqueId>;
