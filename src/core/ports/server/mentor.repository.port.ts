import { Mentor } from "@/prisma/generated/client";
import { ICreateMentor } from "@/src/core/domain/mentor";
import { MentorWithRelations } from "@/src/repositories/mentor.repository";

export interface IMentorRepository {
  createMentor(data: ICreateMentor): Promise<MentorWithRelations>;
  createMany(data: ICreateMentor[]): Promise<MentorWithRelations[]>;
  findAll(): Promise<MentorWithRelations[]>;
  findById(id: string): Promise<MentorWithRelations | null>;
  findByStudentId(studentId: string): Promise<Mentor | null>;
  update(id: string, data: Partial<Mentor>): Promise<MentorWithRelations>;
  setAdminRole(id: string, isAdmin: boolean): Promise<MentorWithRelations>;
  delete(id: string): Promise<MentorWithRelations>;
  getPoint(id: string): Promise<Mentor | null>;
  addPoint(id: string, point: number): Promise<Mentor>;
}
