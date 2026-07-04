import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { giftTransferSchema } from "@/src/core/schema/gift";
import { GiftService } from "@/src/services/gift.service";

const giftService = new GiftService();

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(["mentor", "mentee", "admin"]);
    const body = await req.json();
    const { recipientCode, amount } = giftTransferSchema.parse(body);
    const result = await giftService.transfer(session.studentId, session.role, recipientCode, amount);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
