import { Mentor, Mentee } from "@/prisma/generated/client";

export interface IProfileRepository {
  updateMentorNickname(studentId: string, nickname: string): Promise<Mentor>;
  updateMenteeNickname(studentId: string, nickname: string): Promise<Mentee>;
}
