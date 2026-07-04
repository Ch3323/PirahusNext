import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { addHintsSchema } from "@/src/core/schema/hint";
import { HintService } from "@/src/services/hint.service";

const hintService = new HintService();

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(["admin", "mentor"]);
    const body = await req.json();
    const { hints, mentorId } = addHintsSchema.parse(body);
    const result = await hintService.addHints(mentorId, hints, session.studentId, session.role);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
