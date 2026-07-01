import { cookies } from "next/headers";
import { prisma } from "@/src/lib/prisma";
import { verifyToken, signToken } from "@/src/lib/jwt";
import { successResponse } from "@/src/lib/api-response";
import { handleError } from "@/src/lib/handle-error";
import { UnauthorizedError, NotFoundError } from "@/src/core/error/error";

export async function GET() {
  try {
    const token = (await cookies()).get("access_token")?.value;

    if (!token) {
      return handleError(new UnauthorizedError("Unauthorized"));
    }

    const payload = verifyToken(token);
    let currentRole: "admin" | "mentor" | "mentee" = "mentee";

    if (payload.type === "mentor") {
      const mentor = await prisma.mentor.findUnique({
        where: {
          studentId: payload.studentId,
        },
        select: {
          id: true,
          studentId: true,
          name: true,
          point: true,
          isAdmin: true,
          mentee: {
            select: {
              id: true,
              studentId: true,
              name: true,
            },
          },
        },
      });

      if (!mentor) {
        return handleError(new NotFoundError("Mentor not found"));
      }

      currentRole = mentor.isAdmin ? "admin" : "mentor";

      if (payload.role !== currentRole) {
        const newToken = signToken({
          studentId: payload.studentId,
          type: payload.type,
          role: currentRole,
          point: mentor.point,
        });

        const cookieStore = await cookies();
        cookieStore.set("access_token", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }

      const { isAdmin, point, ...userData } = mentor;

      return successResponse({
        ...userData,
        mentee: mentor.mentee ? [mentor.mentee] : [],
        type: "mentor",
        role: currentRole,
      });
    }

    if (payload.type === "mentee") {
      const mentee = await prisma.mentee.findUnique({
        where: {
          studentId: payload.studentId,
        },
        select: {
          id: true,
          studentId: true,
          name: true,
          point: true,
        },
      });

      if (!mentee) {
        return handleError(new NotFoundError("Mentee not found"));
      }

      currentRole = "mentee";

      if (payload.role !== currentRole) {
        const newToken = signToken({
          studentId: payload.studentId,
          type: payload.type,
          role: currentRole,
          point: mentee.point,
        });

        const cookieStore = await cookies();
        cookieStore.set("access_token", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }

      const { point, ...userData } = mentee;

      return successResponse({
        ...userData,
        type: "mentee",
        role: currentRole,
      });
    }
  } catch (error) {
    return handleError(error);
  }
}
