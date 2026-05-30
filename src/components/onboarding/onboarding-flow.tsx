"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Loader2,
    Check,
    Sparkles,
    Star,
    Shield,
    Smartphone,
    Globe,
    CheckCircle2,
    Target,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
    onboardingContent,
    ONBOARDING_BETA_QUALIFICATION_CTA_URL,
    ONBOARDING_DASHBOARD_ROUTE,
    ONBOARDING_META_KEY,
    ONBOARDING_PRODUCT_NAME,
} from "@/config/onboarding-content";

const PAGE_BG = "#0A0A0F";

const CONFETTI_COLORS = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#FACC15",
    "#22D3EE",
];

interface ConfettiParticle {
    id: number;
    left: number;
    delay: number;
    duration: number;
    color: string;
    shape: 0 | 1 | 2;
    rotate: number;
    drift: number;
}

function buildConfettiParticles(count: number): ConfettiParticle[] {
    const particles: ConfettiParticle[] = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            id: i,
            left: ((i * 17 + (i * i) * 3) % 100),
            delay: ((i * 13) % 40) / 10,
            duration: 4 + ((i % 3) * 1.5),
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            shape: (i % 3) as 0 | 1 | 2,
            rotate: ((i * 23) % 360),
            drift: ((i * 7) % 40) - 20,
        });
    }
    return particles;
}

function ConfettiBackdrop() {
    const particles = useMemo(() => buildConfettiParticles(56), []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
            {particles.map((p) => {
                const isDot = p.shape === 2;
                const width = isDot ? 6 : p.shape === 1 ? 4 : 8;
                const height = isDot ? 6 : p.shape === 1 ? 12 : 6;
                return (
                    <motion.span
                        key={p.id}
                        initial={{ y: -40, opacity: 0, rotate: p.rotate }}
                        animate={{
                            y: ["-5%", "105%"],
                            x: [0, p.drift, 0],
                            opacity: [0, 1, 1, 0],
                            rotate: [p.rotate, p.rotate + 360],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: `${p.left}%`,
                            width,
                            height,
                            backgroundColor: p.color,
                            borderRadius: isDot ? 999 : 2,
                            boxShadow: `0 0 8px ${p.color}55`,
                        }}
                    />
                );
            })}
        </div>
    );
}

interface IndigoButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit";
    fullWidth?: boolean;
}

