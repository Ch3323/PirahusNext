import { NextRequest } from "next/server";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { requireAuth } from "@/src/lib/get-current-user";
import { CreateAdmissionYearSchema, UpdateAdmissionYearSchema } from "@/src/core/schema/admission-year";
import { AdmissionYearService } from "@/src/services/admission-year.service";

const admissionYearService = new AdmissionYearService();

export async function GET() {
  try {
    await requireAuth(["admin", "mentor", "mentee"]);
    const setting = await admissionYearService.get();
    return successResponse(setting);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const { mentorYear, menteeYear } = CreateAdmissionYearSchema.parse(body);
    const setting = await admissionYearService.create(mentorYear, menteeYear);
    return successResponse(setting, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAuth(["admin"]);
    const body = await req.json();
    const validatedData = UpdateAdmissionYearSchema.parse(body);
    const updated = await admissionYearService.update(validatedData);
    return successResponse(updated);
  } catch (error) {
    return handleError(error);
  }
}
