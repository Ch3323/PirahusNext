"use client";

import type { ReactNode } from "react";
import type { EffectKey } from "@/src/lib/shop/Types";
import ClickSpark from "./ClickSpark";
import Ribbons from "./Ribbons";
import SplashCursor from "./SplashCursor";
import PixelTrail from './PixelTrail';

interface ActiveEffectProps {
  effectKey: EffectKey | null | undefined;
  children: ReactNode;
}

/**
 * เมาท์ cosmetic effect ที่ user ซื้อ/equip ไว้ วางไว้ใน root layout ครอบทั้งแอป:
 *   <ActiveEffect effectKey={user?.equippedEffect}>{children}</ActiveEffect>
 *
 * NOTE: "equippedEffect" ยังไม่มีจริงใน CurrentUser/backend — ต้องเพิ่ม field
 * และ endpoint สำหรับ equip/unequip เอง อันนี้แค่เตรียม UI ให้พร้อมต่อ
 *
 * ClickSpark ต้อง "ครอบ" children เพราะ handle onClick อยู่ที่ wrapper div ของมันเอง
 * ส่วน Ribbons กับ SplashCursor เป็น fixed overlay เต็มจอแบบ pointer-events-none
 * (ไม่บังคลิกหน้าเว็บ) เลยแค่ render คู่ไปกับ children ปกติ
 */
export default function ActiveEffect({
  effectKey,
  children,
}: ActiveEffectProps) {
  switch (effectKey) {
    case "click-spark":
      return (
        <ClickSpark
            sparkColor="#ffffff"
            sparkSize={10}
            sparkRadius={35}
            sparkCount={8}
            duration={400}
          >
          {children}
        </ ClickSpark>
          );

          case "ribbons":
          return (
          <>
            {children}
            <Ribbons
              colors={["#6dff9e", "#ffd66b", "#ffb347"]}
              baseThickness={20}
              baseSpring={0.05}
              speedMultiplier={0.5}
              maxAge={350}
              enableFade
            />
          </>
          );

          case "splash-cursor":
          return (
          <>
            {children}
            <SplashCursor
              SPLAT_RADIUS={0.15}
              SPLAT_FORCE={5000}
              RAINBOW_MODE={false}
              COLOR="#6dff9e"
              TRANSPARENT
            />
          </>
          );

          case "pixel-trail":
          return (
          <>
            {children}
            <PixelTrail
              gridSize={75}
              trailSize={0.02}
              maxAge={300}
              interpolate={1.5}
              color="#3aeda6"
              gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
            />
          </>
          );

          default:
          return <>{children}</>;
  }
}
