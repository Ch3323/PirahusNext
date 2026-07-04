import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";

export interface ILeaderboardRepository {
  getTopScores(limit?: number): Promise<ILeaderboardResponse>;
}