function IndigoButton({
    onClick,
    disabled,
    children,
    type = "button",
    fullWidth = true,
}: IndigoButtonProps) {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            whileHover={disabled ? undefined : { scale: 1.01 }}
            whileTap={disabled ? undefined : { scale: 0.98 }}
            className={[
                fullWidth ? "w-full" : "",
                "rounded-2xl py-3.5 md:py-4 px-6",
                "text-sm md:text-base font-bold tracking-wide",
                "transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
                disabled
                    ? "bg-zinc-800 text-zinc-500 shadow-none cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_10px_30px_rgba(99,102,241,0.45)]",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {children}
        </motion.button>
    );
}

interface PreparingRow {
    label: string;
    description: string;
    completed: boolean;
}

function PreparingStep({ onContinue }: { onContinue: () => void }) {
    const [rows, setRows] = useState<PreparingRow[]>(
        onboardingContent.preparing.rows.map((r) => ({ ...r, completed: false }))
    );
    const generationRef = useRef(0);

    useEffect(() => {
        generationRef.current += 1;
        const myGen = generationRef.current;
        const delays = [500, 650, 800, 900];
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        let cumulative = 0;
        onboardingContent.preparing.rows.forEach((_, idx) => {
            cumulative += delays[Math.min(idx, delays.length - 1)];
            const t = setTimeout(() => {
                if (generationRef.current !== myGen) return;
                setRows((prev) =>
                    prev.map((r, i) => (i === idx ? { ...r, completed: true } : r))
                );
            }, cumulative);
            timeouts.push(t);
        });

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, []);

    const allDone = rows.every((r) => r.completed);

    return (
        <section className="flex flex-col min-h-0 flex-1 justify-center w-full max-w-2xl mx-auto gap-3 md:gap-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-center">
                {onboardingContent.preparing.title}
            </h1>

            <div className="flex flex-col gap-2.5 md:gap-3">
                {rows.map((row, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-3 md:p-4"
                    >
                        <div
                            className={[
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                row.completed
                                    ? "bg-emerald-500/20 text-emerald-300"
                                    : "bg-indigo-500/20 text-indigo-200",
                            ].join(" ")}
                        >
                            {row.completed ? (
                                <Check size={18} strokeWidth={2.5} />
                            ) : (
                                <Loader2 size={18} className="animate-spin" />
                            )}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm md:text-base font-bold text-white leading-tight">
                                {row.label}
                            </span>
                            <span className="text-xs md:text-sm text-slate-400 leading-snug">
                                {row.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-400/25 rounded-2xl p-3 md:p-4 text-amber-100">
                <Sparkles
                    size={18}
                    className="text-amber-300 shrink-0 mt-0.5"
                    fill="currentColor"
                />
                <p className="text-xs md:text-sm leading-relaxed">
                    <span className="font-bold text-amber-300">Tip:</span>{" "}
                    {onboardingContent.preparing.tip}
                </p>
            </div>

            <IndigoButton onClick={onContinue} disabled={!allDone}>
                {onboardingContent.preparing.continueCta}
            </IndigoButton>
        </section>
    );
}

function renderHighlight(text: string, target: string, highlightClass: string) {
    const idx = text.indexOf(target);
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const after = text.slice(idx + target.length);
    return (
        <>
            {before}
            <span className={highlightClass}>{target}</span>
            {after}
        </>
    );
}

function renderBoldPrefix(text: string, prefix: string, prefixClass: string) {
    if (!text.startsWith(prefix)) return text;
    const rest = text.slice(prefix.length);
    return (
        <>
            <span className={prefixClass}>{prefix}</span>
            {rest}
        </>
    );
}

function BetaSelectedStep({ onContinue }: { onContinue: () => void }) {
    const { congratulations, beta } = onboardingContent;

    const payParts = beta.payAmount.split("/");
    const payHasSlash = payParts.length === 2;

    return (
        <section className="flex flex-col min-h-0 flex-1 justify-center w-full max-w-2xl mx-auto gap-3 md:gap-4">
            <div className="flex flex-col items-center gap-2 md:gap-3">
                <div
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/40 flex items-center justify-center"
                    style={{ boxShadow: "0 0 30px rgba(251, 191, 36, 0.35)" }}
                >
                    <Sparkles size={26} fill="currentColor" />
                </div>

                <span className="text-xs md:text-sm font-black text-amber-400 uppercase" style={{ letterSpacing: "0.22em" }}>
                    {congratulations.badge}
                </span>

                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-center">
                    {congratulations.headline}
                </h1>
            </div>

            {/* Amber info card with floating star pin */}
            <div className="relative bg-amber-500/10 border border-amber-400/25 rounded-2xl px-4 md:px-6 pt-7 pb-4 md:pb-5">
                <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center"
                    style={{ boxShadow: `0 0 0 4px ${PAGE_BG}` }}
                >
                    <Star size={16} fill="currentColor" />
                </div>
                <p className="text-center text-sm md:text-base text-zinc-200 leading-relaxed">
                    {renderHighlight(
                        beta.headline,
                        "your account was flagged",
                        "text-amber-300 font-bold"
                    )}
                </p>
                <p className="text-center text-xs md:text-sm text-zinc-400 mt-2">
                    {beta.subcopy}
                </p>
            </div>

            {/* Indigo "Don't panic!" card */}
            <div className="flex items-start gap-3 bg-indigo-500/10 border border-indigo-500/25 rounded-2xl p-3 md:p-4">
                <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-200 flex items-center justify-center shrink-0">
                    <Shield size={16} />
                </div>
                <p className="text-sm md:text-base text-zinc-200 leading-relaxed">
                    {renderBoldPrefix(beta.infoCard, "Don't panic!", "font-bold text-white")}
                </p>
            </div>

            {/* Indigo pay card */}
            <div className="bg-indigo-500/15 border border-indigo-500/25 rounded-2xl px-4 py-3 md:py-4 text-center">
                <span className="text-xs md:text-sm font-bold text-zinc-300 uppercase tracking-wider">
                    {beta.payLabel}
                </span>
                <div className="mt-1 leading-none">
                    {payHasSlash ? (
                        <span className="text-3xl md:text-4xl font-extrabold text-indigo-200">
                            {payParts[0]}
                            <span className="text-lg md:text-xl font-bold text-indigo-300/80">
                                /{payParts[1]}
                            </span>
                        </span>
                    ) : (
                        <span className="text-3xl md:text-4xl font-extrabold text-indigo-200">
                            {beta.payAmount}
                        </span>
                    )}
                </div>
            </div>

            <IndigoButton onClick={onContinue}>{beta.cta}</IndigoButton>
        </section>
    );
}

interface QualificationStepProps {
    onClaim: () => void;
    onSkip: () => void;
    busy: boolean;
}

function QualificationStep({ onClaim, onSkip, busy }: QualificationStepProps) {
    const { qualification } = onboardingContent;
    const reqIcons = [Smartphone, Globe, CheckCircle2];

    const dashIdx = qualification.footer.indexOf("—");
    let footerNode: React.ReactNode = qualification.footer;
    if (dashIdx !== -1) {
        const before = qualification.footer.slice(0, dashIdx).trimEnd();
        const after = qualification.footer.slice(dashIdx + 1).trimStart();
        footerNode = (
            <>
                {before} <span className="text-zinc-500">—</span>{" "}
                <span className="font-bold text-white">{after}</span>
            </>
        );
    }

    return (
        <section className="flex flex-col min-h-0 flex-1 justify-center w-full max-w-2xl mx-auto gap-3 md:gap-4">
            <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/25 rounded-full px-3.5 py-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-xs md:text-sm font-black text-emerald-300 uppercase" style={{ letterSpacing: "0.2em" }}>
                        {qualification.badge}
                    </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-center">
                    {qualification.headline}
                </h1>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-3">
                {qualification.requirements.map((req, idx) => {
                    const Icon = reqIcons[idx] ?? CheckCircle2;
                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-3 md:gap-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-3 md:p-4"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                                <Icon size={18} />
                            </div>
                            <span className="text-sm md:text-base font-medium text-white">
                                {req}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className="text-center text-sm md:text-base text-zinc-300">
                {footerNode}
            </p>

            <motion.button
                type="button"
                onClick={onClaim}
                disabled={busy}
                whileHover={busy ? undefined : { scale: 1.01 }}
                whileTap={busy ? undefined : { scale: 0.98 }}
                className={[
                    "w-full rounded-2xl py-3.5 md:py-4 px-6",
                    "text-sm md:text-base font-extrabold tracking-wide text-black",
                    "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400",
                    "shadow-[0_10px_30px_rgba(251,191,36,0.35)] hover:shadow-[0_15px_40px_rgba(251,191,36,0.55)]",
                    "transition-shadow duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
                    busy ? "opacity-70 cursor-not-allowed" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
            >
                {qualification.primaryCta}
            </motion.button>

            <button
                type="button"
                onClick={onSkip}
                disabled={busy}
                className="text-center text-xs md:text-sm text-zinc-400 underline decoration-zinc-600 underline-offset-4 hover:text-zinc-200 transition-colors disabled:opacity-60"
            >
                {qualification.noThanksCta}
            </button>

            <p className="text-center text-[10px] md:text-xs text-zinc-500">
                {qualification.finePrint}
            </p>
        </section>
    );
}

async function persistCompletion(): Promise<void> {
    let userId: string | null = null;
    let existingMeta: Record<string, unknown> = {};

    try {
        const { data } = await supabase.auth.getUser();
        userId = data.user?.id ?? null;
        existingMeta = (data.user?.user_metadata ?? {}) as Record<string, unknown>;
    } catch {
        // ignore
    }

    if (userId) {
        try {
            await supabase
                .from("users")
                .update({ onboarding_completed_at: new Date().toISOString() })
                .eq("id", userId);
        } catch {
            // ignore — column or table may not exist
        }
    }

    try {
        await supabase.auth.updateUser({
            data: { ...existingMeta, [ONBOARDING_META_KEY]: true },
        });
    } catch {
        // ignore
    }
}

export function OnboardingFlow() {
    const router = useRouter();
    const [step, setStep] = useState<0 | 1 | 2>(0);
    const [busy, setBusy] = useState(false);

    const goToDashboard = () => {
        router.replace(ONBOARDING_DASHBOARD_ROUTE);
    };

    const handleClaim = async () => {
        if (busy) return;
        setBusy(true);

        if (ONBOARDING_BETA_QUALIFICATION_CTA_URL) {
            try {
                window.open(
                    ONBOARDING_BETA_QUALIFICATION_CTA_URL,
                    "_blank",
                    "noopener,noreferrer"
                );
            } catch {
                // ignore popup failure
            }
        }

        await persistCompletion();
        goToDashboard();
    };

    const handleSkip = async () => {
        if (busy) return;
        setBusy(true);
        await persistCompletion();
        goToDashboard();
    };

    return (
        <div className="fixed inset-0 z-[300] h-dvh max-h-dvh overflow-hidden" style={{ backgroundColor: PAGE_BG }}>
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(251,191,36,0.10), transparent 60%)",
                }}
            />

            <ConfettiBackdrop />

            <div className="relative z-10 flex flex-col min-h-0 h-full px-5 md:px-8 py-5 md:py-7">
                <header className="flex flex-col items-center gap-1.5 shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-amber-400 flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.25)]">
                        <Target size={24} className="text-black" strokeWidth={2.5} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                        {ONBOARDING_PRODUCT_NAME}
                    </span>
                </header>

                <div className="flex flex-col min-h-0 flex-1 mt-4 md:mt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-col min-h-0 flex-1"
                        >
                            {step === 0 && (
                                <PreparingStep onContinue={() => setStep(1)} />
                            )}
                            {step === 1 && (
                                <BetaSelectedStep onContinue={() => setStep(2)} />
                            )}
                            {step === 2 && (
                                <QualificationStep
                                    onClaim={handleClaim}
                                    onSkip={handleSkip}
                                    busy={busy}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default OnboardingFlow;
