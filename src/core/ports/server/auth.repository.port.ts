import { Mentor, Mentee, AdmissionYear } from "@/prisma/generated/client";
import { Role } from "@/src/core/domain/auth";
import { MentorForMe, MenteeForMe } from "@/src/repositories/auth.repository";

export interface IAuthRepository {
  findAdmissionYear(): Promise<AdmissionYear | null>;
  findMentorByStudentId(studentId: string): Promise<Mentor | null>;
  findMenteeByStudentId(studentId: string): Promise<Mentee | null>;
  findMentorForMe(studentId: string): Promise<MentorForMe | null>;
  findMenteeForMe(studentId: string): Promise<MenteeForMe | null>;
  updateMentorPassword(
    studentId: string,
    hashedPassword: string,
    nickname: string,
  ): Promise<Mentor>;
  updateMenteePassword(
    studentId: string,
    hashedPassword: string,
    nickname: string,
  ): Promise<Mentee>;
  setTokenCookie(studentId: string, role: Role, point: number): Promise<string>;
  comparePassword(plain: string, hashed: string): boolean;
  hashPassword(plain: string): string;
}
