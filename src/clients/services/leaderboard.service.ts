import { LeaderboardClientRepository } from "../repositories/leaderboard.repository";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";

export class LeaderboardService {
  constructor(private readonly leaderboardRepository: LeaderboardClientRepository) {}

  async getTopScores(limit: number = 10): Promise<ILeaderboardResponse> {
    try {
      const response = await this.leaderboardRepository.getTopScores(limit);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
