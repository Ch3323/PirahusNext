import { Role } from "@/src/core/domain/user";
import { MentorRepository } from "@/src/repositories/mentor.repository";
import { MenteeRepository } from "@/src/repositories/mentee.repository";
import { IMentorRepository } from "@/src/core/ports/server/mentor.repository.port";
import { IMenteeRepository } from "@/src/core/ports/server/mentee.repository.port";

export class ProfileService {
  constructor(
    private readonly mentorRepo: IMentorRepository = new MentorRepository(),
    private readonly menteeRepo: IMenteeRepository = new MenteeRepository()
  ) {}

  async updateNickname(
    studentId: string,
    role: Role,
    nickname: string
  ): Promise<{ message: string }> {
    if (role === "admin" || role === "mentor") {
      const mentor = await this.mentorRepo.findByStudentId(studentId);
      if (mentor) {
        await this.mentorRepo.update(mentor.id, { nickname });
      }
    } else {
      const lastThree = studentId.slice(-3);
      const formattedNickname = `${lastThree} ${nickname}`;
      const mentee = await this.menteeRepo.findByStudentId(studentId);
      if (mentee) {
        await this.menteeRepo.update(mentee.id, { nickname: formattedNickname });
      }
    }
    return { message: "Profile updated successfully" };
  }
}
