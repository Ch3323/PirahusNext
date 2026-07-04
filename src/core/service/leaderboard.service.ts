import { ILeaderboardRepository } from "../ports/leaderboard.repository";
import { ILeaderboardResponse } from "../domain/leaderboard";

export class LeaderboardService {
  constructor(private readonly leaderboardRepository: ILeaderboardRepository) {}

  async getTopScores(limit: number = 10): Promise<ILeaderboardResponse> {
    try {
      const response = await this.leaderboardRepository.getTopScores(limit);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
