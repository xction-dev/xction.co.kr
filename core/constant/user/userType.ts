import { z } from "zod";

export const USER_TYPE = z.enum(["ADMIN", "USER"]);
