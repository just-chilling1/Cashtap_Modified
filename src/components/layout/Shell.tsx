"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { SupportBanner } from "../dashboard/SupportBanner";
import { GlobalPromotionBanner } from "./GlobalPromotionBanner";
import { SocialProofToast } from "../dopamine/SocialProofToast";
import { WithdrawPopup } from "../dopamine/WithdrawPopup";
import { FreeTrainingPopup } from "../dopamine/FreeTrainingPopup";

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password" || pathname === "/reset-password" || pathname === "/onboarding" || pathname.startsWith("/onboarding/") || pathname.startsWith("/auth/");
    const [popupVisible, setPopupVisible] = useState(false);

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-[#080808] w-full">
            <Sidebar />
            <main className="flex-1 overflow-y-auto scroll-smooth relative">
                <div className="px-16 pt-10 pb-16 max-w-7xl mx-auto min-h-full flex flex-col">
                    <GlobalPromotionBanner />
                    {children}
                    <div className="mt-auto pt-16">
                        <SupportBanner />
                    </div>
                </div>
            </main>
            <WithdrawPopup onVisibilityChange={setPopupVisible} />
            <SocialProofToast paused={popupVisible} />
            <FreeTrainingPopup />
        </div>
    );
}

