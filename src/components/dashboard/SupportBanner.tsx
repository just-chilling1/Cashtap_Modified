"use client";

import { motion } from "framer-motion";
import { Headphones, Star, Clock, ShieldCheck } from "lucide-react";

export function SupportBanner() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 px-4 sm:px-6 py-5 rounded-[14px] border border-white/5 bg-[#090b0f] transition-all duration-300 w-full mt-8 shrink-0 min-w-0"
        >
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 sm:gap-5">
                <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                    <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center shrink-0 border border-accent/30 bg-accent/5">
                        <Headphones size={24} strokeWidth={1.5} className="text-accent" />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <h3 className="text-[17px] font-bold text-white tracking-tight">Need Help?</h3>
                        <p className="text-[#848795] text-[14px]">
                            Our support team is here for you 24/7
                        </p>
                    </div>
                </div>

                <a
                    href="mailto:cashtapai@neoai.freshdesk.com"
                    className="bg-accent hover:bg-[#e6a800] transition-colors rounded-full min-h-11 h-[42px] px-7 whitespace-nowrap text-black font-bold text-[14px] flex items-center justify-center w-full md:w-auto shrink-0"
                >
                    Contact Support
                </a>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                    <Clock size={10} className="text-green-400" />
                    <span>Avg response: <strong className="text-green-400">under 2 hours</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                    <Star size={10} className="text-accent fill-accent" />
                    <span>4.9/5 support rating</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                    <ShieldCheck size={10} className="text-blue-400" />
                    <span>98% satisfaction rate</span>
                </div>
            </div>
        </motion.div>
    );
}
