import { z } from "zod";

export const addMenteePointSchema = z.object({
  point: z.number().int(),
});

export type AddMenteePointInput = z.infer<typeof addMenteePointSchema>;

export const addMentorPointSchema = z.object({
  point: z.number().int(),
});

export type AddMentorPointInput = z.infer<typeof addMentorPointSchema>;

export const setPointSchema = z.object({
  point: z.number().int().min(0),
});

export type SetPointInput = z.infer<typeof setPointSchema>;
