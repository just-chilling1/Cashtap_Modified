"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Brain, Radar, MessageSquare, Sparkles } from "lucide-react";

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

export function StartHereSection() {
    const router = useRouter();

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/20 via-accent/5 to-[#0c0c0e] p-5 sm:p-6 flex flex-col gap-5 min-w-0"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-16 w-52 h-52 rounded-full bg-accent/20 blur-3xl"
            />

            <div className="flex flex-col gap-2 relative z-10 min-w-0">
                <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full bg-accent/20 border border-accent/40">
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

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
                {STEPS.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.step}>
                            <button
                                type="button"
                                onClick={() => router.push(item.path)}
                                className="w-full h-full text-left rounded-xl border border-accent/20 bg-white/5 p-4 flex flex-col gap-3 min-h-11 transition-all group hover:border-accent/50 hover:bg-accent/10"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 text-accent">
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">
                                        Step {item.step}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1 min-w-0">
                                    <span className="text-sm font-bold text-white">{item.title}</span>
                                    <span className="text-[12px] text-text-secondary leading-snug">
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
