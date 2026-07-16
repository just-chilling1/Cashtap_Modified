"use client";

import { motion, useReducedMotion } from "framer-motion";

const PARTICLES = [
    { left: "8%", top: "18%", size: 2, delay: 0, duration: 11 },
    { left: "22%", top: "72%", size: 3, delay: 1.2, duration: 14 },
    { left: "38%", top: "28%", size: 2, delay: 2.4, duration: 12 },
    { left: "54%", top: "62%", size: 2.5, delay: 0.6, duration: 13 },
    { left: "68%", top: "16%", size: 2, delay: 3.1, duration: 15 },
    { left: "78%", top: "48%", size: 3, delay: 1.8, duration: 11 },
    { left: "88%", top: "78%", size: 2, delay: 0.3, duration: 14 },
    { left: "14%", top: "44%", size: 2.5, delay: 2.8, duration: 12 },
    { left: "46%", top: "86%", size: 2, delay: 1.5, duration: 13 },
    { left: "92%", top: "32%", size: 2, delay: 2.1, duration: 16 },
];

export function AuthAnimatedBackground() {
    const reduceMotion = useReducedMotion();

    return (
        <div
            aria-hidden
            className="absolute inset-0 overflow-hidden pointer-events-none"
        >
            {/* Soft base wash */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212, 175, 55, 0.06) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(212, 175, 55, 0.04) 0%, transparent 55%)",
                }}
            />

            {/* Slow-moving gold orbs */}
            <motion.div
                className="absolute -top-[18%] -left-[12%] w-[55%] h-[55%] rounded-full blur-[110px]"
                style={{ background: "rgba(212, 175, 55, 0.12)" }}
                animate={
                    reduceMotion
                        ? undefined
                        : {
                              x: [0, 60, -20, 0],
                              y: [0, 40, 80, 0],
                              scale: [1, 1.12, 0.95, 1],
                          }
                }
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-[20%] -right-[14%] w-[50%] h-[50%] rounded-full blur-[110px]"
                style={{ background: "rgba(212, 175, 55, 0.1)" }}
                animate={
                    reduceMotion
                        ? undefined
                        : {
                              x: [0, -50, 30, 0],
                              y: [0, -60, -20, 0],
                              scale: [1, 0.92, 1.1, 1],
                          }
                }
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute top-[35%] left-[40%] w-[35%] h-[35%] rounded-full blur-[100px]"
                style={{ background: "rgba(234, 179, 8, 0.06)" }}
                animate={
                    reduceMotion
                        ? undefined
                        : {
                              x: [0, 40, -40, 0],
                              y: [0, -30, 40, 0],
                              opacity: [0.5, 0.85, 0.45, 0.5],
                          }
                }
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Subtle drifting grid */}
            <motion.div
                className="absolute inset-[-20%] opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(212,175,55,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.9) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                    maskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 70% 60% at 50% 45%, black 20%, transparent 75%)",
                }}
                animate={
                    reduceMotion
                        ? undefined
                        : { x: [0, 28], y: [0, 28] }
                }
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating particles */}
            {!reduceMotion &&
                PARTICLES.map((p, i) => (
                    <motion.span
                        key={i}
                        className="absolute rounded-full bg-[#D4AF37]"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            boxShadow: "0 0 8px rgba(212, 175, 55, 0.45)",
                        }}
                        animate={{
                            y: [0, -18, 8, 0],
                            opacity: [0.15, 0.55, 0.25, 0.15],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
        </div>
    );
}
