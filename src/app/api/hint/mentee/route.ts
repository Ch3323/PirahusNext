import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { HintService } from "@/src/services/hint.service";

const hintService = new HintService();

export async function GET() {
  try {
    const session = await requireAuth(["mentee"]);
    const hints = await hintService.getMenteeHints(session.studentId);
    return successResponse(hints);
  } catch (error) {
    return handleError(error);
  }
}
