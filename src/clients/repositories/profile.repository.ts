import { ApiResponse } from "@/src/core/interface/response";
import { UpdateProfileRequest, UpdateProfileResponse } from "@/src/core/domain/profile";
import httpClient from "@/src/lib/http";

import { IProfileClientRepository } from "@/src/core/ports/client/profile.repository.port";

export class ProfileClientRepository implements IProfileClientRepository {
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UpdateProfileResponse>> {
    return httpClient.put<UpdateProfileResponse>("/api/profile", data);
  }
}
