import { IUpdateHints, IHint } from "@/src/core/domain/hint";
import { Prisma, Mentee } from "@/prisma/generated/client";

export type HintWithMentor = Prisma.HintGetPayload<{ include: { mentor: true } }>;
export type MenteeWithMentorAndHints = Prisma.MenteeGetPayload<{ include: { mentor: { include: { hints: true } } } }>;

export interface IHintRepository {
  addHints(
    mentorId: string,
    hints: { content: string; level: number }[],
  ): Promise<{ count: number }>;
  findById(id: string): Promise<HintWithMentor | null>;
  findByMentorId(mentorId: string): Promise<IHint[]>;
  update(id: string, data: IUpdateHints): Promise<IHint>;
  delete(id: string): Promise<IHint>;
  findMenteeWithHints(studentId: string): Promise<MenteeWithMentorAndHints | null>;
  unlockHintTransaction(
    menteeId: string,
    level: number,
    cost: number,
  ): Promise<Mentee>;
}
