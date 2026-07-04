import { Role } from "@/src/core/domain/auth";

export interface IGiftRepository {
  executeTransferTransaction(
    senderId: string,
    senderRole: Role,
    recipientId: string,
    recipientRole: Role,
    amount: number
  ): Promise<boolean>;
}
