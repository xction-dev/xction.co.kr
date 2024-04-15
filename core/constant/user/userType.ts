import { z } from "zod";

export const USER_TYPE = z.enum(["ADMIN", "USER"]);
export type USER_TYPE = z.infer<typeof USER_TYPE>;
