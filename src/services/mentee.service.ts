import { MenteeRepository, MenteeWithRelations } from "@/src/repositories/mentee.repository";
import { ICreateMentee, IMentee } from "@/src/core/domain/mentee";
import { IMentor } from "@/src/core/domain/mentor";
import { NotFoundError, ForbiddenError } from "@/src/core/error/error";

function mapToDomainMentee(mentee: MenteeWithRelations): IMentee {
  if (!mentee.mentor) {
    throw new Error("Mentor is required");
  }

  const mappedMentor: IMentor = {
    id: mentee.mentor.id,
    studentId: mentee.mentor.studentId,
    nickname: mentee.mentor.nickname,
    point: mentee.mentor.point,
    isAdmin: mentee.mentor.isAdmin,
    unlockedCosmetics: mentee.mentor.unlockedCosmetics,
    equippedEffect: mentee.mentor.equippedEffect,
    createdAt: mentee.mentor.createdAt,
    updatedAt: mentee.mentor.updatedAt,
    hints: mentee.mentor.hints,
    mentee: null,
  };

  const mappedMentee: IMentee = {
    id: mentee.id,
    studentId: mentee.studentId,
    nickname: mentee.nickname,
    point: mentee.point,
    unlockedHintLevels: mentee.unlockedHintLevels,
    unlockedCosmetics: mentee.unlockedCosmetics,
    equippedEffect: mentee.equippedEffect,
    createdAt: mentee.createdAt,
    updatedAt: mentee.updatedAt,
    mentorId: mentee.mentorId,
    mentor: mappedMentor,
  };

  mappedMentor.mentee = mappedMentee;
  
  return mappedMentee;
}

const menteeRepo = new MenteeRepository();

export class MenteeService {
  async createMentee(data: ICreateMentee): Promise<IMentee> {
    const mentee = await menteeRepo.createMentee(data);
    return mapToDomainMentee(mentee);
  }

  async createMany(data: ICreateMentee[]): Promise<IMentee[]> {
    const mentees = await menteeRepo.createMany(data);
    return mentees.map(mapToDomainMentee);
  }

  async findAll(): Promise<IMentee[]> {
    const mentees = await menteeRepo.findAll();
    return mentees.map(mapToDomainMentee);
  }

  async findById(id: string): Promise<IMentee> {
    const mentee = await menteeRepo.findById(id);
    if (!mentee) throw new NotFoundError("Mentee not found");
    return mapToDomainMentee(mentee);
  }

  async delete(id: string): Promise<IMentee> {
    const mentee = await menteeRepo.delete(id);
    return mapToDomainMentee(mentee);
  }

  async getPoint(id: string): Promise<number> {
    const mentee = await menteeRepo.getPoint(id);
    if (!mentee) throw new NotFoundError("Mentee not found");
    return mentee.point;
  }

  async addPoint(id: string, point: number, sessionStudentId?: string, sessionRole?: string): Promise<number> {
    if (sessionRole === "mentee" && sessionStudentId) {
      const mentee = await menteeRepo.findByStudentId(sessionStudentId);
      if (!mentee || (mentee.id !== id && mentee.studentId !== id)) {
        throw new ForbiddenError("You can only modify your own points");
      }
    }
    const updated = await menteeRepo.addPoint(id, point);
    if (!updated) throw new NotFoundError("Mentee not found");
    return updated.point;
  }
}
