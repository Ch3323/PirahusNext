import { ShopItemRepository } from "@/src/repositories/shop-item.repository";
import { NotFoundError } from "@/src/core/error/error";
import { ShopItemEntity, CreateShopItemInput, UpdateShopItemInput } from "@/src/core/domain/shop-item";
import { ShopCategory } from "@/src/lib/shop/Types";

const shopItemRepo = new ShopItemRepository();

export class ShopItemService {
  async findAll(): Promise<ShopItemEntity[]> {
    return shopItemRepo.findAll();
  }

  async findByCategory(category: ShopCategory): Promise<ShopItemEntity[]> {
    return shopItemRepo.findByCategory(category);
  }

  async findById(id: string): Promise<ShopItemEntity> {
    const item = await shopItemRepo.findById(id);
    if (!item) throw new NotFoundError("ShopItem not found");
    return item;
  }

  async create(data: CreateShopItemInput): Promise<ShopItemEntity> {
    return shopItemRepo.create(data);
  }

  async update(id: string, data: UpdateShopItemInput): Promise<ShopItemEntity> {
    const existing = await shopItemRepo.findById(id);
    if (!existing) throw new NotFoundError("ShopItem not found");
    return shopItemRepo.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const existing = await shopItemRepo.findById(id);
    if (!existing) throw new NotFoundError("ShopItem not found");
    await shopItemRepo.delete(id);
  }
}
