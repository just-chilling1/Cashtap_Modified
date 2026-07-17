"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
    Loader2,
    Check,
    Sparkles,
    Smartphone,
    Globe,
    CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import {
    onboardingContent,
    ONBOARDING_BETA_QUALIFICATION_CTA_URL,
    ONBOARDING_DASHBOARD_ROUTE,
    ONBOARDING_META_KEY,
    ONBOARDING_PRODUCT_NAME,
} from "@/config/onboarding-content";
import { BrandLogo } from "@/components/ui/BrandLogo";

const PAGE_BG = "#0A0A0F";
const TOTAL_STEPS = 4;

const CONFETTI_COLORS = [
    "#F87171",
    "#FBBF24",
    "#60A5FA",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#FACC15",
    "#22D3EE",
];

const CARD_SURFACE =
    "bg-white/[0.10] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-inset ring-white/[0.04] transition-colors duration-200";

const listContainerVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08 },
    },
};

const listItemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" as const },
    },
};

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
            left: (i * 17 + i * i * 3) % 100,
            delay: ((i * 13) % 80) / 10,
            duration: 10 + (i % 3) * 3,
            color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            shape: (i % 3) as 0 | 1 | 2,
            rotate: (i * 23) % 360,
            drift: (i * 7) % 40 - 20,
        });
    }
    return particles;
}

