import { AdmissionYear } from "@/prisma/generated/client";

export interface IAdmissionYearRepository {
  findFirst(): Promise<AdmissionYear | null>;
  create(mentorYear: string, menteeYear: string): Promise<AdmissionYear>;
  update(id: string, data: { mentorYear?: string; menteeYear?: string }): Promise<AdmissionYear>;
}
