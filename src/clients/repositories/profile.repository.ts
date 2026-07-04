import { ApiResponse } from "@/src/core/interface/response";
import { UpdateProfileRequest, UpdateProfileResponse } from "@/src/core/domain/profile";
import httpClient from "@/src/lib/http";

export class ProfileClientRepository {
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UpdateProfileResponse>> {
    return httpClient.put<UpdateProfileResponse>("/api/profile", data);
  }
}
