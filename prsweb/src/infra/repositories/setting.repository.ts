import { ApiResponse } from "../interface/response";
import httpClient from "@/src/lib/http";
import { ISettingRepository } from "@/src/core/ports/setting.repository";
import {
  IAdmissionYear,
  CreateAdmissionYear,
  UpdateAdmissionYear,
} from "@/src/core/domain/setting";

export class SettingRepository implements ISettingRepository {
  async getAdmissionYear(): Promise<ApiResponse<IAdmissionYear>> {
    return await httpClient.get("/setting/admission-year");
  }
  async createAdmissionYear(
    data: CreateAdmissionYear,
  ): Promise<ApiResponse<IAdmissionYear>> {
    return await httpClient.post("/setting/admission-year", data);
  }
  async updateAdmissionYear(
    data: UpdateAdmissionYear,
  ): Promise<ApiResponse<IAdmissionYear>> {
    return await httpClient.put("/setting/admission-year", data);
  }
}
