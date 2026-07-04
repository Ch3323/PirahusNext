import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { loginSchema } from "@/src/core/schema/auth";
import { AuthService } from "@/src/services/auth.service";

const authService = new AuthService();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { studentId, password } = loginSchema.parse(body);
    const result = await authService.login(studentId, password ?? undefined);
    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
