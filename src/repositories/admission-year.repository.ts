import { prisma } from "@/src/lib/prisma";

export class AdmissionYearRepository {
  async findFirst() {
    return prisma.admissionYear.findFirst();
  }

  async create(mentorYear: string, menteeYear: string) {
    return prisma.admissionYear.create({ data: { mentorYear, menteeYear } });
  }

  async update(id: string, data: { mentorYear?: string; menteeYear?: string }) {
    return prisma.admissionYear.update({ where: { id }, data });
  }
}
