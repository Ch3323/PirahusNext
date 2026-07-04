import { HintRepository } from "@/src/repositories/hint.repository";
import { MentorRepository } from "@/src/repositories/mentor.repository";
import { MenteeRepository } from "@/src/repositories/mentee.repository";
import { ShopItemRepository } from "@/src/repositories/shop-item.repository";
import { ForbiddenError, NotFoundError, AppError } from "@/src/core/error/error";
import { IHint, IMenteeHint, IUnlockHintResult } from "@/src/core/domain/hint";
import { Role } from "@/src/core/domain/auth";

const hintRepo = new HintRepository();
const mentorRepo = new MentorRepository();
const menteeRepo = new MenteeRepository();
const shopItemRepo = new ShopItemRepository();

export class HintService {
  async addHints(
    mentorId: string,
    hints: { content: string; level: number }[],
    sessionStudentId: string,
    sessionRole: Role
  ) {
    if (sessionRole === "mentor") {
      const dbMentor = await mentorRepo.findByStudentId(sessionStudentId);
      if (!dbMentor || dbMentor.id !== mentorId) {
        throw new ForbiddenError("You cannot modify other mentors' hints");
      }
    }
    return hintRepo.addHints(mentorId, hints);
  }

  async updateHint(id: string, content: string, sessionStudentId: string, sessionRole: Role): Promise<IHint> {
    if (sessionRole === "mentor") {
      const hint = await hintRepo.findById(id);
      if (!hint || hint.mentor.studentId !== sessionStudentId) {
        throw new ForbiddenError("You cannot update other mentors' hints");
      }
    }
    return hintRepo.update(id, { content });
  }

  async deleteHint(id: string, sessionStudentId: string, sessionRole: Role): Promise<IHint> {
    if (sessionRole === "mentor") {
      const hint = await hintRepo.findById(id);
      if (!hint || hint.mentor.studentId !== sessionStudentId) {
        throw new ForbiddenError("You cannot delete other mentors' hints");
      }
    }
    return hintRepo.delete(id);
  }

  async getHintsByMentorId(mentorId: string, sessionStudentId: string, sessionRole: Role): Promise<IHint[]> {
    if (sessionRole === "mentor") {
      const dbMentor = await mentorRepo.findByStudentId(sessionStudentId);
      if (!dbMentor || dbMentor.id !== mentorId) {
        throw new ForbiddenError("You cannot view other mentors' hints");
      }
    } else if (sessionRole === "mentee") {
      const dbMentee = await menteeRepo.findByStudentId(sessionStudentId);
      if (!dbMentee || dbMentee.mentorId !== mentorId) {
        throw new ForbiddenError("You cannot view other mentors' hints");
      }
    }
    return hintRepo.findByMentorId(mentorId);
  }

  async getMenteeHints(sessionStudentId: string): Promise<IMenteeHint[]> {
    const mentee = await hintRepo.findMenteeWithHints(sessionStudentId);
    if (!mentee) throw new NotFoundError("Mentee not found");

    const hintShopItems = await shopItemRepo.findByCategory("hint");

    const hints = mentee.mentor.hints.map((hint) => {
      const isUnlocked = mentee.unlockedHintLevels.includes(hint.level);
      const shopItem = hintShopItems.find((s) => s.hintLevel === hint.level);
      return {
        id: hint.id,
        level: hint.level,
        cost: shopItem?.price || 0,
        isUnlocked,
        content: isUnlocked ? hint.content : null,
      };
    });

    hints.sort((a, b) => a.level - b.level);
    return hints;
  }

  async unlockHint(level: number, sessionStudentId: string): Promise<IUnlockHintResult> {
    const mentee = await menteeRepo.findByStudentId(sessionStudentId);
    if (!mentee) throw new NotFoundError("Mentee not found");

    if (mentee.unlockedHintLevels.includes(level)) {
      throw new AppError("Hint already unlocked", 400, "ALREADY_UNLOCKED");
    }

    const mentor = await mentorRepo.findByStudentId(mentee.mentorId);
    if (!mentor) throw new NotFoundError("Mentor not found");
    const hints = await hintRepo.findByMentorId(mentor.id);
    const hint = hints.find((h) => h.level === level);

    if (!hint) throw new NotFoundError("Hint not found for this level");

    const shopItem = await shopItemRepo.findHintItem(level);

    if (!shopItem || typeof shopItem.price !== "number") {
      throw new AppError("Invalid hint pricing in DB", 500, "INTERNAL_ERROR");
    }

    const cost = shopItem.price;

    if (mentee.point < cost) {
      throw new AppError("Not enough points", 400, "INSUFFICIENT_POINTS");
    }

    const updatedMentee = await hintRepo.unlockHintTransaction(mentee.id, level, cost);

    return {
      hint: { id: hint.id, level: hint.level, content: hint.content },
      newPoint: updatedMentee.point,
    };
  }
}
