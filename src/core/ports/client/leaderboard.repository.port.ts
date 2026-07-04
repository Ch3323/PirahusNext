import { ApiResponse } from "@/src/core/interface/response";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";

export interface ILeaderboardClientRepository {
  getTopScores(limit?: number): Promise<ApiResponse<ILeaderboardResponse>>;
}
