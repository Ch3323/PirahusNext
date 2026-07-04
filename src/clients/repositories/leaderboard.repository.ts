import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";
import { ApiResponse } from "@/src/core/interface/response";
import httpClient from "@/src/lib/http";

export class LeaderboardClientRepository {
  async getTopScores(limit: number = 10): Promise<ApiResponse<ILeaderboardResponse>> {
    return httpClient.get<ILeaderboardResponse>(`/api/leaderboard?limit=${limit}`);
  }
}
