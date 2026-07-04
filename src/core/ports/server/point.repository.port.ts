import { Mentor, Mentee } from "@/prisma/generated/client";

export interface IPointRepository {
  getMentorPoint(id: string): Promise<Mentor | null>;
  addMentorPoint(id: string, point: number): Promise<Mentor>;
  getMenteePoint(id: string): Promise<Mentee | null>;
  addMenteePoint(id: string, point: number): Promise<Mentee>;
}
