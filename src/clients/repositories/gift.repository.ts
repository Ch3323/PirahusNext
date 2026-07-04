import { ApiResponse } from "@/src/core/interface/response";
import httpClient from "@/src/lib/http";
import { IGiftTransfer } from "@/src/core/domain/gift";

export class GiftClientRepository {
  async transferGift(data: IGiftTransfer): Promise<ApiResponse<boolean>> {
    return httpClient.post<boolean>("/api/gift/transfer", data);
  }
}
