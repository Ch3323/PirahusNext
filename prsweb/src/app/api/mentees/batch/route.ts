import { prisma } from "@/src/lib/prisma";
import { handleError } from "@/src/lib/handle-error";
import { successResponse } from "@/src/lib/api-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await prisma.mentee.createMany({
      data: body,
      skipDuplicates: true,
    });

    const mentees = await prisma.mentee.findMany({
      include: {
        mentor: true,
      },
    });

    return successResponse(mentees, 201, "CREATED");
  } catch (error) {
    return handleError(error);
  }
}
