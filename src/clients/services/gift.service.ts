import { GiftClientRepository } from "../repositories/gift.repository";
import { IGiftTransfer } from "@/src/core/domain/gift";
import { parseSchema } from "@/src/lib/validation";
import { giftTransferSchema } from "@/src/core/schema/gift";

export class GiftService {
  constructor(private giftRepository: GiftClientRepository) {}

  async transferGift(data: IGiftTransfer) {
    const parsedData = parseSchema(giftTransferSchema, data);
    try {
      const res = await this.giftRepository.transferGift(parsedData);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
