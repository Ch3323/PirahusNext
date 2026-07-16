"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    tl.to(".loader-text", {
      opacity: 0.4,
      duration: 0.6,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
    }).to(".loader", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }).set(".loader", {
      display: "none",
    });
  }, [onComplete]);

  return (
    <div
      className="loader fixed inset-0 z-9999 flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #2a0e4d 0%, #6812D2 100%)",
      }}
    >
      <h1
        className="loader-text text-3xl tracking-[0.3em] text-white"
        style={{ fontFamily: "'Pixelify Sans', sans-serif" }}
      >
        LOADING...
      </h1>
    </div>
  );
}