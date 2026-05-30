"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, DollarSign, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

const WITHDRAW_URL = "http://go.profitwithphone.com/habit?aid=3497609";
const SESSION_KEY = "cashtap_withdraw_shown";

export function WithdrawPopup({ onVisibilityChange }: { onVisibilityChange?: (visible: boolean) => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem(SESSION_KEY)) return;

        const timer = setTimeout(() => {
            sessionStorage.setItem(SESSION_KEY, "1");
            setVisible(true);
            onVisibilityChange?.(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, [onVisibilityChange]);

    const handleClose = () => {
        setVisible(false);
        onVisibilityChange?.(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 80, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed bottom-6 left-6 z-[60] w-[380px] max-w-[calc(100vw-3rem)]"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-[#0c0e0c] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(34,197,94,0.15)]">
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleClose(); }}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-white transition-all z-20 cursor-pointer"
                        >
                            <X size={14} />
                        </button>

                        <div className="relative z-10 p-6 flex flex-col gap-4">
                            {/* Status badge */}
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                />
                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Account Verified</span>
                            </div>

                            {/* Main content */}
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                                    <h3 className="text-lg font-black text-white leading-tight">
                                        Congratulations!
                                    </h3>
                                </div>
                                <p className="text-[15px] text-white font-bold">
                                    You&apos;re Eligible To Withdraw{" "}
                                    <span className="text-green-400 text-xl">$214.36</span>
                                </p>
                            </div>

                            {/* Details */}
                            <div className="flex items-center gap-3 text-[10px] text-text-muted">
                                <div className="flex items-center gap-1">
                                    <ShieldCheck size={10} className="text-green-400" />
                                    <span>Verified Balance</span>
                                </div>
                                <span>·</span>
                                <span>Ref: HX-29459-9022</span>
                            </div>

                            {/* CTA button */}
                            <motion.a
                                href={WITHDRAW_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleClose}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center justify-center gap-2.5 w-full h-12 bg-green-500 hover:bg-green-400 text-black font-black text-sm uppercase tracking-wider rounded-xl transition-colors shadow-[0_4px_20px_rgba(34,197,94,0.3)]"
                            >
                                <DollarSign size={18} />
                                <span>Withdraw Now</span>
                                <ArrowRight size={16} />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
