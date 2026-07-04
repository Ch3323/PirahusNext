import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { MenteeService } from "@/src/services/mentee.service";

const menteeService = new MenteeService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin", "mentor"]);
    const { id } = await params;
    const mentee = await menteeService.findById(id);
    return successResponse(mentee);
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
    const mentee = await menteeService.delete(id);
    return successResponse(mentee);
  } catch (error) {
    return handleError(error);
  }
}
