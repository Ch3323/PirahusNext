import { ILeaderboardResponse } from "../domain/leaderboard";
import { ApiResponse } from "@/src/infra/interface/response";

export interface ILeaderboardRepository {
  getTopScores(limit?: number): Promise<ApiResponse<ILeaderboardResponse>>;
}
