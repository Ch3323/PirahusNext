import { ApiResponse } from "@/src/core/interface/response";
import { UpdateProfileRequest, UpdateProfileResponse } from "@/src/core/domain/profile";

export interface IProfileClientRepository {
  updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UpdateProfileResponse>>;
}
