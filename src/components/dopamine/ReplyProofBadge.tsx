"use client";

import { useState, useEffect } from "react";
import { DollarSign, TrendingUp } from "lucide-react";

const STYLE_STATS: Record<string, { earned: string; uses: string; rate: string }> = {
    "Short & Direct": { earned: "$12,400+", uses: "3,200+", rate: "72%" },
    "Detailed Value": { earned: "$18,900+", uses: "4,100+", rate: "68%" },
    "Curiosity Hook": { earned: "$21,300+", uses: "5,800+", rate: "81%" },
};

export function ReplyProofBadge({ style }: { style: string }) {
    const stats = STYLE_STATS[style];
    if (!stats) return null;

    return (
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border-dim/10">
            <div className="flex items-center gap-1">
                <DollarSign size={9} className="text-green-400" />
                <span className="text-[9px] text-green-400 font-bold">{stats.earned} earned</span>
            </div>
            <div className="flex items-center gap-1">
                <TrendingUp size={9} className="text-accent" />
                <span className="text-[9px] text-text-muted">{stats.rate} click rate</span>
            </div>
        </div>
    );
}
