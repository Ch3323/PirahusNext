import { ApiResponse } from "@/src/core/interface/response";
import {
  CreateShopItemInput,
  ShopItemEntity,
  UpdateShopItemInput,
} from "@/src/core/domain/shop-item";

export interface IShopItemClientRepository {
  findAll(): Promise<ApiResponse<ShopItemEntity[]>>;
  findByCategory(category: string): Promise<ApiResponse<ShopItemEntity[]>>;
  findById(id: string): Promise<ApiResponse<ShopItemEntity | null>>;
  create(data: CreateShopItemInput): Promise<ApiResponse<ShopItemEntity>>;
  update(id: string, data: UpdateShopItemInput): Promise<ApiResponse<ShopItemEntity>>;
  delete(id: string): Promise<ApiResponse<void>>;
}
