import { parseSchema } from "@/src/lib/validation";
import {
  CreateAdmissionYearSchema,
  UpdateAdmissionYearSchema,
} from "../schema/setting";
import { CreateAdmissionYear, UpdateAdmissionYear } from "../domain/setting";
import { ISettingRepository } from "../ports/setting.repository";

export class SettingService {
  constructor(private settingRepository: ISettingRepository) {}

  async createAdmissionYear(data: CreateAdmissionYear) {
    const parsedData = parseSchema(CreateAdmissionYearSchema, data);
    return await this.settingRepository.createAdmissionYear(parsedData);
  }
  async updateAdmissionYear(data: UpdateAdmissionYear) {
    const parsedData = parseSchema(UpdateAdmissionYearSchema, data);
    return await this.settingRepository.updateAdmissionYear(parsedData);
  }
  async getAdmissionYear() {
    return await this.settingRepository.getAdmissionYear();
  }
}
