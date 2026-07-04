"use client";

import { useState } from "react";
import { FaUser, FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/auth";
import { IMentee } from "@/src/core/domain/mentee";
import ProfileModal from "@/src/components/profile/ProfileModal";

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

            <div>
                <div className="flex items-center gap-2">
                    <FaUser size={16} style={{ color: "#4a9eff" }} />
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
                </div>

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

export interface MentorPanelProps {
    mentor: {
        studentId: string;
        nickname?: string | null;
        mentee: IMentee | null;
    };
}

export default function MentorPanel({ mentor }: MentorPanelProps) {
    const router = useRouter();
    const { logout } = useUserStore();
    const [profileOpen, setProfileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    const firstTwo =
        mentor.studentId.length >= 2 ? mentor.studentId.slice(0, 2) : "";
    const rest =
        mentor.studentId.length >= 2
            ? mentor.studentId.slice(2)
            : mentor.studentId;

    return (
        <div
            className="backroom-col-left"
            style={{
                border: "1px solid rgba(140,170,80,0.18)",
                borderRadius: "6px",
                backgroundColor: "rgba(10, 14, 8, 0.55)",
                padding: "45px 30px",
                boxShadow: "inset 0 0 40px rgba(140,170,80,0.04)",
            }}
        >
            <div style={{ marginBottom: "8px" }}>
                <div
                    style={{
                        fontSize: "12px",
                        color: "#8faa55",
                        margin: "0 0 28px",
                        fontFamily: "monospace",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                        }}
                    >
                        <span>Logged in as</span>
                        <div style={{ display: "flex", gap: "6px" }}>
                            <button
                                onClick={() => setProfileOpen(true)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    background: "rgba(112, 136, 64, 0.12)",
                                    border: "1px solid rgba(112,136,64,0.35)",
                                    borderRadius: "2px",
                                    color: "#a8c060",
                                    fontSize: "10px",
                                    fontFamily: "monospace",
                                    padding: "3px 8px",
                                    cursor: "pointer",
                                }}
                            >
                                <FaPencilAlt size={9} /> EDIT
                            </button>
                            <button
                                onClick={handleLogout}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    background: "rgba(138, 48, 32, 0.12)",
                                    border: "1px solid rgba(138,48,32,0.35)",
                                    borderRadius: "2px",
                                    color: "#e8a090",
                                    fontSize: "10px",
                                    fontFamily: "monospace",
                                    padding: "3px 8px",
                                    cursor: "pointer",
                                }}
                            >
                                <FaSignOutAlt size={9} /> LOGOUT
                            </button>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            flexDirection: "column",
                        }}
                    >
                        {/* Mentor NAME Badge */}
                        {mentor.nickname && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "6px",
                                    padding: "6px 12px",
                                    border: "1px solid rgba(168, 192, 96, 0.3)",
                                    backgroundColor: "rgba(168, 192, 96, 0.08)",
                                    borderRadius: "4px",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "10px",
                                        color: "#a8c060",
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
                                        fontFamily: "'Share Tech Mono', monospace",
                                        color: "#d8e8b8",
                                        fontWeight: 600,
                                        lineHeight: 1,
                                    }}
                                >
                                    {mentor.nickname}
                                </span>
                            </div>
                        )}

                        {/* Mentor ID Badge */}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "baseline",
                                gap: "6px",
                                padding: "6px 12px",
                                border: "1px solid rgba(212, 92, 42, 0.3)",
                                backgroundColor: "rgba(212, 92, 42, 0.08)",
                                borderRadius: "4px",
                            }}
                        >
                            <span
                                style={{
                                    fontSize: "10px",
                                    color: "#d45c2a",
                                    fontWeight: 700,
                                    letterSpacing: "1px",
                                    lineHeight: 1,
                                }}
                            >
                                ID
                            </span>

                            <span
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    lineHeight: 1,
                                }}
                            >
                                {firstTwo && <span style={{ color: "#d45c2a" }}>{firstTwo}</span>}
                                <span style={{ color: "#c8d4a8" }}>{rest}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p
                style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#708840",
                    fontFamily: "monospace",
                    margin: "0 0 12px",
                }}
            >
                [ MENTEE STATUS ]
            </p>
            <JuniorCard junior={mentor.mentee} />

            {profileOpen && (
                <ProfileModal onClose={() => setProfileOpen(false)} />
            )}
        </div>
    );
}