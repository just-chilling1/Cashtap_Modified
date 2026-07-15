"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Search,
    Brain,
    Radar,
    MessageSquare,
    ArrowRight,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import { clsx } from "clsx";

const STEPS = [
    {
        step: 1,
        title: "Enter a topic",
        description: "Type one niche you want to promote.",
        path: "/search",
        icon: Search,
    },
    {
        step: 2,
        title: "Check demand",
        description: "See which angles have real activity.",
        path: "/analysis",
        icon: Brain,
    },
    {
        step: 3,
        title: "Find ads",
        description: "Pick live posts people are engaging with.",
        path: "/radar",
        icon: Radar,
    },
    {
        step: 4,
        title: "Create replies",
        description: "Copy AI replies, add your link, earn.",
        path: "/replies",
        icon: MessageSquare,
    },
] as const;

interface StartHereSectionProps {
    /** How far the user has gotten (0 = brand new). */
    completedSteps?: number;
}

export function StartHereSection({ completedSteps = 0 }: StartHereSectionProps) {
    const router = useRouter();
    const nextStep = Math.min(completedSteps + 1, STEPS.length);
    const primary = STEPS[Math.min(completedSteps, STEPS.length - 1)];

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-[#0c0c0e] to-[#0c0c0e] p-5 sm:p-6 flex flex-col gap-5 min-w-0"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 relative z-10 min-w-0">
                <div className="flex flex-col gap-2 min-w-0">
                    <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25">
                        <Sparkles size={12} className="text-accent" />
                        <span className="text-[10px] font-black text-accent uppercase tracking-[0.18em]">
                            Start Here
                        </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight break-words">
                        Your first earning path
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                        Follow these 4 steps once. Most members get their first ready-to-post replies in under 10 minutes.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => router.push(primary.path)}
                    className="btn-primary h-11 px-5 text-sm rounded-xl shrink-0 w-full sm:w-auto shadow-gold"
                >
                    <span>
                        {completedSteps === 0
                            ? "Start Step 1"
                            : completedSteps >= STEPS.length
                              ? "Open Search"
                              : `Continue Step ${nextStep}`}
                    </span>
                    <ArrowRight size={16} />
                </button>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
                {STEPS.map((item, i) => {
                    const Icon = item.icon;
                    const done = i < completedSteps;
                    const current = i === completedSteps;

                    return (
                        <li key={item.step}>
                            <button
                                type="button"
                                onClick={() => router.push(item.path)}
                                className={clsx(
                                    "w-full h-full text-left rounded-xl border p-4 flex flex-col gap-3 min-h-11 transition-all group",
                                    done && "bg-green-500/5 border-green-500/20 hover:border-green-500/40",
                                    current && "bg-accent/10 border-accent/40 hover:border-accent/60 shadow-[0_0_24px_rgba(234,179,8,0.08)]",
                                    !done && !current && "bg-[#0a0a0c] border-border-dim/40 hover:border-accent/25"
                                )}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div
                                        className={clsx(
                                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                                            done && "bg-green-500/15 text-green-400",
                                            current && "bg-accent/20 text-accent",
                                            !done && !current && "bg-white/5 text-text-muted group-hover:text-text-primary"
                                        )}
                                    >
                                        {done ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                                    </div>
                                    <span
                                        className={clsx(
                                            "text-[10px] font-black uppercase tracking-widest",
                                            done && "text-green-400",
                                            current && "text-accent",
                                            !done && !current && "text-text-muted"
                                        )}
                                    >
                                        Step {item.step}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-sm font-bold text-white">{item.title}</span>
                                    <span className="text-[12px] text-text-muted leading-snug">
                                        {item.description}
                                    </span>
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ol>
        </motion.section>
    );
}
