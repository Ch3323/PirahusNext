import { MentorRepository } from "@/src/repositories/mentor.repository";
import { ICreateMentor, IMentor } from "@/src/core/domain/mentor";
import { NotFoundError, ForbiddenError } from "@/src/core/error/error";
import { mapToDomainMentor } from "@/src/factories/mentor.factory";
import { IMentorRepository } from "@/src/core/ports/server/mentor.repository.port";



export class MentorService {
  constructor(
    private readonly mentorRepo: IMentorRepository = new MentorRepository()
  ) {}

  async createMentor(data: ICreateMentor): Promise<IMentor> {
    const mentor = await this.mentorRepo.createMentor(data);
    return mapToDomainMentor(mentor);
  }

  async createMany(data: ICreateMentor[]): Promise<IMentor[]> {
    const mentors = await this.mentorRepo.createMany(data);
    return mentors.map(mapToDomainMentor);
  }

  async findAll(): Promise<IMentor[]> {
    const mentors = await this.mentorRepo.findAll();
    return mentors.map(mapToDomainMentor);
  }

  async findById(id: string): Promise<IMentor> {
    const mentor = await this.mentorRepo.findById(id);
    if (!mentor) throw new NotFoundError("Mentor not found");
    return mapToDomainMentor(mentor);
  }

  async update(id: string, data: { studentId?: string }): Promise<IMentor> {
    const mentor = await this.mentorRepo.update(id, data);
    return mapToDomainMentor(mentor);
  }

  async setAdminRole(id: string, isAdmin: boolean): Promise<IMentor> {
    const mentor = await this.mentorRepo.setAdminRole(id, isAdmin);
    return mapToDomainMentor(mentor);
  }

  async delete(id: string): Promise<IMentor> {
    const mentor = await this.mentorRepo.delete(id);
    return mapToDomainMentor(mentor);
  }

  async getPoint(id: string): Promise<number> {
    const mentor = await this.mentorRepo.getPoint(id);
    if (!mentor) throw new NotFoundError("Mentor not found");
    return mentor.point;
  }

  async addPoint(id: string, point: number, sessionStudentId?: string, sessionRole?: string): Promise<number> {
    if (sessionRole === "mentor" && sessionStudentId) {
      const mentor = await this.mentorRepo.findByStudentId(sessionStudentId);
      if (!mentor || (mentor.id !== id && mentor.studentId !== id)) {
        throw new ForbiddenError("You can only modify your own points");
      }
    }
    const updated = await this.mentorRepo.addPoint(id, point);
    if (!updated) throw new NotFoundError("Mentor not found");
    return updated.point;
  }
}
