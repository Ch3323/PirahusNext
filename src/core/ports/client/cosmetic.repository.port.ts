import { ApiResponse } from "@/src/core/interface/response";
import { IUnlockCosmeticResult, IEquipCosmeticResult } from "@/src/core/domain/cosmetic";

export interface ICosmeticClientRepository {
  unlockCosmetic(id: string): Promise<ApiResponse<IUnlockCosmeticResult>>;
  equipCosmetic(id: string | null): Promise<ApiResponse<IEquipCosmeticResult>>;
}
