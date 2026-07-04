import { Mentee } from "@/prisma/generated/client";
import { ICreateMentee } from "@/src/core/domain/mentee";
import { MenteeWithRelations } from "@/src/repositories/mentee.repository";

export interface IMenteeRepository {
  createMentee(data: ICreateMentee): Promise<MenteeWithRelations>;
  createMany(data: ICreateMentee[]): Promise<MenteeWithRelations[]>;
  findAll(): Promise<MenteeWithRelations[]>;
  findById(id: string): Promise<MenteeWithRelations | null>;
  findByStudentId(studentId: string): Promise<Mentee | null>;
  update(id: string, data: Partial<Mentee>): Promise<Mentee>;
  delete(id: string): Promise<MenteeWithRelations>;
  getPoint(id: string): Promise<Mentee | null>;
  addPoint(id: string, point: number): Promise<Mentee>;
}
