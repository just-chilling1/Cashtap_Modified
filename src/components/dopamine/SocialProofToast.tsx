"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Users, TrendingUp, Sparkles, CheckCircle2, Copy, Star, ShieldCheck } from "lucide-react";

const FIRST_NAMES = [
    "Sarah", "Mike", "James", "Emma", "David", "Lisa", "Chris", "Amy",
    "Ryan", "Jessica", "Brandon", "Ashley", "Tyler", "Nicole", "Jake",
    "Maria", "Kevin", "Rachel", "Alex", "Megan", "Carlos", "Priya",
    "Nathan", "Sofia", "Marcus", "Olivia", "Derek", "Hannah", "Liam",
    "Destiny", "Jayden", "Brianna", "Ethan", "Aaliyah", "Mason",
    "Tonya", "Greg", "Michelle", "Andre", "Kayla", "Jason", "Brittany",
    "Omar", "Tiffany", "Jordan", "Courtney", "Troy", "Angela", "Pedro"
];

const LOCATIONS = [
    "Texas", "Florida", "California", "New York", "Ohio", "Georgia",
    "UK", "Canada", "Australia", "Germany", "Netherlands", "Dubai",
    "Arizona", "Michigan", "Virginia", "Illinois", "Pennsylvania",
    "North Carolina", "Colorado", "Oregon", "Tennessee", "Indiana"
];

const NICHES = [
    "weight loss", "crypto", "skincare", "dog food", "home gym",
    "keto diet", "dropshipping", "real estate", "dating", "golf",
    "yoga mats", "air fryers", "VPNs", "gaming chairs", "supplements"
];

const ACTIONS = [
    { text: (n: string, l: string) => `${n} from ${l} just earned $${(Math.random() * 280 + 40).toFixed(0)} from one reply`, icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} earned $${(Math.random() * 150 + 15).toFixed(0)} commission`, icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} found ${Math.floor(Math.random() * 35 + 8)} high-value ads`, icon: TrendingUp, color: "text-accent", bg: "bg-accent/10" },
    { text: (n: string, l: string) => `${n} from ${l} just generated AI replies for "${NICHES[Math.floor(Math.random() * NICHES.length)]}"`, icon: Sparkles, color: "text-blue-400", bg: "bg-blue-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} completed all 4 steps`, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} copied 5 replies in the last 10 minutes`, icon: Copy, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} found a trending "${NICHES[Math.floor(Math.random() * NICHES.length)]}" ad`, icon: TrendingUp, color: "text-orange-400", bg: "bg-orange-500/10" },
    { text: () => `${Math.floor(Math.random() * 50 + 18)} people are using the app right now`, icon: Users, color: "text-purple-400", bg: "bg-purple-500/10" },
    { text: () => `${Math.floor(Math.random() * 200 + 50)} replies copied in the last hour`, icon: Copy, color: "text-blue-400", bg: "bg-blue-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} left a 5-star review`, icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { text: (n: string, l: string) => `${n} from ${l} just hit $1,000 this week`, icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
    { text: () => `New member just joined from ${LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]}`, icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

export function SocialProofToast({ paused = false }: { paused?: boolean }) {
    const [current, setCurrent] = useState<{ text: string; icon: typeof DollarSign; color: string; bg: string } | null>(null);
    const [visible, setVisible] = useState(false);

    const showNext = useCallback(() => {
        if (paused) return;
        const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
        const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
        setCurrent({ text: action.text(name, loc), icon: action.icon, color: action.color, bg: action.bg });
        setVisible(true);
        setTimeout(() => setVisible(false), 5000);
    }, [paused]);

    useEffect(() => {
        if (paused) { setVisible(false); return; }
        const initialDelay = setTimeout(() => showNext(), 5000);
        const interval = setInterval(() => showNext(), 15000 + Math.random() * 10000);
        return () => { clearTimeout(initialDelay); clearInterval(interval); };
    }, [showNext, paused]);

    return (
        <AnimatePresence>
            {visible && current && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: 20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 20, x: 20 }}
                    className="fixed bottom-20 left-4 right-4 z-50 max-w-sm md:bottom-6 md:right-6 md:left-auto"
                >
                    <div className="bg-[#111113] border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-w-0">
                        <div className={`w-10 h-10 rounded-xl ${current.bg} flex items-center justify-center shrink-0`}>
                            <current.icon size={18} className={current.color} />
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <p className="text-[13px] text-white font-medium leading-snug break-words">{current.text}</p>
                            <span className="text-[10px] text-text-muted">Just now · Verified</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
