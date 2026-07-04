import { MentorRepository, MentorWithRelations } from "@/src/repositories/mentor.repository";
import { ICreateMentor, IMentor } from "@/src/core/domain/mentor";
import { IMentee } from "@/src/core/domain/mentee";
import { NotFoundError, ForbiddenError } from "@/src/core/error/error";

function mapToDomainMentor(mentor: MentorWithRelations): IMentor {
  const mappedMentor: IMentor = {
    id: mentor.id,
    studentId: mentor.studentId,
    nickname: mentor.nickname,
    point: mentor.point,
    isAdmin: mentor.isAdmin,
    unlockedCosmetics: mentor.unlockedCosmetics,
    equippedEffect: mentor.equippedEffect,
    createdAt: mentor.createdAt,
    updatedAt: mentor.updatedAt,
    hints: mentor.hints,
    mentee: null,
  };

  if (mentor.mentee) {
    const mappedMentee: IMentee = {
      id: mentor.mentee.id,
      studentId: mentor.mentee.studentId,
      nickname: mentor.mentee.nickname,
      point: mentor.mentee.point,
      unlockedHintLevels: mentor.mentee.unlockedHintLevels,
      unlockedCosmetics: mentor.mentee.unlockedCosmetics,
      equippedEffect: mentor.mentee.equippedEffect,
      createdAt: mentor.mentee.createdAt,
      updatedAt: mentor.mentee.updatedAt,
      mentorId: mentor.id,
      mentor: mappedMentor,
    };
    mappedMentor.mentee = mappedMentee;
  }

  return mappedMentor;
}

const mentorRepo = new MentorRepository();

export class MentorService {
  async createMentor(data: ICreateMentor): Promise<IMentor> {
    const mentor = await mentorRepo.createMentor(data);
    return mapToDomainMentor(mentor);
  }

  async createMany(data: ICreateMentor[]): Promise<IMentor[]> {
    const mentors = await mentorRepo.createMany(data);
    return mentors.map(mapToDomainMentor);
  }

  async findAll(): Promise<IMentor[]> {
    const mentors = await mentorRepo.findAll();
    return mentors.map(mapToDomainMentor);
  }

  async findById(id: string): Promise<IMentor> {
    const mentor = await mentorRepo.findById(id);
    if (!mentor) throw new NotFoundError("Mentor not found");
    return mapToDomainMentor(mentor);
  }

  async update(id: string, data: { studentId?: string }): Promise<IMentor> {
    const mentor = await mentorRepo.update(id, data);
    return mapToDomainMentor(mentor);
  }

  async setAdminRole(id: string, isAdmin: boolean): Promise<IMentor> {
    const mentor = await mentorRepo.setAdminRole(id, isAdmin);
    return mapToDomainMentor(mentor);
  }

  async delete(id: string): Promise<IMentor> {
    const mentor = await mentorRepo.delete(id);
    return mapToDomainMentor(mentor);
  }

  async getPoint(id: string): Promise<number> {
    const mentor = await mentorRepo.getPoint(id);
    if (!mentor) throw new NotFoundError("Mentor not found");
    return mentor.point;
  }

  async addPoint(id: string, point: number, sessionStudentId?: string, sessionRole?: string): Promise<number> {
    if (sessionRole === "mentor" && sessionStudentId) {
      const mentor = await mentorRepo.findByStudentId(sessionStudentId);
      if (!mentor || (mentor.id !== id && mentor.studentId !== id)) {
        throw new ForbiddenError("You can only modify your own points");
      }
    }
    const updated = await mentorRepo.addPoint(id, point);
    if (!updated) throw new NotFoundError("Mentor not found");
    return updated.point;
  }
}
