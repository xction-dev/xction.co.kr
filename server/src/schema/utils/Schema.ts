import { ZodObject, z } from "zod";

export type Schema<T extends Record<string, unknown>> = ZodObject<{
  [K in keyof T | "createdUserId"]: z.ZodType<T[K]>;
}>;

export type SchemaRaw<T extends Record<string, unknown>> = ZodObject<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

// const Sample = z.object({
//   id: z.number(),
//   name: z.string().nullish().default(""),
//   createdUserId: z.number().nullable(),
// });
// type Sample = typeof Sample;
// type TSample = z.input<typeof Sample>;

// const a: Schema<TSample> = Sample;

// console.log(a);
