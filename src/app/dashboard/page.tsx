"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, BarChart3, Hash, ArrowRight, Play, Users, Zap, GraduationCap, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { MilestoneTracker } from "@/components/dopamine/MilestoneTracker";
import { EarningsTestimonials } from "@/components/dopamine/EarningsTestimonials";
import { RollingEarningsCounter } from "@/components/dopamine/RollingEarningsCounter";
import { TrustBar } from "@/components/dopamine/TrustBar";
import { VideoEmbed } from "@/components/ui/LazyIframe";
import { StartHereSection } from "@/components/dashboard/StartHereSection";
import { useSearch } from "@/context/SearchContext";

interface Stats {
    totalSearches: number;
    nichesAnalyzed: number;
    keywordVariations: number;
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

function CountUp({ value, className }: { value: number; className?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (value === 0) {
            setDisplay(0);
            return;
        }
        const duration = 800;
        const start = performance.now();
        let frame: number;
        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, value]);

    return (
        <span ref={ref} className={className}>
            {display.toLocaleString()}
        </span>
    );
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);
    const [greeting, setGreeting] = useState("Welcome back");
    const router = useRouter();
    const { keyword, analysisByVariation, postsByVariation, selectedAds, repliesByPostId } = useSearch();

    const stepDone = [
        keyword.trim().length > 0,
        Object.keys(analysisByVariation).length > 0,
        selectedAds.length > 0 || Object.values(postsByVariation).some((posts) => posts.length > 0),
        Object.keys(repliesByPostId).length > 0,
    ];
    const completedSteps = stepDone.findIndex((done) => !done) === -1 ? 4 : stepDone.findIndex((done) => !done);

    useEffect(() => {
        setGreeting(getGreeting());
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.includes("error=") && (hash.includes("otp_expired") || hash.includes("access_denied") || hash.includes("recovery"))) {
            const hashParams = new URLSearchParams(hash.substring(1));
            const errorDesc = hashParams.get("error_description") || "This password reset link has expired or is invalid.";
            router.replace(`/reset-password?error=${encodeURIComponent(errorDesc.replace(/\+/g, " "))}`);
            return;
        }
    }, [router]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resp = await fetch("/api/stats");
                const data = await resp.json();
                setStats(data);
            } catch (e) {
                console.error("Failed to fetch stats:", e);
                setStats({ totalSearches: 0, nichesAnalyzed: 0, keywordVariations: 0 });
            } finally {
                setLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: "Your Searches",
            value: stats?.totalSearches ?? 0,
            icon: Search,
            color: "text-accent",
            bgColor: "bg-accent/10",
            borderColor: "border-accent/20",
        },
        {
            label: "Topics Checked",
            value: stats?.nichesAnalyzed ?? 0,
            icon: BarChart3,
            color: "text-green-400",
            bgColor: "bg-green-500/10",
            borderColor: "border-green-500/20",
        },
        {
            label: "Ads Found",
            value: stats?.keywordVariations ?? 0,
            icon: Hash,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
            borderColor: "border-blue-500/20",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-stack"
        >
            <header className="flex flex-col gap-1">
                <h1 className="page-title" suppressHydrationWarning>
                    {greeting}
                </h1>
                <p className="subtitle">
                    {completedSteps === 0
                        ? "Follow the 4 steps below to get your first ready-to-use replies."
                        : completedSteps >= 4
                          ? "Nice work — your replies are ready. Start a new topic anytime."
                          : `You're on step ${completedSteps + 1} of 4. Pick up where you left off.`}
                </p>
            </header>

            <StartHereSection completedSteps={completedSteps} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <RollingEarningsCounter />
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-3"
                >
                    <div className="flex items-center gap-2.5 px-3 py-3 bg-blue-500/5 border border-blue-500/10 rounded-xl min-w-0">
                        <Users size={15} className="text-blue-400 shrink-0" />
                        <span className="text-[11px] font-bold text-blue-400 leading-tight">2,847 members active now</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-3 bg-accent/5 border border-accent/10 rounded-xl min-w-0">
                        <Zap size={15} className="text-accent shrink-0" />
                        <span className="text-[11px] font-bold text-accent leading-tight">14,300+ replies today</span>
                    </div>
                </motion.div>
            </div>

            <div className="card-base overflow-hidden p-0!">
                <VideoEmbed
                    src="https://player.vimeo.com/video/1171466801?badge=0&autopause=0&player_id=0&app_id=58479"
                    title="cashtap-intro"
                    poster="/training/watch-training-dashboard.png"
                />
                <div className="p-5 border-t border-border-dim/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Play size={14} className="text-accent" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-text-primary font-bold">Get Started in 3 Minutes</span>
                            <span className="text-xs text-text-muted">Learn how to find ads and create replies</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`card-base flex flex-col gap-4 p-6 border ${stat.borderColor} hover:border-opacity-60 transition-colors`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{stat.label}</span>
                                <div className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                                    <Icon size={18} className={stat.color} />
                                </div>
                            </div>
                            {loadingStats ? (
                                <div className="h-9 w-20 bg-border-dim/30 rounded-lg animate-pulse" />
                            ) : (
                                <CountUp value={stat.value} className={`text-3xl font-black tabular-nums ${stat.color}`} />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {!loadingStats && stats && (
                <MilestoneTracker totalSearches={stats.totalSearches} nichesAnalyzed={stats.nichesAnalyzed} />
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => router.push("/training")}
                    className="card-base p-6 flex items-center gap-4 hover:border-accent/40 transition-all group cursor-pointer"
                >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all">
                        <GraduationCap size={22} className="text-accent" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                        <span className="text-text-primary font-bold text-sm">Watch the Training</span>
                        <span className="text-text-muted text-xs">Step-by-step videos to master the system</span>
                    </div>
                    <ArrowRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                </button>

                <button
                    onClick={() => router.push("/scale-training")}
                    className="card-base p-6 flex items-center gap-4 hover:border-green-500/40 transition-all group cursor-pointer"
                >
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-all">
                        <TrendingUp size={22} className="text-green-400" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                        <span className="text-text-primary font-bold text-sm">Scale to $1k&ndash;$5k/day</span>
                        <span className="text-text-muted text-xs">Advanced training for bigger results</span>
                    </div>
                    <ArrowRight size={16} className="text-text-muted group-hover:text-green-400 transition-colors" />
                </button>
            </div>

            <EarningsTestimonials />

            <TrustBar />
        </motion.div>
    );
}
