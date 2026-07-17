"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutGrid,
    Radar,
    LogOut,
    GraduationCap,
    Sparkles,
    Rocket,
    Scan,
    Search,
    MessageSquare,
    Brain,
    TrendingUp,
    ExternalLink,
    Wand2,
} from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { clsx } from "clsx";
import { LiveActivityTicker } from "../dopamine/LiveActivityTicker";
import { BrandLogo } from "../ui/BrandLogo";

const WORKFLOW_STEPS = [
    { path: "/search", label: "Enter Topic", icon: Search },
    { path: "/analysis", label: "Check Demand", icon: Brain },
    { path: "/radar", label: "Find Ads", icon: Radar },
    { path: "/replies", label: "Create Replies", icon: MessageSquare },
];

const LEARN_LINKS = [
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/scale-training", label: "Scale to $1k–$5k/day", icon: TrendingUp },
];

const UPGRADES = [
    { path: "/dfy", label: "Done-For-You", icon: Scan, accent: "from-violet-500/20 to-violet-500/5" },
    { path: "/instant", label: "Instant Income", icon: Sparkles, accent: "from-amber-500/20 to-amber-500/5" },
    { path: "/autopilot", label: "Automated Profits", icon: Rocket, accent: "from-emerald-500/20 to-emerald-500/5" },
];

const PROMO_OFFERS = [
    { title: "Earn $400/Day Testing New Apps", url: "https://jvz4.com/c/3547097/442443/" },
    { title: "Get Paid To Copy & Paste", url: "https://jvz1.com/c/3547097/442055/" },
    { title: "Fast Cash Training", url: "https://www.breakoutai.net/5k-passive-9" },
];

const MOBILE_TABS = [
    { path: "/dashboard", label: "Home", icon: LayoutGrid },
    { path: "/training", label: "Training", icon: GraduationCap },
    { path: "/search", label: "Generate", icon: Wand2 },
];

function NavLink({
    href,
    label,
    icon: Icon,
    isActive,
    onClick,
    step,
}: {
    href: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
    isActive: boolean;
    onClick?: () => void;
    step?: number;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            aria-current={isActive ? "page" : undefined}
            className={clsx("sidebar-nav-link group", isActive && "active")}
        >
            {step !== undefined ? (
                <span className={clsx("sidebar-step-badge", isActive ? "active" : "pending")}>
                    {step}
                </span>
            ) : (
                <Icon
                    size={17}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    className={clsx("shrink-0", isActive ? "text-accent" : "text-text-muted group-hover:text-text-primary")}
                />
            )}
            <span className="truncate">{label}</span>
        </Link>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <span className="px-3 text-[10px] font-bold tracking-[0.2em] text-text-muted uppercase">
            {children}
        </span>
    );
}

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border-dim bg-page/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]"
            aria-label="Mobile primary"
        >
            <div className="flex items-stretch justify-around px-1 pt-1">
                {MOBILE_TABS.map((tab) => {
                    const isActive = pathname === tab.path;
                    const Icon = tab.icon;

                    return (
                        <Link
                            key={tab.path}
                            href={tab.path}
                            aria-current={isActive ? "page" : undefined}
                            className={clsx(
                                "flex flex-1 flex-col items-center justify-center gap-0.5 min-w-11 min-h-11 px-1 rounded-lg transition-colors",
                                isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
                            )}
                        >
                            <Icon size={20} strokeWidth={isActive ? 2.25 : 1.75} />
                            <span className="text-[10px] font-semibold tracking-wide leading-none text-center">{tab.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
    const pathname = usePathname();
    const { resetSession } = useSearch();

    return (
        <aside
            className={clsx(
                "w-72 max-w-[85vw] bg-sidebar border-r border-border-dim flex flex-col h-screen overflow-hidden",
                "fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-out lg:static lg:z-auto lg:shrink-0 lg:translate-x-0",
                open ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Header */}
            <div className="shrink-0 px-5 pt-6 pb-4 border-b border-border-dim/60 bg-linear-to-b from-white/2 to-transparent">
                <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-3.5 group min-h-11"
                >
                    <BrandLogo size={40} className="shadow-gold ring-1 ring-white/5" />
                    <div className="flex flex-col min-w-0">
                        <span className="brand-font text-lg text-text-primary tracking-tight leading-none">CashTap AI</span>
                        <span className="text-[10px] font-medium text-text-muted mt-1 truncate">Simple AI Ad Helper</span>
                    </div>
                </Link>
            </div>

            {/* Scrollable nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-6 no-scrollbar">
                <div className="flex flex-col gap-1">
                    <SectionLabel>Main</SectionLabel>
                    <NavLink
                        href="/dashboard"
                        label="Home"
                        icon={LayoutGrid}
                        isActive={pathname === "/dashboard"}
                        onClick={onClose}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <SectionLabel>4-Step Workflow</SectionLabel>
                    {WORKFLOW_STEPS.map((step, i) => (
                        <NavLink
                            key={step.path}
                            href={step.path}
                            label={step.label}
                            icon={step.icon}
                            isActive={pathname === step.path}
                            onClick={onClose}
                            step={i + 1}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-1">
                    <SectionLabel>Learn & Grow</SectionLabel>
                    {LEARN_LINKS.map((link) => (
                        <NavLink
                            key={link.path}
                            href={link.path}
                            label={link.label}
                            icon={link.icon}
                            isActive={pathname === link.path}
                            onClick={onClose}
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <SectionLabel>Premium</SectionLabel>
                    <div className="rounded-xl border border-accent/15 bg-linear-to-b from-accent/5 to-transparent p-2 flex flex-col gap-1">
                        {UPGRADES.map((upgrade) => {
                            const isActive = pathname === upgrade.path;
                            const Icon = upgrade.icon;

                            return (
                                <Link
                                    key={upgrade.path}
                                    href={upgrade.path}
                                    onClick={onClose}
                                    className={clsx(
                                        "flex items-center gap-2.5 min-h-9 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all",
                                        isActive
                                            ? "bg-accent/12 text-accent border border-accent/25"
                                            : "text-text-secondary hover:text-text-primary hover:bg-white/4"
                                    )}
                                >
                                    <span className={clsx("flex items-center justify-center w-7 h-7 rounded-md bg-linear-to-br shrink-0", upgrade.accent)}>
                                        <Icon size={14} strokeWidth={2} className={isActive ? "text-accent" : "text-text-muted"} />
                                    </span>
                                    <span className="truncate">{upgrade.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <SectionLabel>Bonus Offers</SectionLabel>
                    {PROMO_OFFERS.map((promo) => (
                        <a
                            key={promo.url}
                            href={promo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 min-h-11 px-3 py-2.5 rounded-xl bg-page border border-accent/25 hover:border-accent/50 hover:bg-accent/5 transition-all group"
                        >
                            <div className="flex flex-col gap-0.5 min-w-0">
                                <span className="text-[13px] font-semibold text-accent leading-tight">{promo.title}</span>
                                <span className="text-[10px] text-text-muted font-medium">Claim Now</span>
                            </div>
                            <div className="w-9 h-9 rounded-lg border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors">
                                <ExternalLink size={14} className="text-accent" />
                            </div>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="shrink-0 px-4 py-4 border-t border-border-dim/60 bg-page/40 flex flex-col gap-3">
                <LiveActivityTicker />
                <button
                    type="button"
                    onClick={resetSession}
                    className="sidebar-nav-link w-full text-red-400/70 hover:text-red-400 hover:bg-red-500/8"
                >
                    <LogOut size={17} />
                    <span>Sign out</span>
                </button>
            </div>
        </aside>
    );
}
