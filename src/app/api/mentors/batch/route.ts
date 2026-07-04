import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { z } from "zod";
import { createMentorSchema } from "@/src/core/schema/mentor";
import { MentorService } from "@/src/services/mentor.service";

const mentorService = new MentorService();

export async function POST(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const validatedData = z.array(createMentorSchema).parse(body);
    const mentors = await mentorService.createMany(validatedData);
    return successResponse(mentors, 201, "CREATED");
  } catch (error) {
    return handleError(error);
  }
}
