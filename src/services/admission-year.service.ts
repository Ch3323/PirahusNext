import { AdmissionYearRepository } from "@/src/repositories/admission-year.repository";
import { NotFoundError } from "@/src/core/error/error";

const admissionYearRepo = new AdmissionYearRepository();

export class AdmissionYearService {
  async get() {
    return admissionYearRepo.findFirst();
  }

  async create(mentorYear: string, menteeYear: string) {
    const existing = await admissionYearRepo.findFirst();
    if (existing) throw new Error("Setting already exists");
    return admissionYearRepo.create(mentorYear, menteeYear);
  }

  async update(data: { mentorYear?: string; menteeYear?: string }) {
    const setting = await admissionYearRepo.findFirst();
    if (!setting) throw new NotFoundError("Setting not found");
    return admissionYearRepo.update(setting.id, data);
  }
}
