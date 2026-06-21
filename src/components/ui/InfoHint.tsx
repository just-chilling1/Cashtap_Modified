"use client";

import { useEffect, useId, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { clsx } from "clsx";

export function InfoHint({
    text,
    label = "More info",
    className,
}: {
    text: string;
    label?: string;
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLSpanElement>(null);
    const tipId = useId();

    useEffect(() => {
        if (!open) return;

        const handlePointer = (e: PointerEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("pointerdown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    return (
        <span
            ref={wrapRef}
            className={clsx("relative inline-flex items-center align-middle", className)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                aria-label={label}
                aria-expanded={open}
                aria-describedby={open ? tipId : undefined}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpen((v) => !v);
                }}
                className="inline-flex items-center justify-center w-6 h-6 -m-1 text-text-muted hover:text-accent focus:text-accent outline-none focus-visible:ring-1 focus-visible:ring-accent/40 rounded-full transition-colors cursor-help"
            >
                <HelpCircle size={14} />
            </button>

            {open && (
                <span
                    id={tipId}
                    role="tooltip"
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-60 max-w-[15rem] px-3 py-2 bg-[#0A0A0B] border border-accent/25 rounded-lg text-[12px] leading-snug text-text-secondary shadow-xl pointer-events-none"
                >
                    {text}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-[#0A0A0B] border-r border-b border-accent/25 rotate-45" />
                </span>
            )}
        </span>
    );
}