function ConfettiBackdrop({ enabled }: { enabled: boolean }) {
    const particles = useMemo(() => buildConfettiParticles(56), []);

    if (!enabled) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
        >
            {particles.map((p) => {
                const isDot = p.shape === 2;
                const width = isDot ? 8 : p.shape === 1 ? 5 : 10;
                const height = isDot ? 8 : p.shape === 1 ? 14 : 8;
                return (
                    <span
                        key={p.id}
                        className="absolute top-0 animate-confetti-fall"
                        style={{
                            left: `${p.left}%`,
                            width,
                            height,
                            backgroundColor: p.color,
                            borderRadius: isDot ? 999 : 2,
                            boxShadow: `0 0 10px ${p.color}88`,
                            ["--drift" as string]: `${p.drift}px`,
                            ["--duration" as string]: `${p.duration}s`,
                            ["--delay" as string]: `${p.delay}s`,
                            ["--rotate-start" as string]: `${p.rotate}deg`,
                            ["--rotate-end" as string]: `${p.rotate + 360}deg`,
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
    pill?: boolean;
}

function IndigoButton({
    onClick,
    disabled,
    children,
    type = "button",
    fullWidth = true,
    pill = false,
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
                pill ? "rounded-full" : "rounded-2xl",
                "min-h-11 py-3 md:py-3.5 px-6",
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

function ProgressBar({
    progress,
    stepIndex,
}: {
    progress: number;
    stepIndex: number;
}) {
    const clamped = Math.min(100, Math.max(0, progress));
    const [shimmerKey, setShimmerKey] = useState(0);

    useEffect(() => {
        setShimmerKey((k) => k + 1);
    }, [stepIndex]);

    return (
        <div className="w-full flex flex-col gap-1.5">
            <div className="flex justify-end">
                <span className="text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Step {stepIndex + 1} of {TOTAL_STEPS}
                </span>
            </div>
            <div
                className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden"
                role="progressbar"
                aria-valuenow={clamped}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Onboarding step ${stepIndex + 1} of ${TOTAL_STEPS}`}
            >
                <motion.div
                    className="relative h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.55)]"
                    initial={false}
                    animate={{ width: `${clamped}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <span
                        key={shimmerKey}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-progress-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    );
}

function IconChip({
    tone,
    children,
}: {
    tone: "emerald" | "indigo" | "amber";
    children: React.ReactNode;
}) {
    const tones = {
        emerald:
            "bg-blue-500/20 text-blue-300 shadow-[0_0_16px_rgba(59,130,246,0.25)]",
        indigo: "bg-indigo-500/20 text-indigo-200 shadow-[0_0_16px_rgba(99,102,241,0.25)]",
        amber: "bg-amber-500/20 text-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.25)]",
    };
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tones[tone]}`}
        >
            {children}
        </div>
    );
}

function useEnterAdvance(onContinue: () => void, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key !== "Enter") return;
            const tag = (e.target as HTMLElement | null)?.tagName;
            if (tag === "TEXTAREA" || tag === "INPUT") return;
            e.preventDefault();
            onContinue();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onContinue, enabled]);
}

interface PreparingRow {
    label: string;
    description: string;
    completed: boolean;
}

function PreparingStep({
    onContinue,
    reduceMotion,
}: {
    onContinue: () => void;
    reduceMotion: boolean;
}) {
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
        <section className="flex flex-col justify-center w-full max-w-2xl mx-auto gap-2 md:gap-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white text-center">
                {onboardingContent.preparing.title}
            </h1>

            <motion.div
                className="flex flex-col gap-2"
                variants={reduceMotion ? undefined : listContainerVariants}
                initial={reduceMotion ? undefined : "hidden"}
                animate={reduceMotion ? undefined : "show"}
            >
                {rows.map((row, idx) => (
                    <motion.div
                        key={idx}
                        variants={reduceMotion ? undefined : listItemVariants}
                        className={[
                            "flex items-center gap-3 p-2.5 md:p-3",
                            CARD_SURFACE,
                            row.completed
                                ? "border-blue-400/30 hover:border-blue-400/40"
                                : "hover:border-white/20",
                        ].join(" ")}
                    >
                        <IconChip tone={row.completed ? "emerald" : "indigo"}>
                            <AnimatePresence mode="wait" initial={false}>
                                {row.completed ? (
                                    <motion.span
                                        key="check"
                                        initial={
                                            reduceMotion
                                                ? false
                                                : { scale: 0.5, opacity: 0 }
                                        }
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 18,
                                        }}
                                        className="flex"
                                    >
                                        <Check size={18} strokeWidth={2.5} />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="spin"
                                        initial={false}
                                        exit={{ opacity: 0 }}
                                        className="flex"
                                    >
                                        <Loader2 size={18} className="animate-spin" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </IconChip>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm md:text-base font-bold text-white leading-tight">
                                {row.label}
                            </span>
                            <span className="text-xs text-slate-400 leading-snug">
                                {row.description}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div
                className={[
                    "flex items-start gap-3 p-2.5 md:p-3 text-blue-100",
                    CARD_SURFACE,
                    "border-blue-400/25 bg-blue-500/10",
                ].join(" ")}
            >
                <IconChip tone="emerald">
                    <Sparkles size={18} fill="currentColor" />
                </IconChip>
                <p className="text-xs md:text-sm leading-relaxed pt-1.5">
                    <span className="font-bold text-blue-300">Tip:</span>{" "}
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

function CongratsTeaserStep({ onContinue }: { onContinue: () => void }) {
    const { congratulations } = onboardingContent;
    useEnterAdvance(onContinue);

    return (
        <section className="flex flex-col justify-center w-full max-w-xl mx-auto gap-4 md:gap-5">
            <div className="flex flex-col items-center gap-2.5 md:gap-3 text-center">
                <span
                    className="text-xs md:text-sm font-black text-blue-400 uppercase"
                    style={{ letterSpacing: "0.22em" }}
                >
                    {congratulations.badge}
                </span>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {congratulations.headline}
                </h1>

                <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-md">
                    {congratulations.teaser}
                </p>
            </div>

            <div className="w-full max-w-sm mx-auto">
                <IndigoButton onClick={onContinue} pill>
                    {congratulations.continueCta}
                </IndigoButton>
            </div>
        </section>
    );
}

function BetaDetailsStep({
    onContinue,
    reduceMotion,
}: {
    onContinue: () => void;
    reduceMotion: boolean;
}) {
    const { beta } = onboardingContent;
    useEnterAdvance(onContinue);

    const payParts = beta.payAmount.split("/");
    const payHasSlash = payParts.length === 2;

    return (
        <section className="flex flex-col justify-center w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-14 items-center">
                <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-snug">
                        {renderHighlight(
                            beta.headline,
                            "your account was flagged",
                            "text-blue-300"
                        )}
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
                        {beta.subcopy}
                    </p>
                </div>

                <motion.div
                    className="flex flex-col gap-2.5 md:gap-3"
                    variants={reduceMotion ? undefined : listContainerVariants}
                    initial={reduceMotion ? undefined : "hidden"}
                    animate={reduceMotion ? undefined : "show"}
                >
                    <motion.div
                        variants={reduceMotion ? undefined : listItemVariants}
                        className={[
                            "flex items-start gap-3 p-3.5 md:p-4",
                            CARD_SURFACE,
                            "border-indigo-500/25 bg-indigo-500/10 hover:border-indigo-400/40",
                        ].join(" ")}
                    >
                        <IconChip tone="indigo">
                            <CheckCircle2 size={18} />
                        </IconChip>
                        <p className="text-sm md:text-base text-zinc-200 leading-relaxed pt-1.5">
                            {renderBoldPrefix(
                                beta.infoCard,
                                "Don't panic!",
                                "font-bold text-white"
                            )}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={reduceMotion ? undefined : listItemVariants}
                        className={[
                            "relative overflow-hidden px-4 py-4 md:py-5 text-center",
                            CARD_SURFACE,
                            "border-indigo-500/35 bg-indigo-500/15",
                        ].join(" ")}
                        style={{
                            backgroundImage:
                                "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(99,102,241,0.35), transparent 70%)",
                        }}
                    >
                        <span className="text-xs md:text-sm font-bold text-indigo-300 uppercase tracking-wider">
                            {beta.payLabel}:
                        </span>
                        <div className="mt-1.5 leading-none">
                            {payHasSlash ? (
                                <span className="text-4xl md:text-5xl font-extrabold text-indigo-100 drop-shadow-[0_0_24px_rgba(129,140,248,0.45)]">
                                    {payParts[0]}
                                    <span className="text-xl md:text-2xl font-bold text-indigo-300/80">
                                        /{payParts[1]}
                                    </span>
                                </span>
                            ) : (
                                <span className="text-4xl md:text-5xl font-extrabold text-indigo-100">
                                    {beta.payAmount}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    <motion.div variants={reduceMotion ? undefined : listItemVariants}>
                        <IndigoButton onClick={onContinue}>{beta.cta}</IndigoButton>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

interface QualificationStepProps {
    onClaim: () => void;
    onSkip: () => void;
    busy: boolean;
    reduceMotion: boolean;
}

function QualificationStep({
    onClaim,
    onSkip,
    busy,
    reduceMotion,
}: QualificationStepProps) {
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
        <section className="flex flex-col justify-center w-full max-w-2xl mx-auto gap-2.5 md:gap-3">
            <div className="flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/25 rounded-full px-3.5 py-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                    </span>
                    <span
                        className="text-xs md:text-sm font-black text-blue-300 uppercase"
                        style={{ letterSpacing: "0.2em" }}
                    >
                        {qualification.badge}
                    </span>
                </div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white text-center">
                    {qualification.headline}
                </h1>
            </div>

            <motion.div
                className="flex flex-col gap-2"
                variants={reduceMotion ? undefined : listContainerVariants}
                initial={reduceMotion ? undefined : "hidden"}
                animate={reduceMotion ? undefined : "show"}
            >
                {qualification.requirements.map((req, idx) => {
                    const Icon = reqIcons[idx] ?? CheckCircle2;
                    return (
                        <motion.div
                            key={idx}
                            variants={reduceMotion ? undefined : listItemVariants}
                            className={[
                                "flex items-center gap-3 p-2.5 md:p-3",
                                CARD_SURFACE,
                                "hover:border-blue-400/30",
                            ].join(" ")}
                        >
                            <IconChip tone="emerald">
                                <Icon size={18} />
                            </IconChip>
                            <span className="text-sm md:text-base font-medium text-white">
                                {req}
                            </span>
                        </motion.div>
                    );
                })}
            </motion.div>

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
                    "w-full min-h-11 rounded-2xl py-3 md:py-3.5 px-6",
                    "text-sm md:text-base font-extrabold tracking-wide text-white",
                    "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400",
                    "shadow-[0_10px_30px_rgba(59,130,246,0.35)] hover:shadow-[0_15px_40px_rgba(59,130,246,0.55)]",
                    "transition-shadow duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0F]",
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
                className="min-h-10 px-3 text-center text-xs md:text-sm text-zinc-400 underline decoration-zinc-600 underline-offset-4 hover:text-zinc-200 transition-colors disabled:opacity-60"
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
    const reduceMotion = useReducedMotion() ?? false;
    const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
    const [busy, setBusy] = useState(false);

    const progress = ((step + 1) / TOTAL_STEPS) * 100;

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
        <div
            className="fixed inset-0 z-[300] h-dvh max-h-dvh overflow-hidden"
            style={{ backgroundColor: PAGE_BG }}
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.12), transparent 60%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(59,130,246,0.10), transparent 60%)",
                }}
            />

            <ConfettiBackdrop enabled={!reduceMotion} />

            <div className="relative z-10 flex flex-col min-h-0 h-full px-4 md:px-8 py-3 md:py-5">
                <header className="flex flex-col items-center gap-2 shrink-0 w-full max-w-5xl mx-auto">
                    <div className="flex flex-col items-center gap-1">
                        <BrandLogo size={40} className="rounded-lg shadow-[0_0_20px_rgba(20,184,166,0.25)]" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
                            {ONBOARDING_PRODUCT_NAME}
                        </span>
                    </div>
                    <ProgressBar progress={progress} stepIndex={step} />
                </header>

                <div className="flex flex-col min-h-0 flex-1 mt-2 md:mt-4 overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={
                                reduceMotion ? false : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                                reduceMotion
                                    ? { opacity: 0 }
                                    : { opacity: 0, y: -8 }
                            }
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex flex-col min-h-0 flex-1"
                        >
                            <div className="flex flex-col flex-1 min-h-0 justify-center w-full">
                                {step === 0 && (
                                    <PreparingStep
                                        onContinue={() => setStep(1)}
                                        reduceMotion={reduceMotion}
                                    />
                                )}
                                {step === 1 && (
                                    <CongratsTeaserStep
                                        onContinue={() => setStep(2)}
                                    />
                                )}
                                {step === 2 && (
                                    <BetaDetailsStep
                                        onContinue={() => setStep(3)}
                                        reduceMotion={reduceMotion}
                                    />
                                )}
                                {step === 3 && (
                                    <QualificationStep
                                        onClaim={handleClaim}
                                        onSkip={handleSkip}
                                        busy={busy}
                                        reduceMotion={reduceMotion}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default OnboardingFlow;
