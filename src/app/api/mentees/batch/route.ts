import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { z } from "zod";
import { createMenteeSchema } from "@/src/core/schema/mentee";
import { MenteeService } from "@/src/services/mentee.service";

const menteeService = new MenteeService();

export async function POST(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const validatedData = z.array(createMenteeSchema).parse(body);
    const mentees = await menteeService.createMany(validatedData);
    return successResponse(mentees, 201, "CREATED");
  } catch (error) {
    return handleError(error);
  }
}
