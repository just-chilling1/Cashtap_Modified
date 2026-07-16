"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LazyIframe } from "@/components/ui/LazyIframe";

interface VideoModalProps {
    open: boolean;
    onClose: () => void;
    src: string;
    title: string;
}

export function VideoModal({ open, onClose, src, title }: VideoModalProps) {
    useEffect(() => {
        if (!open) return;

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-10"
                    onClick={onClose}
                >
                    <div className="absolute inset-0 bg-black/85" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10 w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close video"
                            className="absolute -top-11 right-0 sm:-top-12 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl bg-black shadow-[0_25px_80px_rgba(0,0,0,0.65)] border border-white/10">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <LazyIframe
                                    src={src}
                                    title={title}
                                    eager
                                    autoplay
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
