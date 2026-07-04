import { prisma } from "@/src/lib/prisma";
import { Mentee, Prisma } from "@/prisma/generated/client";
import { ICreateMentee } from "@/src/core/domain/mentee";

export type MenteeWithRelations = Prisma.MenteeGetPayload<{
  include: { mentor: { include: { hints: true } } };
}>;

import { IMenteeRepository } from "@/src/core/ports/server/mentee.repository.port";

export class MenteeRepository implements IMenteeRepository {
  async createMentee(data: ICreateMentee): Promise<MenteeWithRelations> {
    return prisma.mentee.create({
      data: {
        studentId: data.studentId,
        mentorId: data.mentorId,
      },
      include: { mentor: { include: { hints: true } } },
    });
  }

  async createMany(data: ICreateMentee[]): Promise<MenteeWithRelations[]> {
    await prisma.mentee.createMany({ data, skipDuplicates: true });
    const mentees = await prisma.mentee.findMany({ include: { mentor: { include: { hints: true } } } });
    return mentees;
  }

  async findAll(): Promise<MenteeWithRelations[]> {
    return prisma.mentee.findMany({
      include: { mentor: { include: { hints: true } } },
    });
  }

  async findById(id: string): Promise<MenteeWithRelations | null> {
    return prisma.mentee.findUnique({
      where: { id },
      include: { mentor: { include: { hints: true } } },
    });
  }

  async findByStudentId(studentId: string): Promise<Mentee | null> {
    return prisma.mentee.findUnique({ where: { studentId } });
  }

  async update(id: string, data: Partial<Mentee>): Promise<Mentee> {
    return prisma.mentee.update({ where: { id }, data });
  }

  async delete(id: string): Promise<MenteeWithRelations> {
    return prisma.mentee.delete({
      where: { id },
      include: { mentor: { include: { hints: true } } },
    });
  }

  async getPoint(id: string): Promise<Mentee | null> {
    return prisma.mentee.findUnique({ where: { id } });
  }

  async addPoint(id: string, point: number): Promise<Mentee> {
    return prisma.mentee.update({
      where: { id },
      data: { point: { increment: point } },
    });
  }
}
