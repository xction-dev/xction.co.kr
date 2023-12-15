import { z } from "zod";

/**
 * Plain Email
 */

/**
 * @description 이메일을 식별자로 이용하는 플랫폼 자체 로그인 형식입니다.
 */
const PlainEmail = z.object({
  type: z.enum(["plain", "email"]),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
type PlainEmail = z.infer<typeof PlainEmail>;

/**
 * TODO: 소셜 로그인 Authorization 타입 추가
 */

export const Authorization = {
  PlainEmail,
};
export type Authorization = {
  PlainEmail: PlainEmail;
};
