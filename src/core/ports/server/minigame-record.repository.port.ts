import { IMinigameRecordResponse } from "@/src/core/domain/minigame";

export interface IMinigameRecordRepository {
  findExistingRecord(menteeId: string | null, mentorId: string | null, gameName: string): Promise<{ id: string, timeTaken: number, score: number | null } | null>;
  createRecord(menteeId: string | null, mentorId: string | null, gameName: string, timeTaken: number, score?: number, correctAnswers?: number, totalAnswers?: number): Promise<void>;
  updateRecord(id: string, timeTaken: number, score?: number, correctAnswers?: number, totalAnswers?: number): Promise<void>;
  getLeaderboard(gameName: string, limit: number): Promise<IMinigameRecordResponse[]>;
}
