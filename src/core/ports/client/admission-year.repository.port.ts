import { ApiResponse } from "@/src/core/interface/response";
import { IAdmissionYear } from "@/src/core/domain/admission-year";

export interface IAdmissionYearClientRepository {
  getAdmissionYear(): Promise<ApiResponse<IAdmissionYear>>;
  createAdmissionYear(data: Partial<IAdmissionYear>): Promise<ApiResponse<IAdmissionYear>>;
  updateAdmissionYear(data: Partial<IAdmissionYear>): Promise<ApiResponse<IAdmissionYear>>;
}
