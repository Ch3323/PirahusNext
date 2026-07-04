import { prisma } from "@/src/lib/prisma";
import { IAdmissionYearRepository } from "@/src/core/ports/server/admission-year.repository.port";

export class AdmissionYearRepository implements IAdmissionYearRepository {
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
