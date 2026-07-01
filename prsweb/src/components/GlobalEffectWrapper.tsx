"use client";

import { useEffect } from "react";
import { useUserStore } from "@/src/store/auth";
import ActiveEffect from "./reactbits/cosmectic/ActiveEffect";
import { EffectKey } from "@/src/lib/shop/Types";
import { SHOP_ITEMS } from "@/src/components/shop/Items";

export default function GlobalEffectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((s) => s.user);
  const getUser = useUserStore((s) => s.getUser);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  const equippedItem = SHOP_ITEMS.find((i) => i.id === user?.equippedEffect);
  const effectKey = (equippedItem?.effectKey as EffectKey) || null;

  return <ActiveEffect effectKey={effectKey}>{children}</ActiveEffect>;
}
