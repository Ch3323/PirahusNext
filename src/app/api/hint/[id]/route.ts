import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { updateHintsSchema } from "@/src/core/schema/hint";
import { HintService } from "@/src/services/hint.service";

const hintService = new HintService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(["admin", "mentor"]);
    const { id } = await params; // mentorId
    const hints = await hintService.getHintsByMentorId(id, session.studentId, session.role);
    return successResponse(hints);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(["admin", "mentor"]);
    const { id } = await params;
    const body = await req.json();
    const { content } = updateHintsSchema.parse(body);
    const result = await hintService.updateHint(id, content, session.studentId, session.role);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth(["admin", "mentor"]);
    const { id } = await params;
    const result = await hintService.deleteHint(id, session.studentId, session.role);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
