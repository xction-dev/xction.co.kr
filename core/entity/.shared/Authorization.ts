type PlainEmail = {
  type: ["plain", "email"];
  email: string; // must be a valid email address
  password: string; // must be longer than 8 characters, and shorter than 32 characters
};

/**
 * TODO: 소셜 로그인 Authorization 타입 추가
 */

export type Authorization = PlainEmail;
