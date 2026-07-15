"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Target, X } from "lucide-react";
import { MobileBottomNav, Sidebar } from "./Sidebar";
import { SupportBanner } from "../dashboard/SupportBanner";
import { GlobalPromotionBanner } from "./GlobalPromotionBanner";
import { SocialProofToast } from "../dopamine/SocialProofToast";
import { WithdrawPopup } from "../dopamine/WithdrawPopup";
import { FreeTrainingPopup } from "../dopamine/FreeTrainingPopup";

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/onboarding" || pathname.startsWith("/onboarding/") || pathname.startsWith("/auth/");
    const hidePromotionBanner = pathname === "/scale-training";
    const [popupVisible, setPopupVisible] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#080808] w-full max-w-full">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Zero-width on mobile so the fixed sidebar does not squeeze main content */}
            <div className="w-0 shrink-0 overflow-visible lg:w-72">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            <main className="flex-1 min-w-0 w-full overflow-x-hidden overflow-y-auto scroll-smooth relative">
                {/* Mobile top bar */}
                <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 h-14 bg-[#080808]/95 backdrop-blur border-b border-[#141414]">
                    <div className="flex items-center gap-2 min-h-11">
                        <div className="w-11 h-11 bg-accent flex items-center justify-center rounded-md">
                            <Target size={18} className="text-black" />
                        </div>
                        <span className="brand-font text-[17px] text-text-primary tracking-tight leading-none">CashTap AI</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen((v) => !v)}
                        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                        aria-expanded={sidebarOpen}
                        className="flex items-center justify-center w-11 h-11 -mr-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface/50 transition-colors"
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <div className="px-3 sm:px-8 lg:px-16 pt-6 lg:pt-10 pb-24 md:pb-16 max-w-7xl mx-auto min-h-full flex flex-col w-full min-w-0 overflow-x-hidden">
                    {!hidePromotionBanner && <GlobalPromotionBanner />}
                    {children}
                    <div className="mt-auto pt-16">
                        <SupportBanner />
                    </div>
                </div>
            </main>

            <MobileBottomNav />

            <WithdrawPopup onVisibilityChange={setPopupVisible} />
            <SocialProofToast paused={popupVisible} />
            <FreeTrainingPopup />
        </div>
    );
}
