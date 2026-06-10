import { prisma } from "@/src/lib/prisma";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";

export async function GET() {
  try {
    const setting = await prisma.systemConfig.findFirst();

    return successResponse(setting);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { mentorYear, menteeYear } = body;

    if (!mentorYear || !menteeYear) {
      return handleError({
        status: 400,
        message: "mentorYear and menteeYear are required",
      });
    }

    const existing = await prisma.systemConfig.findFirst();

    if (existing) {
      return handleError({
        status: 409,
        message: "Setting already exists",
      });
    }

    const setting = await prisma.systemConfig.create({
      data: {
        mentorYear,
        menteeYear,
      },
    });

    return successResponse(setting, 201);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const { mentorYear, menteeYear } = body;

    const setting = await prisma.systemConfig.findFirst();

    if (!setting) {
      return handleError({
        status: 404,
        message: "Setting not found",
      });
    }

    const updated = await prisma.systemConfig.update({
      where: {
        id: setting.id,
      },
      data: {
        ...(mentorYear && { mentorYear }),
        ...(menteeYear && { menteeYear }),
      },
    });

    return successResponse(updated);
  } catch (error) {
    return handleError(error);
  }
}
