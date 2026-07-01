"use client";

import { useEffect, useState } from "react";
import ShopSection from "@/src/components/shop/Section";
import GiftPointsButton from "@/src/components/shop/Giftpointsbutton";
import GiftModal from "@/src/components/shop/Giftmodal";
import type { ShopItem, GiftTransfer } from "@/src/lib/shop/Types";
import { SHOP_ITEMS } from "@/src/components/shop/Items";
import { hintService, cosmeticService } from "@/src/infra/container";

import PtsBadge from "@/src/components/minigame/points";
import { useUserStore } from "@/src/store/auth";
import { CurrentUser } from "@/src/core/domain/auth";
import Swal from "sweetalert2";

export default function Shop() {
  const { user, loading: storeLoading, getUser, setUser } = useUserStore();
  const points = user?.point ?? 0;
  const [giftOpen, setGiftOpen] = useState(false);

  useEffect(() => {
    if (!user) getUser();
  }, [user, getUser]);

  const isMentor = user?.role === "mentor" || user?.role === "admin";

  const unlockedHintLevels =
    user && user.role === "mentee" ? user.unlockedHintLevels : [];
  const unlockedCosmetics = user?.unlockedCosmetics || [];

  const spinItems = SHOP_ITEMS.filter((i) => i.category === "spin");
  const hintItems = SHOP_ITEMS.filter((i) => i.category === "hint").map(
    (i) => ({
      ...i,
      owned:
        i.hintLevel && unlockedHintLevels.includes(i.hintLevel)
          ? true
          : i.owned,
    }),
  );
  const cosmeticItems = SHOP_ITEMS.filter((i) => i.category === "cosmetic").map(
    (i) => ({
      ...i,
      owned: unlockedCosmetics.includes(i.id) ? true : i.owned,
    }),
  );

  const handleBuy = async (item: ShopItem, hintLevel?: number) => {
    if (item.category === "hint" && isMentor) {
      Swal.fire({
        title: "ไม่อนุญาต",
        text: "คำใบ้เปิดให้เฉพาะน้องรหัส (Mentee) ซื้อเท่านั้น",
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    if (item.disabled) {
      // TODO: router.push ไปหน้า spin จริง
      return;
    }
    if (item.category == "hint") {
      if (!hintLevel) return;
      try {
        Swal.fire({
          title: "กำลังดำเนินการ...",
          text: "โปรดรอสักครู่",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const result = await hintService.unlockHint(hintLevel);

        if (user) {
          if (user.role === "mentee") {
            setUser({
              ...user,
              point: result.newPoint,
              unlockedHintLevels: [...user.unlockedHintLevels, hintLevel],
            } as CurrentUser);
          }
        }
        getUser();

        Swal.fire({
          title: "สำเร็จ!",
          text: "ซื้อคำใบ้สำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        Swal.fire({
          title: " เกืดข้อผิดพลาด!",
          text: "เกิดข้อผิดพลาดในการซื้อคำใบ้",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }

    if (item.category === "cosmetic") {
      try {
        Swal.fire({
          title: "กำลังดำเนินการ...",
          text: "โปรดรอสักครู่",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const result = await cosmeticService.unlockCosmetic(item.id);

        if (user) {
          setUser({
            ...user,
            point: result.newPoint,
            unlockedCosmetics: [...(user.unlockedCosmetics || []), item.id],
          } as CurrentUser);
        }
        getUser();

        Swal.fire({
          title: "สำเร็จ!",
          text: "ซื้อไอเทมตกแต่งสำเร็จ",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      } catch (error) {
        Swal.fire({
          title: "ผิดพลาด!",
          text: "เกิดข้อผิดพลาดในการซื้อไอเทมตกแต่ง",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }
  };

  const handleEquip = async (item: ShopItem) => {
    try {
      Swal.fire({
        title: "กำลังดำเนินการ...",
        text: "โปรดรอสักครู่",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const equipId = user?.equippedEffect === item.id ? null : item.id;
      const result = await cosmeticService.equipCosmetic(equipId);

      if (user) {
        setUser({
          ...user,
          equippedEffect: result.equippedEffect,
        } as CurrentUser);
      }
      getUser();

      Swal.fire({
        title: "สำเร็จ!",
        text: equipId ? "ติดตั้งไอเทมสำเร็จ" : "ถอดไอเทมสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "ผิดพลาด!",
        text: "เกิดข้อผิดพลาดในการเปลี่ยนเอฟเฟกต์",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
    }
  };

  const handleSendGift = async (transfer: GiftTransfer): Promise<boolean> => {
    // TODO: เรียก API จริงสำหรับโอนแต้มให้เพื่อน แล้ว getUser() ใหม่หลังโอนสำเร็จ
    console.log("send gift", transfer);
    return true;
  };

  if (storeLoading && !user) {
    return (
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#0a0f0d] px-8 font-mono text-[#d8ffe4]">
        <div
          className="pointer-events-none fixed inset-0 z-1 mix-blend-overlay"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(140,255,176,0.035) 0px, rgba(140,255,176,0.035) 1px, transparent 1px, transparent 3px)",
          }}
        />
        <div className="z-10 flex flex-col items-center gap-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#16321f] border-t-[#8cffb0]"></div>
          <p className="font-['Pixelify_Sans'] text-2xl tracking-wider text-[#8cffb0] animate-pulse drop-shadow-[0_0_8px_rgba(140,255,176,.45)]">
            LOADING SHOP...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0f0d] px-8 pt-24 pb-12 font-mono text-[#d8ffe4]">
      <div
        className="pointer-events-none fixed inset-0 z-1 mix-blend-overlay"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(140,255,176,0.035) 0px, rgba(140,255,176,0.035) 1px, transparent 1px, transparent 3px)",
        }}
      />

      {/* currency badge มุมซ้ายบน */}
      <div
        style={{
          position: "fixed",
          top: "2.5rem",
          left: "2rem",
          zIndex: 1000,
        }}
      >
        <PtsBadge pts={points} isLoading={storeLoading} />
      </div>

      <header className="mx-auto mb-10 max-w-5xl text-center">
        <h1 className="font-['Pixelify_Sans'] text-4xl tracking-wider text-[#8cffb0] drop-shadow-[0_0_12px_rgba(140,255,176,.45)]">
          SHOP
        </h1>

        <p className="mt-2 text-sm tracking-wide text-[#7c9985]">
          ใช้แต้มแลกของและเอฟเฟกต์พิเศษ
        </p>
      </header>

      {isMentor && (
        <div className="mx-auto mb-8 max-w-5xl border-2 border-[#ff6b6b] bg-[#1a0505] p-4 text-center font-['Pixelify_Sans'] text-lg text-[#ff6b6b] drop-shadow-[0_0_8px_rgba(255,107,107,.45)]">
          ⚠️ คุณคือ Mentor (สามารถซื้อได้เฉพาะหมวด Cosmetic)
        </div>
      )}

      <ShopSection
        title="Spin"
        items={spinItems}
        currentPoints={points}
        onBuy={handleBuy}
      />
      <ShopSection
        title="Hint"
        items={hintItems}
        currentPoints={points}
        onBuy={handleBuy}
      />
      <ShopSection
        title="Cosmetic"
        items={cosmeticItems}
        currentPoints={points}
        onBuy={handleBuy}
        onEquip={handleEquip}
        equippedEffect={user?.equippedEffect}
      />

      <GiftPointsButton onClick={() => setGiftOpen(true)} />

      {giftOpen && (
        <GiftModal
          currentPoints={points}
          onClose={() => setGiftOpen(false)}
          onSend={handleSendGift}
        />
      )}
    </div>
  );
}
