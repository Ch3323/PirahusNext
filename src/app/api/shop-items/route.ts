import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { createShopItemSchema } from "@/src/core/schema/shop-item";
import { ShopItemService } from "@/src/services/shop-item.service";

const shopItemService = new ShopItemService();

export async function GET() {
  try {
    const items = await shopItemService.findAll();
    return successResponse(items);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const data = createShopItemSchema.parse(body);
    const item = await shopItemService.create({
      ...data,
      effectKey: data.effectKey ?? undefined,
      hintLevel: data.hintLevel ?? undefined,
    });
    return successResponse(item);
  } catch (error) {
    return handleError(error);
  }
}
