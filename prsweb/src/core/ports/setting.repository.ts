import { ApiResponse } from "@/src/infra/interface/response";
import {
  IAdmissionYear,
  CreateAdmissionYear,
  UpdateAdmissionYear,
} from "../domain/setting";

export interface ISettingRepository {
  getAdmissionYear(): Promise<ApiResponse<IAdmissionYear>>;
  createAdmissionYear(
    data: CreateAdmissionYear,
  ): Promise<ApiResponse<IAdmissionYear>>;
  updateAdmissionYear(
    data: UpdateAdmissionYear,
  ): Promise<ApiResponse<IAdmissionYear>>;
}
