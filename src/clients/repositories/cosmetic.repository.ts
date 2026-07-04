import httpClient from "@/src/lib/http";
import { ApiResponse } from "@/src/core/interface/response";
import { IUnlockCosmeticResult, IEquipCosmeticResult } from "@/src/core/domain/cosmetic";

import { ICosmeticClientRepository } from "@/src/core/ports/client/cosmetic.repository.port";

export class CosmeticClientRepository implements ICosmeticClientRepository {
  async unlockCosmetic(id: string): Promise<ApiResponse<IUnlockCosmeticResult>> {
    return httpClient.post<IUnlockCosmeticResult>("/api/cosmetic/unlock", { id });
  }

  async equipCosmetic(id: string | null): Promise<ApiResponse<IEquipCosmeticResult>> {
    return httpClient.post<IEquipCosmeticResult>("/api/cosmetic/equip", { id });
  }
}
