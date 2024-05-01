import z from "zod";

export const BasicProjectDto = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  creatorId: z.number().int(), 
  createTime: z.string(), 
  
  //비디오 URL로 넣는 경우
  //videoUrl: z.string().nullable()
});

export type BasicProjectDto = z.infer<typeof BasicProjectDto>;
