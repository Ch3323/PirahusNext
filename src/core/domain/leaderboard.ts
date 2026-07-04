export interface ILeaderboardEntry {
  id: string;
  studentId: string;
  nickname: string | null;
  point: number;
  role: "mentor" | "mentee";
}

export interface ILeaderboardResponse {
  mentors: ILeaderboardEntry[];
  mentees: ILeaderboardEntry[];
}
