import { prisma } from "@/src/lib/prisma";
import { ShopItem } from "@/prisma/generated/client";
import {
  CreateShopItemInput,
  ShopItemEntity,
  UpdateShopItemInput,
} from "@/src/core/domain/shop-item";

function mapToShopItemEntity(item: ShopItem): ShopItemEntity {
  return {
    ...item,
    category: item.category === "spin" || item.category === "cosmetic" || item.category === "hint" ? item.category : "cosmetic",
    effectKey: item.effectKey === "click-spark" || item.effectKey === "ribbons" || item.effectKey === "splash-cursor" ? item.effectKey : null,
  };
}

export class ShopItemRepository {
  async findAll(): Promise<ShopItemEntity[]> {
    const items = await prisma.shopItem.findMany({ orderBy: { createdAt: "asc" } });
    return items.map(mapToShopItemEntity);
  }

  async findByCategory(category: string): Promise<ShopItemEntity[]> {
    const items = await prisma.shopItem.findMany({
      where: { category },
      orderBy: { createdAt: "asc" },
    });
    return items.map(mapToShopItemEntity);
  }

  async findById(id: string): Promise<ShopItemEntity | null> {
    const item = await prisma.shopItem.findUnique({ where: { id } });
    return item ? mapToShopItemEntity(item) : null;
  }

  async findHintItem(hintLevel: number): Promise<ShopItemEntity | null> {
    const item = await prisma.shopItem.findFirst({
      where: { category: "hint", hintLevel },
    });
    return item ? mapToShopItemEntity(item) : null;
  }

  async create(data: CreateShopItemInput): Promise<ShopItemEntity> {
    const item = await prisma.shopItem.create({ data });
    return mapToShopItemEntity(item);
  }

  async update(id: string, data: UpdateShopItemInput): Promise<ShopItemEntity> {
    const item = await prisma.shopItem.update({ where: { id }, data });
    return mapToShopItemEntity(item);
  }

  async delete(id: string): Promise<ShopItemEntity> {
    const item = await prisma.shopItem.delete({ where: { id } });
    return mapToShopItemEntity(item);
  }
}
