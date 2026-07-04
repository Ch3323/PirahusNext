import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { updateShopItemSchema } from "@/src/core/schema/shop-item";
import { ShopItemService } from "@/src/services/shop-item.service";

const shopItemService = new ShopItemService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await shopItemService.findById(id);
    return successResponse(item);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin"]);
    const { id } = await params;
    const body = await req.json();
    const data = updateShopItemSchema.parse(body);
    const item = await shopItemService.update(id, {
      ...data,
      effectKey: data.effectKey ?? undefined,
      hintLevel: data.hintLevel ?? undefined,
    });
    return successResponse(item);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin"]);
    const { id } = await params;
    await shopItemService.delete(id);
    return successResponse(null);
  } catch (error) {
    return handleError(error);
  }
}
