import { ILeaderboardRepository } from "@/src/core/ports/leaderboard.repository";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";
import { ApiResponse } from "../interface/response";
import httpClient from "@/src/lib/http";

export class LeaderboardRepository implements ILeaderboardRepository {
  async getTopScores(limit: number = 10): Promise<ApiResponse<ILeaderboardResponse>> {
    try {
      const response = await httpClient.get<ILeaderboardResponse>(
        `/api/leaderboard?limit=${limit}`
      );
      return response;
    } catch (error) {
      console.error("Get leaderboard error:", error);
      throw error;
    }
  }
}
