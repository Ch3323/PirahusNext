import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { createMenteeSchema } from "@/src/core/schema/mentee";
import { MenteeService } from "@/src/services/mentee.service";

const menteeService = new MenteeService();

export async function GET() {
  try {
    await requireAuth(["admin", "mentor"]);
    const mentees = await menteeService.findAll();
    return successResponse(mentees);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const validatedData = createMenteeSchema.parse(body);
    const mentee = await menteeService.createMentee(validatedData);
    return successResponse(mentee, 201, "CREATED");
  } catch (error) {
    return handleError(error);
  }
}
