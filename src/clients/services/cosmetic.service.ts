import { IUnlockCosmeticResult, IEquipCosmeticResult } from "@/src/core/domain/cosmetic";
import { ICosmeticClientRepository } from "@/src/core/ports/client/cosmetic.repository.port";

export class CosmeticService {
  constructor(private readonly cosmeticRepository: ICosmeticClientRepository) {}
  
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
