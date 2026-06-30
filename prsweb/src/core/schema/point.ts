import { z } from "zod";

export const updateMenteePointSchema = z.object({
  point: z.number().int().min(0),
});

export type UpdateMenteePointInput = z.infer<typeof updateMenteePointSchema>;
