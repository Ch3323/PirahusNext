import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { HintService } from "@/src/services/hint.service";

const hintService = new HintService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mentorId: string }> }
) {
  try {
    const session = await requireAuth(["admin", "mentor", "mentee"]);
    const { mentorId } = await params;
    const hints = await hintService.getHintsByMentorId(mentorId, session.studentId, session.role);
    return successResponse(hints);
  } catch (error) {
    return handleError(error);
  }
}
