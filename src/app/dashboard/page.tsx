"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, TrendingUp, BarChart3, Hash, ArrowRight, Play, Users, DollarSign, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { MilestoneTracker } from "@/components/dopamine/MilestoneTracker";
import { EarningsTestimonials } from "@/components/dopamine/EarningsTestimonials";
import { RollingEarningsCounter } from "@/components/dopamine/RollingEarningsCounter";
import { TrustBar } from "@/components/dopamine/TrustBar";

interface Stats {
    totalSearches: number;
    nichesAnalyzed: number;
    keywordVariations: number;
}

export default function DashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loadingStats, setLoadingStats] = useState(true);
    const router = useRouter();

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
            className="flex flex-col gap-8 max-w-5xl mx-auto w-full"
        >
            {/* Header */}
            <header className="flex flex-col gap-1">
                <h1 className="text-4xl text-text-primary font-black tracking-tight">
                    Home
                </h1>
                <p className="subtitle">
                    Follow the steps to find ads and create ready-to-use replies.
                </p>
            </header>

            {/* Rolling Earnings Counter */}
            <RollingEarningsCounter />

            {/* Community Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
                <div className="flex items-center gap-3 px-4 py-3 bg-green-500/5 border border-green-500/10 rounded-xl">
                    <DollarSign size={16} className="text-green-400" />
                    <span className="text-[12px] font-bold text-green-400">$47,200+ earned this month</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                    <Users size={16} className="text-blue-400" />
                    <span className="text-[12px] font-bold text-blue-400">2,847 active members right now</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-accent/5 border border-accent/10 rounded-xl">
                    <Zap size={16} className="text-accent" />
                    <span className="text-[12px] font-bold text-accent">14,300+ replies generated today</span>
                </div>
            </motion.div>

            {/* Video Section */}
            <div className="card-base overflow-hidden p-0!">
                <div className="relative w-full bg-[#0A0A0B]" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                        src="https://player.vimeo.com/video/1171466801?badge=0&autopause=0&player_id=0&app_id=58479"
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                        allowFullScreen
                        title="cashtap-intro"
                    />
                </div>
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

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`card-base flex flex-col gap-4 p-6 border ${stat.borderColor}`}
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
                                <span className={`text-3xl font-black ${stat.color}`}>
                                    {stat.value.toLocaleString()}
                                </span>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Milestone Tracker */}
            {!loadingStats && stats && (
                <MilestoneTracker totalSearches={stats.totalSearches} nichesAnalyzed={stats.nichesAnalyzed} />
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={() => router.push("/search")}
                    className="card-base p-6 flex items-center gap-4 hover:border-accent/40 transition-all group cursor-pointer"
                >
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-all">
                        <Search size={22} className="text-accent" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                        <span className="text-text-primary font-bold text-sm">Step 1: Enter Topic</span>
                        <span className="text-text-muted text-xs">Start by typing one topic</span>
                    </div>
                    <ArrowRight size={16} className="text-text-muted group-hover:text-accent transition-colors" />
                </button>

                <button
                    onClick={() => router.push("/radar")}
                    className="card-base p-6 flex items-center gap-4 hover:border-accent/40 transition-all group cursor-pointer"
                >
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-all">
                        <TrendingUp size={22} className="text-green-400" />
                    </div>
                    <div className="flex flex-col items-start gap-0.5 flex-1">
                        <span className="text-text-primary font-bold text-sm">Step 3: Find Ads</span>
                        <span className="text-text-muted text-xs">Pick the ads you want to use</span>
                    </div>
                    <ArrowRight size={16} className="text-text-muted group-hover:text-green-400 transition-colors" />
                </button>
            </div>

            {/* Testimonials */}
            <EarningsTestimonials />

            {/* Trust Bar */}
            <TrustBar />
        </motion.div>
    );
}
