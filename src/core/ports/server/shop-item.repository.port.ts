import {
  CreateShopItemInput,
  ShopItemEntity,
  UpdateShopItemInput,
} from "@/src/core/domain/shop-item";

export interface IShopItemRepository {
  findAll(): Promise<ShopItemEntity[]>;
  findByCategory(category: string): Promise<ShopItemEntity[]>;
  findById(id: string): Promise<ShopItemEntity | null>;
  findHintItem(hintLevel: number): Promise<ShopItemEntity | null>;
  create(data: CreateShopItemInput): Promise<ShopItemEntity>;
  update(id: string, data: UpdateShopItemInput): Promise<ShopItemEntity>;
  delete(id: string): Promise<ShopItemEntity>;
}
