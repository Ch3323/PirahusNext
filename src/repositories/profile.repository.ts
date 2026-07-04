import { prisma } from "@/src/lib/prisma";
import { Mentor, Mentee } from "@/prisma/generated/client";

import { IProfileRepository } from "@/src/core/ports/server/profile.repository.port";

export class ProfileRepository implements IProfileRepository {
  async updateMentorNickname(studentId: string, nickname: string): Promise<Mentor> {
    return prisma.mentor.update({ where: { studentId }, data: { nickname } });
  }

  async updateMenteeNickname(studentId: string, nickname: string): Promise<Mentee> {
    return prisma.mentee.update({ where: { studentId }, data: { nickname } });
  }
}
