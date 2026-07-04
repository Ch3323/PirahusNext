import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { setupProfileSchema } from "@/src/core/schema/auth";
import { AuthService } from "@/src/services/auth.service";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(["admin", "mentor", "mentee"]);
    const body = await req.json();
    const { password, nickname } = setupProfileSchema.parse(body);
    const result = await authService.setupProfile(session.studentId, session.role, password, nickname);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
