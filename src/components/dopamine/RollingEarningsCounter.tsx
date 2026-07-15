"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp } from "lucide-react";

export function RollingEarningsCounter() {
    const [amount, setAmount] = useState(47283);

    useEffect(() => {
        const interval = setInterval(() => {
            setAmount(prev => prev + Math.floor(Math.random() * 18 + 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-3 sm:py-3.5 bg-green-500/5 border border-green-500/10 rounded-xl min-w-0"
        >
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0">
                <DollarSign size={20} className="text-green-400" />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Total Earned by Members This Month</span>
                <div className="flex flex-wrap items-center gap-2 min-w-0">
                    <motion.span
                        key={amount}
                        initial={{ opacity: 0.7, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl sm:text-2xl font-black text-green-400 tabular-nums"
                    >
                        ${amount.toLocaleString()}
                    </motion.span>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 rounded-full shrink-0">
                        <TrendingUp size={10} className="text-green-400" />
                        <span className="text-[9px] font-bold text-green-400">+$12/min</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
