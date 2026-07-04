import { ApiResponse } from "@/src/core/interface/response";
import httpClient from "@/src/lib/http";
import { IGiftTransfer } from "@/src/core/domain/gift";

import { IGiftClientRepository } from "@/src/core/ports/client/gift.repository.port";

export class GiftClientRepository implements IGiftClientRepository {
  async transferGift(data: IGiftTransfer): Promise<ApiResponse<boolean>> {
    return httpClient.post<boolean>("/api/gift/transfer", data);
  }
}
