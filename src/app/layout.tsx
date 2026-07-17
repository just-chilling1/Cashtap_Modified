import type { Metadata } from "next";
import "./globals.css";
import { SearchProvider } from "@/context/SearchContext";
import { Shell } from "@/components/layout/Shell";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
export const metadata: Metadata = {
  title: "CashTap AI | Premium Earning Accelerator",
  description: "Identify high-potential discussions and generate natural responses that convert.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <body className="bg-[#050505] text-white selection:bg-[#14B8A6]/30 overflow-x-hidden">
        <AmbientBackground />
        <SearchProvider>
          <Shell>
            {children}
          </Shell>
        </SearchProvider>
      </body>
    </html>
  );
}
