"use client";

import { useEffect, useState, memo } from "react";
import { Pixelify_Sans, Share_Tech_Mono } from "next/font/google";
import {
  Info,
  Trophy,
  Check,
  ArrowUp,
  Minus,
  ArrowDown,
  X,
} from "lucide-react";
import FaultyTerminal from "@/src/components/reactbits/background/FaultyTerminal";
import { useSortGame } from "@/src/lib/game/sorting/useSortGame";
import {
  scoreLabel,
  minSwaps,
  MAX_BAR_HEIGHT,
} from "@/src/lib/game/sorting/sortLogic";
import { Difficulty } from "@/src/lib/game/sorting/types";
import PointsPopup from "@/src/components/minigame/PointsPopup";
import InfoPopup from "../InfoPopup";

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const shareTechMono = Share_Tech_Mono({ subsets: ["latin"], weight: "400" });

const DIFF_TINT: Record<Difficulty, string> = {
  easy: "#2d4a3a",
  medium: "#4a3f2d",
  hard: "#4a2d2d",
};

const Background = memo(function Background({ tint }: { tint: string }) {
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
        tint={tint}
        mouseReact={false}
        mouseStrength={0.5}
        pageLoadAnimation
        brightness={0.6}
      />
    </div>
  );
});

function HoverBtn({
  onClick,
  children,
  active,
  style,
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: disabled ? "#1f2937" : active || hov ? "#d1d5db" : "#6b7280",
        border: `1px solid ${disabled ? "#1f2937" : active ? "#6b7280" : hov ? "#4b5563" : "#374151"}`,
        fontSize: "0.875rem",
        padding: "0.25rem 0.75rem",
        background: "transparent",
        cursor: disabled ? "default" : "pointer",
        borderRadius: "0.25rem",
        fontFamily: "inherit",
        letterSpacing: "0.05em",
        transition: "color 0.15s, border-color 0.15s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

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

function ScoringPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <span
      style={{
        color,
        border: `1px solid ${color}`,
        backgroundColor: `${color}1a`,
        fontSize: "0.7rem",
        fontWeight: "bold",
        padding: "0.15rem 0.6rem",
        borderRadius: "9999px",
        whiteSpace: "nowrap",
      }}
    >
      {label} {value}
    </span>
  );
}

function ScoringRow({
  icon,
  color,
  title,
  titleNote,
  subtitle,
  value,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
  titleNote?: string;
  subtitle?: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.4rem 0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ color, display: "flex" }}>{icon}</span>
        <div>
          <span style={{ color: "#d1d5db", fontSize: "0.85rem" }}>{title}</span>
          {titleNote && (
            <span style={{ color: "#6b7280", fontSize: "0.75rem" }}> {titleNote}</span>
          )}
          {subtitle && (
            <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{subtitle}</div>
          )}
        </div>
      </div>
      <span
        style={{
          color: "#f3f4f6",
          fontSize: "0.85rem",
          fontWeight: "bold",
          fontFamily: shareTechMono.style.fontFamily,
        }}
      >
        ×{value}
      </span>
    </div>
  );
}

function Bar({
  value,
  maxValue,
  selected,
  swappable,
  sorted,
  onClick,
  index,
}: {
  value: number;
  maxValue: number;
  selected: boolean;
  swappable: boolean;
  sorted: boolean;
  onClick: () => void;
  index: number;
}) {
  const [hov, setHov] = useState(false);
  const barColor = sorted
    ? "#4ade80"
    : selected
      ? "#f3f4f6"
      : swappable
        ? "#fbbf24"
        : hov
          ? "#9ca3af"
          : "#6b7280";
  const blocks = Math.round((value / maxValue) * MAX_BAR_HEIGHT);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.25rem",
        cursor: "pointer",
        transition: "transform 0.1s",
        transform: selected ? "translateY(-4px)" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          height: `${MAX_BAR_HEIGHT * 1.4}rem`,
          justifyContent: "flex-start",
          gap: "1px",
        }}
      >
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            style={{
              color: barColor,
              fontSize: "1rem",
              lineHeight: 1,
              fontFamily: shareTechMono.style.fontFamily,
              transition: "color 0.15s",
              textShadow:
                selected || swappable ? `0 0 8px ${barColor}` : "none",
            }}
          >
            █
          </div>
        ))}
      </div>
      <span
        style={{
          color: barColor,
          fontSize: "0.75rem",
          fontFamily: shareTechMono.style.fontFamily,
          transition: "color 0.15s",
        }}
      >
        {value}
      </span>
      <span
        style={{
          color: "#374151",
          fontSize: "0.65rem",
          fontFamily: shareTechMono.style.fontFamily,
        }}
      >
        [{index}]
      </span>
    </div>
  );
}

