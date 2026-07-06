import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { ShopItemService } from "@/src/services/shop-item.service";

const shopItemService = new ShopItemService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    if (category !== "spin" && category !== "cosmetic" && category !== "hint") {
      throw new Error("Invalid category");
    }
    const items = await shopItemService.findByCategory(category);
    return successResponse(items);
  } catch (error) {
    return handleError(error);
  }
}
