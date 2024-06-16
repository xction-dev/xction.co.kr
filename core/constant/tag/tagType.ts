import { z } from "zod";

export const TAG_TYPE = z.enum(["POST_TYPE", "POST_TREND"]);
