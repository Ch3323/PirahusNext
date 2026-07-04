import { ApiResponse } from "@/src/core/interface/response";
import { IGiftTransfer } from "@/src/core/domain/gift";

export interface IGiftClientRepository {
  transferGift(data: IGiftTransfer): Promise<ApiResponse<boolean>>;
}
