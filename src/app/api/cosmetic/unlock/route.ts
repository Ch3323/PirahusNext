import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { unlockCosmeticSchema } from "@/src/core/schema/cosmetic";
import { CosmeticService } from "@/src/services/cosmetic.service";

const cosmeticService = new CosmeticService();

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(["mentee", "mentor", "admin"]);
    const body = await req.json();
    const { id } = unlockCosmeticSchema.parse(body);
    const result = await cosmeticService.unlockCosmetic(session.studentId, session.role, id);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
