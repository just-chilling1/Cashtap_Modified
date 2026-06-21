"use client";

import { AlertCircle } from "lucide-react";
import { clsx } from "clsx";

export function InlineError({
    message,
    className,
}: {
    message: string;
    className?: string;
}) {
    if (!message) return null;

    return (
        <div
            role="alert"
            className={clsx(
                "flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300",
                className
            )}
        >
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-400" />
            <span className="leading-snug">{message}</span>
        </div>
    );
}
