import { ProfileRepository } from "@/src/repositories/profile.repository";
import { Role } from "@/src/core/domain/auth";

const profileRepo = new ProfileRepository();

export class ProfileService {
  async updateNickname(
    studentId: string,
    role: Role,
    nickname: string
  ): Promise<{ message: string }> {
    if (role === "admin" || role === "mentor") {
      await profileRepo.updateMentorNickname(studentId, nickname);
    } else {
      const lastThree = studentId.slice(-3);
      const formattedNickname = `${lastThree} ${nickname}`;
      await profileRepo.updateMenteeNickname(studentId, formattedNickname);
    }
    return { message: "Profile updated successfully" };
  }
}
