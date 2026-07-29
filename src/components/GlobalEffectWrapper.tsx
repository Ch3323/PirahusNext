"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/src/store/auth";
import ActiveEffect from "./reactbits/cosmectic/ActiveEffect";
import { EffectKey } from "@/src/lib/shop/Types";
import { shopItemService } from "@/src/clients/container";
import { useRouter } from "next/navigation";

export default function GlobalEffectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((s) => s.user);
  const getUser = useUserStore((s) => s.getUser);
  const router = useRouter();

  const [effectKey, setEffectKey] = useState<EffectKey | null>(null);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (user && user.nickname === null) {
      const path = window.location.pathname;
      if (path !== "/auth/setupprofile" && path !== "/auth/login") {
        router.replace("/auth/setupprofile");
      }
    }
  }, [user, router]);

  useEffect(() => {
    let isMounted = true;
    if (user?.equippedEffect) {
      shopItemService.getShopItemById(user.equippedEffect).then((item) => {
        if (isMounted) {
          setEffectKey((item?.effectKey as EffectKey) || null);
        }
      });
    } else {
      Promise.resolve().then(() => setEffectKey(null));
    }
    return () => {
      isMounted = false;
    };
  }, [user?.equippedEffect]);

  return <ActiveEffect effectKey={effectKey}>{children}</ActiveEffect>;
}
