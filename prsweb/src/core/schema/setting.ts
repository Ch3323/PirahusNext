import { z } from "zod";

export const CreateAdmissionYearSchema = z.object({
  mentorYear: z.number(),
  menteeYear: z.number(),
});

export const UpdateAdmissionYearSchema = z.object({
  mentorYear: z.number(),
  menteeYear: z.number(),
});
