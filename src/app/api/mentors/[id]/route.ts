import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { MentorService } from "@/src/services/mentor.service";

const mentorService = new MentorService();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin", "mentor"]);
    const { id } = await params;
    const mentor = await mentorService.findById(id);
    return successResponse(mentor);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth(["admin"]);
    const { id } = await params;
    const body = await req.json();
    const mentor = await mentorService.setAdminRole(id, body.isAdmin);
    return successResponse(mentor);
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
    const mentor = await mentorService.delete(id);
    return successResponse(mentor);
  } catch (error) {
    return handleError(error);
  }
}
