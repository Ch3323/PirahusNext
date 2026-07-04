import { IUnlockCosmeticResult, IEquipCosmeticResult } from "@/src/core/domain/cosmetic";
import { CosmeticClientRepository } from "../repositories/cosmetic.repository";

export class CosmeticService {
  constructor(private readonly cosmeticRepository: CosmeticClientRepository) {}
  
  async unlockCosmetic(id: string): Promise<IUnlockCosmeticResult> {
    try {
      const res = await this.cosmeticRepository.unlockCosmetic(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async equipCosmetic(id: string | null): Promise<IEquipCosmeticResult> {
    try {
      const res = await this.cosmeticRepository.equipCosmetic(id);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
