import { prisma } from "@/src/lib/prisma";
import { Role } from "@/src/core/domain/auth";

export class GiftRepository {
  async executeTransferTransaction(
    senderId: string,
    senderRole: Role,
    recipientId: string,
    recipientRole: Role,
    amount: number
  ): Promise<boolean> {
    return prisma.$transaction(async (tx) => {
      if (senderRole === "mentor" || senderRole === "admin") {
        await tx.mentor.update({ where: { id: senderId }, data: { point: { decrement: amount } } });
      } else {
        await tx.mentee.update({ where: { id: senderId }, data: { point: { decrement: amount } } });
      }

      if (recipientRole === "mentor" || recipientRole === "admin") {
        await tx.mentor.update({ where: { id: recipientId }, data: { point: { increment: amount } } });
      } else {
        await tx.mentee.update({ where: { id: recipientId }, data: { point: { increment: amount } } });
      }

      return true;
    });
  }
}
