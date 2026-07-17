"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA_URL = "https://www.breakoutai.net/5k-passive-9";

export default function ScaleTrainingPage() {
    return (
        <div className="page-stack">
            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center text-center gap-6"
            >
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2">
                    <Sparkles size={14} className="text-accent" />
                    <span className="text-xs font-bold text-accent uppercase tracking-[0.15em]">Exclusive Training</span>
                </div>

                <h1 className="brand-font text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
                    Scale Your{" "}
                    <span className="text-accent">CashTap AI</span>
                    {" "}To $1,000+ Per Day
                </h1>

                <p className="subtitle max-w-xl">
                    Watch this exclusive training to multiply your results and automate your path to life-changing income.
                </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
            >
                <a
                    href={CTA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-3 bg-accent hover:bg-blue-400 text-white font-bold text-base sm:text-lg px-6 py-4 sm:px-10 sm:py-5 rounded-xl transition-all shadow-gold hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] w-full max-w-md sm:w-auto"
                >
                    <span className="brand-font tracking-wide">Click Here To Access Training</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>
        </div>
    );
}
