import { z } from "zod";

export const USER_PASSWORD = z.string().min(8).max(45);
