import { z } from "zod";

export const TAG_TEXT = {
  NAME: z.string().min(1),
};
