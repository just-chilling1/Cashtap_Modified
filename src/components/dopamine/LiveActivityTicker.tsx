"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, Users } from "lucide-react";

const TICKER_MESSAGES = [
    "12 users earning right now",
    "47 replies generated today",
    "Sarah just earned $87",
    "New trending ads found",
    "Ryan completed Step 4",
    "Emma earned $214 today",
    "Jake found 31 ads",
    "Maria generated 9 replies",
    "$320 earned in last hour",
    "Brandon copied 7 replies",
    "Ashley found 18 crypto ads",
    "New member from Texas",
    "Tyler earned $156 today",
    "92 ads found this hour",
    "Lisa hit $1K this week",
];

export function LiveActivityTicker() {
    const [index, setIndex] = useState(0);
    const [onlineCount] = useState(() => Math.floor(Math.random() * 30 + 18));

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % TICKER_MESSAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                <Users size={11} className="text-blue-400 shrink-0" />
                <span className="text-[10px] font-bold text-blue-400">{onlineCount} members online</span>
                <Circle size={5} className="text-green-400 fill-green-400 animate-pulse ml-auto shrink-0" />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/5 border border-green-500/10 rounded-lg overflow-hidden">
                <Circle size={5} className="text-green-400 fill-green-400 shrink-0 animate-pulse" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-[10px] font-bold text-green-400 uppercase tracking-widest whitespace-nowrap"
                    >
                        {TICKER_MESSAGES[index]}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
