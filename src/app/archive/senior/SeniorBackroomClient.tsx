"use client";

import { useState, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaPencilAlt,
  FaCheck,
  FaTimes,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { authService, hintService } from "@/src/infra/container";
import { useUserStore } from "@/src/store/auth";
import Swal from "sweetalert2";
import { IHint } from "@/src/core/domain/hint";
import { IMentee } from "@/src/core/domain/mentee";
import HintBoard from "@/src/components/archive/senior/Hintboard";
import MentorPanel from "@/src/components/archive/senior/Mentorpanel";
import Link from "next/dist/client/link";
import Grainient from "@/src/components/reactbits/background/Grainient";

function JuniorCard({ junior }: { junior: IMentee | null }) {
  if (!junior) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "16px 20px",
          backgroundColor: "rgba(100, 40, 30, 0.25)",
          border: "1px solid rgba(255, 100, 74, 0.25)",
          borderRadius: "3px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 100, 74, 0.1)",
            border: "1px solid rgba(255, 100, 74, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <FaUser size={16} style={{ color: "#ff644a" }} />
        </div>
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#c08070",
              fontFamily: "monospace",
            }}
          >
            น้องรหัสของคุณ
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "3px",
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 600,
                color: "#e8a090",
              }}
            >
              ยังไม่ได้รับการจับคู่กับน้องรหัส
            </span>
          </div>
        </div>
      </div>
    );
  }

  const firstTwo =
    junior.studentId.length >= 2 ? junior.studentId.slice(0, 2) : "";
  const rest =
    junior.studentId.length >= 2 ? junior.studentId.slice(2) : junior.studentId;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "16px 20px",
        backgroundColor: "rgba(20, 40, 70, 0.55)",
        border: "1px solid rgba(74, 158, 255, 0.2)",
        borderRadius: "3px",
        marginBottom: "32px",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "rgba(74, 158, 255, 0.1)",
          border: "1px solid rgba(74, 158, 255, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FaUser size={16} style={{ color: "#4a9eff" }} />
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#2a5070",
            fontFamily: "monospace",
          }}
        >
          น้องรหัสของคุณ
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "6px",
              padding: "6px 12px",
              border: "1px solid rgba(74, 158, 255, 0.25)",
              backgroundColor: "rgba(74, 158, 255, 0.08)",
              borderRadius: "4px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                color: "#4a9eff",
                fontWeight: 700,
                letterSpacing: "1px",
                lineHeight: 1,
              }}
            >
              ID
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {firstTwo && <span style={{ color: "#4a9eff" }}>{firstTwo}</span>}
              <span style={{ color: "#8aaccc" }}>{rest}</span>
            </span>
          </div>

          {junior.nickname && (
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "6px",
                padding: "6px 12px",
                border: "1px solid rgba(122, 184, 232, 0.25)",
                backgroundColor: "rgba(122, 184, 232, 0.08)",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  color: "#7ab8e8",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  lineHeight: 1,
                }}
              >
                NAME
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#aadcff",
                  fontFamily: "'Share Tech Mono', monospace",
                  lineHeight: 1,
                }}
              >
                {junior.nickname}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HintItem({
  hint,
  index,
  onDelete,
  onEdit,
}: {
  hint: IHint;
  index: number;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(hint.content);

  const save = () => {
    if (val.trim()) {
      onEdit(hint.id, val.trim());
      setEditing(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        backgroundColor: "rgba(10, 14, 8, 0.5)",
        border: "1px solid rgba(140, 170, 80, 0.1)",
        borderRadius: "2px",
        marginBottom: "6px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#a8c060",
          backgroundColor: "rgba(168, 192, 96, 0.12)",
          border: "1px solid rgba(168, 192, 96, 0.3)",
          borderRadius: "2px",
          padding: "3px 6px",
          fontFamily: "monospace",
          minWidth: "56px",
          textAlign: "center",
        }}
      >
        Level {hint.level}
      </span>

      {editing ? (
        <>
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setEditing(false);
                setVal(hint.content);
              }
            }}
            style={{
              flex: 1,
              background: "rgba(140,170,80,0.08)",
              border: "1px solid rgba(140,170,80,0.35)",
              borderRadius: "2px",
              color: "#d8e8b8",
              fontSize: "14px",
              padding: "5px 10px",
              fontFamily: "monospace",
              outline: "none",
            }}
          />
          <button
            onClick={save}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#70b840",
              padding: "4px",
            }}
          >
            <FaCheck size={12} />
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setVal(hint.content);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#b84030",
              padding: "4px",
            }}
          >
            <FaTimes size={12} />
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              flex: 1,
              fontSize: "14px",
              color: "#98b868",
              fontFamily: "monospace",
            }}
          >
            {hint.content}
          </span>

          <button
            onClick={() => setEditing(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#4a6030",
              padding: "4px",
            }}
          >
            <FaPencilAlt size={11} />
          </button>
          <button
            onClick={() => onDelete(hint.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#8a3020",
              padding: "4px",
            }}
          >
            <FaTrash size={11} />
          </button>
        </>
      )}
    </div>
  );
}

