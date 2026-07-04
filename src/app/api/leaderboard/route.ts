import { NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/lib/get-current-user";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { ILeaderboardResponse } from "@/src/core/domain/leaderboard";

export async function GET(req: NextRequest) {
  try {
    await requireAuth(["admin", "mentor", "mentee"]);

    const searchParams = req.nextUrl.searchParams;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const topMentors = await prisma.mentor.findMany({
      orderBy: { point: "desc" },
      take: limit,
      select: {
        id: true,
        studentId: true,
        nickname: true,
        point: true,
      },
    });

    const topMentees = await prisma.mentee.findMany({
      orderBy: { point: "desc" },
      take: limit,
      select: {
        id: true,
        studentId: true,
        nickname: true,
        point: true,
      },
    });

    const data: ILeaderboardResponse = {
      mentors: topMentors.map((m) => ({ ...m, role: "mentor" as const })),
      mentees: topMentees.map((m) => ({ ...m, role: "mentee" as const })),
    };

    return successResponse(data);
  } catch (error) {
    return handleError(error);
  }
}
