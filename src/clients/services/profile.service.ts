import { ProfileClientRepository } from "../repositories/profile.repository";
import { parseSchema } from "@/src/lib/validation";
import { updateProfileSchema } from "@/src/core/schema/profile";
import { UpdateProfileRequest, UpdateProfileResponse } from "@/src/core/domain/profile";

export class ProfileService {
  constructor(private readonly profileRepository: ProfileClientRepository) {}

  async updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    try {
      const parsedData = parseSchema(updateProfileSchema, data);
      const response = await this.profileRepository.updateProfile(parsedData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
