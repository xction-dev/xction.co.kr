import { z } from "zod";

export const USER_TEXT = {
  NAME: z.string().min(1).max(30),
  BIO: z.string().max(500),
};
