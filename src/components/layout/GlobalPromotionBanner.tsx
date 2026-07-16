"use client";

import React, { useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";
import { motion } from "framer-motion";

const CTA_URL = "https://www.breakoutai.net/5k-passive-9";

export function GlobalPromotionBanner() {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full min-w-0 pt-4 pb-4 -mt-4 mb-6"
        >
            <div className="relative overflow-hidden rounded-xl bg-[#0A0A0B] border border-accent/25 p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-accent shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
                />

                <button
                    type="button"
                    onClick={() => setIsDismissed(true)}
                    aria-label="Close promotion"
                    className="absolute top-2.5 right-2.5 z-20 flex h-9 w-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                    <X size={18} strokeWidth={2} />
                </button>

                <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:gap-5 lg:gap-6 pr-8">
                    <div className="hidden md:flex shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
                            <Play size={22} className="text-accent fill-accent/20 ml-0.5" strokeWidth={2} />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                            Free member training
                        </span>
                        <h2 className="brand-font text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight break-words leading-snug">
                            Scale to $1K–$5K/day with full workflow automation
                        </h2>
                        <p className="max-w-xl text-sm sm:text-[15px] leading-relaxed text-text-muted">
                            Watch the free member training that shows how to automate CashTap end to end.
                        </p>
                    </div>

                    <div className="shrink-0 md:pl-2">
                        <a
                            href={CTA_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-full sm:w-auto md:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm sm:text-[15px] font-bold text-black shadow-gold transition-all hover:bg-yellow-500 hover:shadow-[0_0_28px_rgba(212,175,55,0.28)] active:scale-[0.98]"
                        >
                            <span className="brand-font tracking-wide">Watch free training</span>
                            <ArrowRight
                                size={16}
                                className="transition-transform group-hover:translate-x-0.5"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
