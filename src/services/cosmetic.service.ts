import { CosmeticRepository } from "@/src/repositories/cosmetic.repository";
import { MenteeRepository } from "@/src/repositories/mentee.repository";
import { MentorRepository } from "@/src/repositories/mentor.repository";
import { Role } from "@/src/core/domain/auth";
import { AppError, NotFoundError } from "@/src/core/error/error";
import { IUnlockCosmeticResult, IEquipCosmeticResult } from "@/src/core/domain/cosmetic";

const cosmeticRepo = new CosmeticRepository();
const menteeRepo = new MenteeRepository();
const mentorRepo = new MentorRepository();

export class CosmeticService {
  async unlockCosmetic(
    studentId: string,
    role: Role,
    itemId: string
  ): Promise<IUnlockCosmeticResult> {
    const item = await cosmeticRepo.findShopItem(itemId);
    if (!item || item.category !== "cosmetic") {
      throw new NotFoundError("Cosmetic item not found");
    }

    let userId = "";
    let unlockedCosmetics: string[] = [];
    let currentPoints = 0;

    if (role === "mentee") {
      const mentee = await menteeRepo.findByStudentId(studentId);
      if (!mentee) throw new NotFoundError("Mentee not found");
      userId = mentee.id;
      unlockedCosmetics = mentee.unlockedCosmetics;
      currentPoints = mentee.point;
    } else {
      const mentor = await mentorRepo.findByStudentId(studentId);
      if (!mentor) throw new NotFoundError("Mentor not found");
      userId = mentor.id;
      unlockedCosmetics = mentor.unlockedCosmetics;
      currentPoints = mentor.point;
    }

    if (unlockedCosmetics.includes(itemId)) {
      throw new AppError("Cosmetic already unlocked", 400, "ALREADY_UNLOCKED");
    }
    if (currentPoints < item.price) {
      throw new AppError("Not enough points", 400, "INSUFFICIENT_POINTS");
    }

    return cosmeticRepo.unlockCosmeticTransaction(userId, role, itemId, item.price);
  }

  async equipCosmetic(
    studentId: string,
    role: Role,
    itemId: string | null
  ): Promise<IEquipCosmeticResult> {
    if (itemId !== null) {
      const item = await cosmeticRepo.findShopItem(itemId);
      if (!item || item.category !== "cosmetic") throw new NotFoundError("Cosmetic item not found");
    }

    let userId = "";
    let unlockedCosmetics: string[] = [];

    if (role === "mentee") {
      const mentee = await menteeRepo.findByStudentId(studentId);
      if (!mentee) throw new NotFoundError("Mentee not found");
      userId = mentee.id;
      unlockedCosmetics = mentee.unlockedCosmetics;
    } else {
      const mentor = await mentorRepo.findByStudentId(studentId);
      if (!mentor) throw new NotFoundError("Mentor not found");
      userId = mentor.id;
      unlockedCosmetics = mentor.unlockedCosmetics;
    }

    if (itemId !== null && !unlockedCosmetics.includes(itemId)) {
      throw new AppError("You do not own this cosmetic", 400, "NOT_OWNED");
    }

    return cosmeticRepo.equipCosmeticTransaction(userId, role, itemId);
  }
}
