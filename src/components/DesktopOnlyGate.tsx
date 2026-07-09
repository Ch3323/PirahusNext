"use client";

import { useEffect, useState } from "react";

const MIN_WIDTH = 1024; // จอเล็กกว่านี้ถือว่าเป็น mobile/tablet

export default function DesktopOnlyGate() {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const check = () => {
      const isSmallScreen = window.innerWidth < MIN_WIDTH;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const ua = navigator.userAgent.toLowerCase();
      const isMobileUA = /iphone|ipad|ipod|android|mobile/i.test(ua);

      setBlocked(isSmallScreen && (isTouchDevice || isMobileUA));
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (blocked) {
      const prevHtmlOverflow = document.documentElement.style.overflow;
      const prevBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
      };
    }
  }, [blocked]);

  if (!blocked) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 999999,
        background:
          "radial-gradient(circle at 50% 30%, #1a0f2e 0%, #0d0817 70%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "32px",
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <div
        style={{
          width: "72px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.6"
        >
          <rect x="2" y="4" width="20" height="13" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      </div>

      <div
        style={{
          fontFamily: "var(--font-pixelify-sans, 'Pixelify Sans'), sans-serif",
          fontSize: "26px",
          letterSpacing: "0.02em",
          color: "#e9d5ff",
          marginBottom: "12px",
        }}
      >
        Desktop Only
      </div>

      <div
        style={{
          fontFamily: "var(--font-share-tech-mono, 'Share Tech Mono'), monospace",
          fontSize: "14px",
          lineHeight: 1.7,
          color: "#c4b5fd",
          maxWidth: "380px",
          marginBottom: "4px",
        }}
      >
        เว็บไซต์นี้รองรับเฉพาะการใช้งานบนคอมพิวเตอร์เท่านั้น
      </div>
      <div
        style={{
          fontFamily: "var(--font-share-tech-mono, 'Share Tech Mono'), monospace",
          fontSize: "13px",
          lineHeight: 1.7,
          color: "#8b7ba8",
          maxWidth: "380px",
        }}
      >
        กรุณาเปิดผ่านคอมพิวเตอร์เพื่อประสบการณ์ที่ดีที่สุด
      </div>

      <div
        style={{
          marginTop: "28px",
          width: "160px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #c084fc55, transparent)",
        }}
      />
    </div>
  );
}