import { MenteeRepository } from "@/src/repositories/mentee.repository";
import { ICreateMentee, IMentee } from "@/src/core/domain/mentee";
import { NotFoundError, ForbiddenError } from "@/src/core/error/error";
import { mapToDomainMentee } from "@/src/factories/mentee.factory";
import { IMenteeRepository } from "@/src/core/ports/server/mentee.repository.port";



export class MenteeService {
  constructor(
    private readonly menteeRepo: IMenteeRepository = new MenteeRepository()
  ) {}

  async createMentee(data: ICreateMentee): Promise<IMentee> {
    const mentee = await this.menteeRepo.createMentee(data);
    return mapToDomainMentee(mentee);
  }

  async createMany(data: ICreateMentee[]): Promise<IMentee[]> {
    const mentees = await this.menteeRepo.createMany(data);
    return mentees.map(mapToDomainMentee);
  }

  async findAll(): Promise<IMentee[]> {
    const mentees = await this.menteeRepo.findAll();
    return mentees.map(mapToDomainMentee);
  }

  async findById(id: string): Promise<IMentee> {
    const mentee = await this.menteeRepo.findById(id);
    if (!mentee) throw new NotFoundError("Mentee not found");
    return mapToDomainMentee(mentee);
  }

  async delete(id: string): Promise<IMentee> {
    const mentee = await this.menteeRepo.delete(id);
    return mapToDomainMentee(mentee);
  }

  async getPoint(id: string): Promise<number> {
    const mentee = await this.menteeRepo.getPoint(id);
    if (!mentee) throw new NotFoundError("Mentee not found");
    return mentee.point;
  }

  async addPoint(id: string, point: number, sessionStudentId?: string, sessionRole?: string): Promise<number> {
    if (sessionRole === "mentee" && sessionStudentId) {
      const mentee = await this.menteeRepo.findByStudentId(sessionStudentId);
      if (!mentee || (mentee.id !== id && mentee.studentId !== id)) {
        throw new ForbiddenError("You can only modify your own points");
      }
    }
    const updated = await this.menteeRepo.addPoint(id, point);
    if (!updated) throw new NotFoundError("Mentee not found");
    return updated.point;
  }
}
