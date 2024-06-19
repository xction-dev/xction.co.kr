import { z } from "zod";

export const USER_EMAIL = z.string().email().max(255);
