"use client";

import { useReducer, useEffect, useCallback, memo, useState, useRef } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { generateGame } from "@/src/lib/game/dungeon/mapGen";
import { gameReducer } from "@/src/lib/game/dungeon/gameReducer";
import MapDisplay from "../../../components/minigame/MapDisplay";
import GameTerminal from "../../../components/minigame/GameTerminal";
import FaultyTerminal from "../../../components/reactbits/background/FaultyTerminal";
import PointsPopup from "../../../components/minigame/PointsPopup";
import { Pixelify_Sans, Share_Tech_Mono } from "next/font/google";
import { useGamePoints } from "@/src/hooks/useGamePoints";
import { calculateDungeonPts } from "@/src/lib/game/scoring";
import InfoPopup from "@/src/components/InfoPopup";

const pixelifySans = Pixelify_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const Background = memo(function Background() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      <FaultyTerminal
        scale={1.3}
        gridMul={[2, 1]}
        digitSize={1.2}
        timeScale={0.5}
        pause={false}
        scanlineIntensity={0.5}
        glitchAmount={1}
        flickerAmount={1}
        noiseAmp={1}
        chromaticAberration={0}
        dither={0}
        curvature={0.1}
        tint="#363248"
        mouseReact={false}
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.6}
      />
    </div>
  );
});

const buttonStyle = {
  color: "#6b7280",
  border: "1px solid #374151",
  fontSize: "0.875rem",
  padding: "0.25rem 0.75rem",
  width: "fit-content",
  background: "transparent",
  cursor: "pointer",
  borderRadius: "0.25rem",
  fontFamily: "inherit",
  textDecoration: "none",
  display: "inline-block",
};

function InfoBtn({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label="Game Info"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        color: hov ? "#000000" : "#111827",
        border: "1px solid #374151",
        fontSize: "0.875rem",
        padding: "0.25rem 0.75rem",
        width: "fit-content",
        background: "#ffffff",
        cursor: "pointer",
        borderRadius: "0.25rem",
        fontFamily: "inherit",
        transition: "color 0.15s",
      }}
    >
      <Info size={16} strokeWidth={1.5} />
      <span>Info</span>
    </button>
  );
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Page() {
  const [state, dispatch] = useReducer(gameReducer, null, generateGame);
  const { awardPoints, popupPoints, showPopup, closePopup } =
    useGamePoints("dungeon");
  const hasAwardedRef = useRef(false);
  const [showInfo, setShowInfo] = useState(false);

  const [timer, setTimer] = useState(0);

  // Tick every second while active
  const timerRunning =
    state?.phase !== "dead" &&
    state?.phase !== "escaped";

  useEffect(() => {
    if (!timerRunning) return;

    const id = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    if (state?.phase === "escaped" && !hasAwardedRef.current) {
      hasAwardedRef.current = true;
      const pts = calculateDungeonPts(
        state.collectedParts.length,
        state.traps.length,
      );
      awardPoints(pts, { fragments: state.collectedParts.length, time: timer, timeTaken: timer });
    }
  }, [state?.phase, state?.collectedParts.length, state?.traps.length, awardPoints, timer]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (
        state?.phase === "enterKey" ||
        state?.phase === "dead" ||
        state?.phase === "escaped"
      )
        return;
      const codeToDir: Record<string, "w" | "a" | "s" | "d"> = {
        KeyW: "w",
        KeyA: "a",
        KeyS: "s",
        KeyD: "d",
        ArrowUp: "w",
        ArrowLeft: "a",
        ArrowDown: "s",
        ArrowRight: "d",
      };
      const dir = codeToDir[e.code];
      if (dir) {
        e.preventDefault();
        dispatch({ type: "MOVE", dir });
      }
    },
    [state?.phase],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const handleRestart = () => {
    dispatch({ type: "RESTART" });
    setTimer(0);
    hasAwardedRef.current = false;
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#000000",
        ...pixelifySans.style,
      }}
    >
      <Background />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {/* Top-left header */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <h1
              style={{
                color: "#d1d5db",
                fontSize: "1.5rem",
                fontWeight: "bold",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Dungeon
            </h1>
            <InfoBtn onClick={() => setShowInfo(true)} />
          </div>

          <InfoPopup
            isOpen={showInfo}
            onClose={() => setShowInfo(false)}
            title="Dungeon"
          >
            <p>
              กดเดินโดยใช้ปุ่ม WASD (หรือ ไฟหก). ภารกิจคือตามหากุญแจทั้ง 4 ที่ถูกกระจัดกระจายอยู่ตามห้อง
              โดยกุญแจจะถูกเข้ารหัสด้วย Caesar-ciphered เมื่อนำกุญแจมารวมกันก็จะได้คำตอบ ไว้สำหรับใส่ที่ประตูทางออก
              และทุกๆครั้งที่เข้าห้องใหม่ก็จะมีคำใบ้เล็กน้อยเพื่อบอกโดยสังเขปว่าในห้องนั้นมีอะไรอยู่. ระวังกับดักหละ.
            </p>

            <div
              style={{
                borderTop: "1px solid #374151",
                margin: "0.75rem 0",
              }}
            />

            <div
              style={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "0.25rem",
                padding: "0.5rem 0.75rem",
              }}
            >
              <span
                style={{
                  color: "#fde047",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Scoring
              </span>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "0.25rem 0 0" }}>
                คะแนนพื้นฐาน 10 คะแนน + 10 คะแนนต่อชิ้นส่วนกุญแจที่เก็บได้ และจะได้รับ โบนัสเพิ่มอีก 15 คะแนน หากเก็บครบทั้ง 4 ชิ้น<br />
                <strong style={{ color: "#d1d5db" }}>คะแนนสูงสุด: 65 คะแนน</strong>
              </p>
            </div>
          </InfoPopup>

          <button
            onClick={handleRestart}
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            Restart
          </button>
          <Link
            href="/minigames"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            ← BACK
          </Link>
        </div>

        {/* Top-right: timer only */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <span
            style={{
              color: "#d1d5db",
              fontSize: "24px",           // was 1.5rem
              letterSpacing: "0.1em",
              fontFamily: shareTechMono.style.fontFamily,
            }}
          >
            ⏱{formatTime(timer)}
          </span>
        </div>

        {/* Centered map */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <MapDisplay state={state} />
        </div>

        {/* Bottom-left terminal */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            width: "380px",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <GameTerminal state={state} dispatch={dispatch} />
          <p style={{ color: "#4b5563", fontSize: "0.75rem", margin: 0 }}>
            W A S D to move · Find fragments · Reach the exit
          </p>
        </div>
      </div>

      <PointsPopup
        points={popupPoints || 0}
        show={showPopup}
        onComplete={closePopup}
      />
    </div>
  );
}