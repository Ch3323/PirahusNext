import { LeaderboardRepository } from "@/src/repositories/leaderboard.repository";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";

const leaderboardRepo = new LeaderboardRepository();

export class LeaderboardService {
  async getTopScores(limit: number = 10): Promise<ILeaderboardResponse> {
    return leaderboardRepo.getTopScores(limit);
  }
}
