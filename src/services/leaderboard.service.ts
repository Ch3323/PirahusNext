import { LeaderboardRepository } from "@/src/repositories/leaderboard.repository";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";
import { ILeaderboardRepository } from "@/src/core/ports/server/leaderboard.repository.port";



export class LeaderboardService {
  constructor(
    private readonly leaderboardRepo: ILeaderboardRepository = new LeaderboardRepository()
  ) {}

  async getTopScores(limit: number = 10): Promise<ILeaderboardResponse> {
    return this.leaderboardRepo.getTopScores(limit);
  }
}
