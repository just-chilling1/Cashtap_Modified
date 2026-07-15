"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Users, TrendingUp, Flame } from "lucide-react";

const URGENCY_MESSAGES = [
    { icon: Users, text: "37 members are searching right now", color: "text-blue-400" },
    { icon: TrendingUp, text: "This topic is trending — act fast", color: "text-green-400" },
    { icon: Flame, text: "High demand detected — ads filling up", color: "text-orange-400" },
    { icon: Clock, text: "Best time to find fresh ads is now", color: "text-purple-400" },
];

export function UrgencyBanner() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setIndex(Math.floor(Math.random() * URGENCY_MESSAGES.length));
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % URGENCY_MESSAGES.length);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    const msg = URGENCY_MESSAGES[index];
    const Icon = msg.icon;

    return (
        <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/3 border border-white/5 rounded-lg w-fit"
        >
            <Icon size={12} className={msg.color} />
            <span className="text-[11px] font-medium text-text-secondary">{msg.text}</span>
        </motion.div>
    );
}
