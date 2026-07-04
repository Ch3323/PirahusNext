import httpClient from "@/src/lib/http";
import { IAdmissionYear, CreateAdmissionYear, UpdateAdmissionYear } from "@/src/core/domain/admission-year";
import { ApiResponse } from "@/src/core/interface/response";

export class AdmissionYearClientRepository {
  async getAdmissionYear(): Promise<ApiResponse<IAdmissionYear>> {
    return httpClient.get<IAdmissionYear>("/api/admission-year");
  }

  async createAdmissionYear(
    data: CreateAdmissionYear
  ): Promise<ApiResponse<IAdmissionYear>> {
    return httpClient.post<IAdmissionYear>("/api/admission-year", data);
  }

  async updateAdmissionYear(
    data: UpdateAdmissionYear
  ): Promise<ApiResponse<IAdmissionYear>> {
    return httpClient.patch<IAdmissionYear>("/api/admission-year", data);
  }
}
