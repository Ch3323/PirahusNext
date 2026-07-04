import { ApiResponse } from "@/src/core/interface/response";
import {
  IAddHints,
  IUpdateHints,
  IHint,
  IMenteeHint,
  IUnlockHintResult,
} from "@/src/core/domain/hint";

export interface IHintClientRepository {
  addHints(data: IAddHints): Promise<ApiResponse<{ count: number }>>;
  updateHints(id: string, data: IUpdateHints): Promise<ApiResponse<IHint>>;
  deleteHint(id: string): Promise<ApiResponse<IHint>>;
  getHintsByMentorId(mentorId: string): Promise<ApiResponse<IHint[]>>;
  getHintByLevel(level: number): Promise<ApiResponse<IHint[]>>;
  getMenteeHints(): Promise<ApiResponse<IMenteeHint[]>>;
  unlockHint(level: number): Promise<ApiResponse<IUnlockHintResult>>;
}
