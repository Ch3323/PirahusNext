import { AdmissionYearRepository } from "@/src/repositories/admission-year.repository";
import { NotFoundError } from "@/src/core/error/error";
import { IAdmissionYearRepository } from "@/src/core/ports/server/admission-year.repository.port";

export class AdmissionYearService {
  constructor(
    private readonly admissionYearRepo: IAdmissionYearRepository = new AdmissionYearRepository(),
  ) {}

  async get() {
    return this.admissionYearRepo.findFirst();
  }

  async create(mentorYear: string, menteeYear: string) {
    const existing = await this.admissionYearRepo.findFirst();
    if (existing) throw new Error("Setting already exists");
    return this.admissionYearRepo.create(mentorYear, menteeYear);
  }

  async update(data: { mentorYear?: string; menteeYear?: string }) {
    const setting = await this.admissionYearRepo.findFirst();
    if (!setting) throw new NotFoundError("Setting not found");
    return this.admissionYearRepo.update(setting.id, data);
  }
}
