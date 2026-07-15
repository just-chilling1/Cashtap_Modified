"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Clock, BadgeCheck } from "lucide-react";

interface Win {
    name: string;
    location: string;
    amount: string;
    niche: string;
    time: string;
}

const NAMES = [
    "Sarah M.", "James R.", "Maria L.", "Derek T.", "Ashley K.", "Carlos P.",
    "Priya N.", "Ryan B.", "Tonya W.", "Mike D.", "Jessica A.", "Brandon H.",
    "Nicole S.", "Tyler G.", "Jake F.", "Megan C.", "Kevin L.", "Rachel W.",
    "Omar J.", "Courtney B.", "Liam T.", "Olivia R.", "Nathan P.", "Sofia E."
];

const LOCATIONS = [
    "Texas", "Florida", "California", "New York", "Ohio", "Georgia", "UK",
    "Canada", "Australia", "Arizona", "Michigan", "Virginia", "Colorado"
];

const NICHES = [
    "weight loss", "crypto", "skincare", "dog food", "home gym", "keto diet",
    "supplements", "dating", "golf", "yoga mats", "VPNs", "gaming chairs"
];

function generateWin(): Win {
    return {
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        amount: `$${(Math.random() * 350 + 25).toFixed(0)}`,
        niche: NICHES[Math.floor(Math.random() * NICHES.length)],
        time: `${Math.floor(Math.random() * 55 + 2)}m ago`,
    };
}

const SEED_WINS: Win[] = [
    { name: "Sarah M.", location: "Texas", amount: "$142", niche: "weight loss", time: "3m ago" },
    { name: "James R.", location: "Florida", amount: "$89", niche: "crypto", time: "7m ago" },
    { name: "Maria L.", location: "UK", amount: "$215", niche: "skincare", time: "12m ago" },
    { name: "Derek T.", location: "Canada", amount: "$67", niche: "dog food", time: "18m ago" },
];

export function RecentWinsFeed() {
    const [wins, setWins] = useState<Win[]>(SEED_WINS);

    useEffect(() => {
        setWins(Array.from({ length: 4 }, generateWin));
        const interval = setInterval(() => {
            setWins(prev => [generateWin(), ...prev.slice(0, 3)]);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-green-400" />
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">Live Earnings Feed</span>
                <div className="ml-auto flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[9px] text-text-muted font-bold">LIVE</span>
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <AnimatePresence mode="popLayout">
                    {wins.map((w, i) => (
                        <motion.div
                            key={`${w.name}-${w.amount}-${i}`}
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 px-3 py-2 bg-green-500/5 border border-green-500/8 rounded-lg"
                        >
                            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                <DollarSign size={11} className="text-green-400" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[11px] text-white font-bold truncate">{w.name}</span>
                                    <BadgeCheck size={10} className="text-blue-400 shrink-0" />
                                    <span className="text-[9px] text-text-muted">· {w.location}</span>
                                </div>
                                <span className="text-[10px] text-text-muted">earned <strong className="text-green-400">{w.amount}</strong> from {w.niche} ads</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                                <Clock size={9} className="text-text-muted" />
                                <span className="text-[9px] text-text-muted">{w.time}</span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
