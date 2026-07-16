export const ONBOARDING_PRODUCT_NAME = "CashTap AI";

export const ONBOARDING_BETA_QUALIFICATION_CTA_URL = "https://www.breakoutai.net/5k-passive-9";

export const ONBOARDING_DASHBOARD_ROUTE = "/dashboard";

export const ONBOARDING_META_KEY = "onboarding_completed" as const;

export const onboardingContent = {
    preparing: {
        title: "Setting up your workspace",
        rows: [
            {
                label: "Loading your AI ad finder & daily search allocation",
                description: "Preparing verified affiliate ads you can use today.",
            },
            {
                label: "Connecting your reply generator & saved campaigns",
                description: "Syncing reply generation and your personal campaign vault.",
            },
            {
                label: "Unlocking Training, Support & Premium Features",
                description: "Done-For-You, Instant Income, Automated Profits, and Scale Training — when your plan includes them.",
            },
        ],
        tip: "Start with Done-For-You first — it walks you from a single keyword to ready-to-post replies in minutes.",
        continueCta: "Continue",
    },
    congratulations: {
        badge: "🎉 CONGRATULATIONS!",
        headline: "You've Been Randomly Selected",
        teaser: `Your ${ONBOARDING_PRODUCT_NAME} account has been flagged for an exclusive opportunity. Tap continue to see what's waiting for you.`,
        continueCta: "Continue >",
    },
    beta: {
        headline:
            "Out of thousands of new members today, your account was flagged for our private Beta Tester program.",
        subcopy: `This is a separate, optional opportunity — not part of ${ONBOARDING_PRODUCT_NAME}. But we highly recommend checking it out.`,
        infoCard:
            "Don't panic! This is a good thing. You've been chosen to test a brand-new system — and testers get paid.",
        payLabel: "Beta Tester Pay",
        payAmount: "$500/day",
        cta: "See If You Qualify >",
    },
    qualification: {
        badge: "QUALIFICATION CHECK",
        headline: "Do You Meet These Requirements?",
        requirements: [
            "A phone or a computer",
            "Speaks English",
            "No tech skills required",
        ],
        footer: "If you checked all three — you qualify!",
        primaryCta: "🎯 Claim My Beta Tester Spot >",
        noThanksCta: "No thanks, skip this optional offer →",
        finePrint: `This is an optional partner offer, separate from your ${ONBOARDING_PRODUCT_NAME} membership. Spots are limited.`,
    },
} as const;