export default function SeniorBackroomClient() {
  const router = useRouter();
  const { user, loading: authLoading, getUser } = useUserStore();
  const [mentor, setMentor] = useState<any>(null);
  const [hints, setHints] = useState<IHint[]>([]);
  const [newHint, setNewHint] = useState("");
  const [newLevel, setNewLevel] = useState<number>(1);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshHints = async (mentorId: string) => {
    try {
      const hintList = await hintService.getHintsByMentorId(mentorId);
      setHints(hintList);
    } catch (err) {
      console.error("Failed to refresh hints:", err);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (authLoading || !user) return;

    setMentor(user);
    hintService
      .getHintsByMentorId(user.id)
      .then(setHints)
      .catch((err) => console.error("Failed to load hints:", err))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const addHint = async () => {
    if (!newHint.trim() || !mentor) return;
    try {
      Swal.fire({
        title: "กำลังบันทึกคำใบ้...",
        allowOutsideClick: false,
        background: "#0a0e08",
        color: "#d8e8b8",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await hintService.addHints({
        mentorId: mentor.id,
        hints: [{ content: newHint.trim(), level: newLevel }],
      });
      setNewHint("");
      setNewLevel(1);
      setAdding(false);
      await refreshHints(mentor.id);

      Swal.fire({
        title: "บันทึกสำเร็จ",
        text: "บันทึกคำใบ้เรียบร้อยแล้ว",
        icon: "success",
        confirmButtonColor: "#708840",
        background: "#0a0e08",
        color: "#d8e8b8",
      });
    } catch (err) {
      console.error("Failed to add hint:", err);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถเพิ่มคำใบ้ได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#708840",
        background: "#0a0e08",
        color: "#d8e8b8",
      });
    }
  };

  const deleteHint = async (id: string) => {
    if (!mentor) return;
    const result = await Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบคำใบ้นี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#b85040",
      cancelButtonColor: "#4a6030",
      background: "#0a0e08",
      color: "#d8e8b8",
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "กำลังลบคำใบ้...",
          allowOutsideClick: false,
          background: "#0a0e08",
          color: "#d8e8b8",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await hintService.deleteHint(id);
        await refreshHints(mentor.id);

        Swal.fire({
          title: "ลบสำเร็จ",
          text: "ลบคำใบ้เรียบร้อยแล้ว",
          icon: "success",
          confirmButtonColor: "#708840",
          background: "#0a0e08",
          color: "#d8e8b8",
        });
      } catch (err) {
        console.error("Failed to delete hint:", err);
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบคำใบ้ได้ กรุณาลองใหม่อีกครั้ง",
          icon: "error",
          confirmButtonColor: "#708840",
          background: "#0a0e08",
          color: "#d8e8b8",
        });
      }
    }
  };

  const editHint = async (id: string, content: string) => {
    if (!mentor) return;
    try {
      Swal.fire({
        title: "กำลังแก้ไขคำใบ้...",
        allowOutsideClick: false,
        background: "#0a0e08",
        color: "#d8e8b8",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await hintService.updateHints(id, { content });
      await refreshHints(mentor.id);

      Swal.fire({
        title: "แก้ไขสำเร็จ",
        text: "แก้ไขคำใบ้เรียบร้อยแล้ว",
        icon: "success",
        confirmButtonColor: "#708840",
        background: "#0a0e08",
        color: "#d8e8b8",
      });
    } catch (err) {
      console.error("Failed to edit hint:", err);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขคำใบ้ได้ กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonColor: "#708840",
        background: "#0a0e08",
        color: "#d8e8b8",
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(10, 14, 8, 1)",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "18px",
            color: "#a8c060",
            letterSpacing: "0.15em",
          }}
        >
          LOADING DATA ACCESS...
        </div>
      </div>
    );
  }

  const firstTwo =
    mentor.studentId.length >= 2 ? mentor.studentId.slice(0, 2) : "";
  const rest =
    mentor.studentId.length >= 2 ? mentor.studentId.slice(2) : mentor.studentId;

  const buttonStyle = {
    color: "#6b7280",
    border: "1px solid #374151",
    fontSize: "0.875rem",
    padding: "0.25rem 0.75rem",
    width: "fit-content",
    background: "transparent",
    cursor: "pointer",
    borderRadius: "0.25rem",
    fontFamily: "Pixelify Sans",
    textDecoration: "none",
    display: "inline-block",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Grainient
          color1="#604599"
          color2="#17112f"
          color3="#222b57"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div
        style={{
          position: "fixed",
          top: "2.5rem",
          left: "2rem",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "flex-start",
        }}
      >
        <Link
          href="/"
          style={buttonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#d1d5db")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          ← Back
        </Link>
      </div>

      <style>{`
      .backroom-columns {
        display: flex;
        gap: 56px;
        align-items: center;
      }
      .backroom-col-left {
        flex: 0 0 280px;
      }
      .backroom-col-right {
        flex: 1;
        min-width: 0;
      }
      @media (max-width: 720px) {
        .backroom-columns {
          flex-direction: column;
          gap: 32px;
        }
        .backroom-col-left {
          flex: 1 1 auto;
          width: 100%;
        }
      }
    `}</style>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <div className="backroom-columns">
          <MentorPanel mentor={mentor} />

          <HintBoard
            hints={hints}
            adding={adding}
            newHint={newHint}
            newLevel={newLevel}
            setAdding={setAdding}
            setNewHint={setNewHint}
            setNewLevel={setNewLevel}
            addHint={addHint}
            deleteHint={deleteHint}
            editHint={editHint}
          />
        </div>
      </div>
    </div>
  );
}