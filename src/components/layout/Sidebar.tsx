"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid, Radar, LogOut, ChevronRight, GraduationCap, Target, Sparkles, Rocket, Scan, Search, MessageSquare, Brain, TrendingUp, ExternalLink } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { LiveActivityTicker } from "../dopamine/LiveActivityTicker";

const STEPS = [
    { path: "/dashboard", label: "Home", icon: LayoutGrid },
    { path: "/search", label: "Step 1: Enter Topic", icon: Search },
    { path: "/analysis", label: "Step 2: Check Demand", icon: Brain },
    { path: "/radar", label: "Step 3: Find Ads", icon: Radar },
    { path: "/replies", label: "Step 4: Create Replies", icon: MessageSquare },
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/scale-training", label: "Scale to $1k–$5k/day", icon: TrendingUp },
];

const UPGRADES = [
    { path: "/dfy", label: "Done-For-You", icon: Scan },
    { path: "/instant", label: "Instant Income", icon: Sparkles },
    { path: "/autopilot", label: "Automated Profits", icon: Rocket },
];

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const { resetSession } = useSearch();
    const currentIndex = STEPS.findIndex(s => s.path === pathname);
    const progress = ((currentIndex + 1) / STEPS.length) * 100;

    return (
        <aside
            className={clsx(
                "w-72 bg-[#050505] border-r border-[#141414] flex flex-col relative shrink-0 h-screen overflow-hidden",
                "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:translate-x-0",
                open ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Dynamic Progress Line */}
            <div className="absolute left-0 top-0 w-0.5 h-full bg-[#141414] z-0">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${progress}%` }}
                    className="w-full bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    transition={{ duration: 1, ease: "circOut" }}
                />
            </div>

            <div className="flex flex-col p-6 gap-10 relative z-10 h-full">
                <Link href="/dashboard" onClick={onClose} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-accent flex items-center justify-center rounded-lg shadow-gold">
                        <Target size={22} className="text-black" />
                    </div>
                    <div className="flex flex-col">
                        <span className="brand-font text-[22px] text-text-primary tracking-tight leading-none">CashTap AI</span>
                        <span className="text-[10px] font-bold text-text-muted mt-1">Simple AI Ad Helper</span>
                    </div>
                </Link>

                {/* Command Navigation */}
                <nav className="flex flex-col gap-2 w-full flex-1 overflow-y-auto no-scrollbar pb-10">
                    <div className="flex flex-col gap-2 mb-6">
                        <span className="text-[10px] font-black tracking-[0.3em] text-[#475569] uppercase px-5 mb-2">Navigation</span>
                        {STEPS.map((step) => {
                            const isActive = pathname === step.path;
                            const Icon = step.icon;

                            return (
                                <Link
                                    key={step.path}
                                    href={step.path}
                                    onClick={onClose}
                                    className={clsx(
                                        "command-nav-link group py-4 whitespace-nowrap",
                                        isActive && "active"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon size={18} className={clsx(isActive ? "text-accent" : "text-text-muted group-hover:text-text-primary")} />
                                        <span className="brand-font tracking-wide text-sm font-medium">{step.label}</span>
                                    </div>
                                    {isActive && <ChevronRight size={14} className="text-accent ml-auto" />}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Promo Offers */}
                    <div className="flex flex-col mx-2 mt-2 gap-2.5">
                        {[
                            { title: "Earn $400/Day Testing New Apps", url: "https://jvz4.com/c/3547097/442443/" },
                            { title: "Get Paid To Copy & Paste", url: "https://jvz1.com/c/3547097/442055/" },
                            { title: "Fast Cash Training", url: "https://www.breakoutai.net/5k-passive-9" },
                        ].map((promo, i) => (
                            <a
                                key={i}
                                href={promo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0A0A0B] border border-accent/25 hover:border-accent/50 transition-all duration-300 group"
                            >
                                <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="brand-font text-[13px] font-semibold text-accent leading-tight">{promo.title}</span>
                                    <span className="text-[10px] text-text-muted font-medium">Claim Now</span>
                                </div>
                                <div className="w-8 h-8 rounded-lg border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                    <ExternalLink size={14} className="text-accent" />
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col mx-2 mt-4">
                        <div className="bg-[#0A0A0B] border border-accent/20 rounded-[14px] p-4 flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                            <div className="flex items-center gap-2 mb-1 px-1">
                                <Sparkles className="text-accent" size={16} strokeWidth={2} />
                                <span className="text-[11px] font-bold tracking-[0.15em] text-accent uppercase">Premium Features</span>
                            </div>

                            {UPGRADES.map((step) => {
                                const isActive = pathname === step.path;
                                const Icon = step.icon;

                                return (
                                    <Link
                                        key={step.path}
                                        href={step.path}
                                        onClick={onClose}
                                        className={clsx(
                                            "flex items-center justify-center gap-3 py-3.5 rounded-full transition-all duration-300 border",
                                            isActive
                                                ? "bg-accent/10 border-accent/40 text-accent"
                                                : "bg-[#111111] border-white/5 text-text-muted hover:border-white/10 hover:text-white"
                                        )}
                                    >
                                        <Icon size={16} strokeWidth={1.5} className={clsx(isActive ? "text-accent" : "")} />
                                        <span className="text-[14px] font-medium tracking-wide">{step.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-auto pt-6">
                        <LiveActivityTicker />
                        <button
                            onClick={resetSession}
                            className="command-nav-link group py-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 whitespace-nowrap"
                        >
                            <div className="flex items-center gap-4">
                                <LogOut size={18} />
                                <span className="brand-font tracking-wide text-sm font-medium">Logout</span>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </aside>
    );
}