export default function SortGame() {
  const [showInfo, setShowInfo] = useState(false);

  const {
    diff,
    bars,
    selected,
    swaps,
    won,
    history,
    timer,
    par,
    startGame,
    handleBarClick,
    undo,
    reset,
    popupPoints,
    showPopup,
    closePopup,
  } = useSortGame();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (won) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (selected === null) {
          handleBarClick(e.key === "ArrowLeft" ? 0 : bars.length - 1);
          return;
        }
        const next = e.key === "ArrowLeft" ? selected - 1 : selected + 1;
        if (next >= 0 && next < bars.length) handleBarClick(next);
      }
      if (e.key === "Escape") return;
      if ((e.key === "z" || e.key === "Z") && e.ctrlKey) undo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, bars.length, won, handleBarClick, undo]);

  const formatTime = (t: number) =>
    `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
  const maxVal = Math.max(...bars, 1);
  const parDiff = swaps - par;
  const score = won ? scoreLabel(swaps, par) : null;
  const sortedBars = (() => {
    const sorted = [...bars].sort((a, b) => a - b);
    return bars.map((v, i) => v === sorted[i]);
  })();

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
        ...pixelifySans.style,
      }}
    >
      <Background tint={DIFF_TINT[diff]} />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {/* Top-left: title + info */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
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
              Sort
            </h1>
            <InfoBtn onClick={() => setShowInfo(true)} />
          </div>

          <InfoPopup
            isOpen={showInfo}
            onClose={() => setShowInfo(false)}
            title="Sort"
          >
            <p>
              คลิกแท่งเพื่อเลือก แล้วคลิกแท่งที่อยู่ติดกันเพื่อสลับตำแหน่ง
              จัดเรียงตัวเลขจากน้อยไปมากโดยใช้จำนวนครั้งในการสลับให้น้อยที่สุด
              พยายามทำผลงานให้ดีกว่าค่า par เพื่อคะแนนสูงสุด.
            </p>

            <div style={{ borderTop: "1px solid #374151", margin: "0.75rem 0" }} />

            <div
              style={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "0.25rem",
                padding: "0.5rem 0.75rem",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.4rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Trophy size={16} color="#fbbf24" strokeWidth={2} />
                  <span style={{ color: "#e5e7eb", fontSize: "0.85rem", fontWeight: "bold" }}>
                    การคิดคะแนน
                  </span>
                </div>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <ScoringPill label="Easy" value={10} color="#4ade80" />
                  <ScoringPill label="Medium" value={25} color="#fb923c" />
                  <ScoringPill label="Hard" value={50} color="#f87171" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid #374151", margin: "0.6rem 0" }} />

              {/* Par tiers */}
              <ScoringRow
                icon={<Check size={16} strokeWidth={2} />}
                color="#4ade80"
                title="สลับไม่เกินค่า Par"
                titleNote="(เสร็จภายในหรือเท่ากับค่าเป้าหมาย)"
                subtitle="ได้คะแนนโบนัสสูงสุด"
                value="1.5"
              />
              <ScoringRow
                icon={<ArrowUp size={16} strokeWidth={2} />}
                color="#fb923c"
                title="เกิน Par +1 ครั้ง"
                subtitle="สลับเกินเป้าหมาย 1 ครั้ง"
                value="1.25"
              />
              <ScoringRow
                icon={<Minus size={16} strokeWidth={2} />}
                color="#fb923c"
                title="เกิน Par +2 ครั้ง"
                subtitle="สลับเกินเป้าหมาย 2 ครั้ง"
                value="1.0"
              />
              <ScoringRow
                icon={<ArrowDown size={16} strokeWidth={2} />}
                color="#fb923c"
                title="เกิน Par +3 ครั้ง"
                subtitle="สลับเกินเป้าหมาย 3 ครั้ง"
                value="0.75"
              />
              <ScoringRow
                icon={<X size={16} strokeWidth={2} />}
                color="#f87171"
                title="เกิน Par +4 ครั้งขึ้นไป"
                subtitle="สลับเกินเป้าหมาย 4 ครั้งขึ้นไป"
                value="0.5"
              />

            </div>
          </InfoPopup>

          <HoverBtn
            onClick={() => window.history.back()}
            style={{ marginTop: "0.25rem", width: "fit-content" }}
          >
            ← BACK
          </HoverBtn>
        </div>

        {/* Top-right: timer only */}
        <div style={{ position: "absolute", top: "1rem", right: "1rem" }}>
          <span
            style={{
              color: "#d1d5db",
              fontSize: "1.5rem",
              letterSpacing: "0.1em",
              fontFamily: shareTechMono.style.fontFamily,
            }}
          >
            ⏱{formatTime(timer)}
          </span>
        </div>

        {/* Bottom-left: difficulty */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            display: "flex",
            gap: "0.375rem",
          }}
        >
          {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
            <HoverBtn key={d} onClick={() => startGame(d)} active={diff === d}>
              {d.toUpperCase()}
            </HoverBtn>
          ))}
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            gap: "1rem",
            padding: "6rem 1rem 2rem",
          }}
        >
          {/* Stats */}
          <div
            style={{ display: "flex", gap: "2.5rem", alignItems: "flex-end" }}
          >
            {[
              { label: "PAR", val: par, color: "#6b7280" },
              {
                label: "SWAPS",
                val: swaps,
                color:
                  parDiff < 0
                    ? "#4ade80"
                    : parDiff === 0
                      ? "#d1d5db"
                      : parDiff <= 2
                        ? "#fbbf24"
                        : "#f87171",
              },
              { label: "MIN", val: minSwaps(bars), color: "#4b5563" },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    color: "#374151",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    marginBottom: "0.2rem",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    color,
                    fontSize: "1.75rem",
                    fontFamily: shareTechMono.style.fontFamily,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div
            style={{
              background: "rgba(15,15,20,0.88)",
              backdropFilter: "blur(8px)",
              border: "1px solid #374151",
              boxShadow: "0 0 40px rgba(0,0,0,0.8)",
              padding: "1.5rem 2rem 1rem",
              display: "flex",
              alignItems: "flex-end",
              gap: bars.length > 9 ? "0.6rem" : "1rem",
            }}
          >
            {bars.map((val, i) => (
              <Bar
                key={i}
                index={i}
                value={val}
                maxValue={maxVal}
                selected={selected === i}
                swappable={selected !== null && Math.abs(selected - i) === 1}
                sorted={won ? true : sortedBars[i]}
                onClick={() => handleBarClick(i)}
              />
            ))}
          </div>

          {/* Undo/Reset */}
          <div style={{ display: "flex", gap: "0.375rem" }}>
            <HoverBtn onClick={undo} disabled={!history.length || won}>
              ↩ UNDO
            </HoverBtn>
            <HoverBtn onClick={reset}>↺ RESET</HoverBtn>
          </div>

          {/* Win */}
          {won && score && (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  color: score.color,
                  fontSize: "1rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {score.text}
              </span>
              <HoverBtn
                onClick={() => startGame(diff)}
                style={{ alignSelf: "center" }}
              >
                PLAY AGAIN
              </HoverBtn>
            </div>
          )}

          {!won && (
            <p
              style={{
                color: "#374151",
                fontSize: "0.75rem",
                margin: 0,
                letterSpacing: "0.05em",
              }}
            >
              Click a bar to select · Click adjacent bar to swap · ←→ keyboard ·
              Ctrl+Z undo
            </p>
          )}
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