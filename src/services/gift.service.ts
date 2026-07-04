import { GiftRepository } from "@/src/repositories/gift.repository";
import { MenteeRepository } from "@/src/repositories/mentee.repository";
import { MentorRepository } from "@/src/repositories/mentor.repository";
import { Role } from "@/src/core/domain/auth";
import { BadRequestError, NotFoundError } from "@/src/core/error/error";

const giftRepo = new GiftRepository();
const menteeRepo = new MenteeRepository();
const mentorRepo = new MentorRepository();

export class GiftService {
  async transfer(
    senderStudentId: string,
    senderRole: Role,
    recipientCode: string,
    amount: number
  ): Promise<boolean> {
    if (senderStudentId === recipientCode) {
      throw new BadRequestError("ไม่สามารถโอนแต้มให้ตัวเองได้");
    }

    let senderPoint = 0;
    let senderId = "";

    if (senderRole === "mentor" || senderRole === "admin") {
      const mentor = await mentorRepo.findByStudentId(senderStudentId);
      if (!mentor) throw new NotFoundError("ไม่พบข้อมูลผู้ส่ง");
      senderPoint = mentor.point;
      senderId = mentor.id;
    } else {
      const mentee = await menteeRepo.findByStudentId(senderStudentId);
      if (!mentee) throw new NotFoundError("ไม่พบข้อมูลผู้ส่ง");
      senderPoint = mentee.point;
      senderId = mentee.id;
    }

    if (senderPoint < amount) {
      throw new BadRequestError("แต้มของคุณไม่เพียงพอ");
    }

    let recipientId = "";
    let recipientRole: Role = "mentee";

    const recipientMentee = await menteeRepo.findByStudentId(recipientCode);
    const recipientMentor = await mentorRepo.findByStudentId(recipientCode);

    if (recipientMentee) {
      recipientId = recipientMentee.id;
      recipientRole = "mentee";
    } else if (recipientMentor) {
      recipientId = recipientMentor.id;
      recipientRole = recipientMentor.isAdmin ? "admin" : "mentor";
    } else {
      throw new NotFoundError("ไม่พบผู้รับจากรหัสที่ระบุ");
    }

    return giftRepo.executeTransferTransaction(senderId, senderRole, recipientId, recipientRole, amount);
  }
}
